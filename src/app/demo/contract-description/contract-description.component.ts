import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Pagination } from 'src/app/class/Pagination';
import { ContractDescription } from 'src/app/interfaces/ContractDescription';
import { ContractDescriptionService } from 'src/app/services/contract-description.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DeleteContractDescriptionComponent } from './pages/delete-contract-description/delete-contract-description.component';

@Component({
  selector: 'app-contract-description',
  standalone: true,
  imports: [RouterModule, SharedModule, MatPaginatorModule],
  templateUrl: './contract-description.component.html',
  styleUrl: './contract-description.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class ContractDescriptionComponent {

  contractDescriptions: ContractDescription[];
  pagination = new Pagination();

  constructor(private contractDescriptionService: ContractDescriptionService, private datePipe: DatePipe, private modal: NgbModal) {

    this.contractDescriptionService.GetPaginated(this.pagination).subscribe((response) => {
      this.contractDescriptions = response.response;
      this.pagination.totalSize = response.totalSize;
    });
  }

  handlePageEvent(event: PageEvent) {
    const previousPageSize = this.pagination.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;

    if (event.pageSize !== previousPageSize) {
      this.pagination.page = 1;
    }

    this.refreshContractDescriptions();
  }

  openDelete(id: string) {
    const style = { size: 'md' };
    var modalRef = this.modal.open(DeleteContractDescriptionComponent, style);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.refreshContractDescriptions();
    });
  }

  refreshContractDescriptions() {
    this.contractDescriptionService.GetPaginated(this.pagination).subscribe((response) => {
      this.contractDescriptions = response.response;
      this.pagination.totalSize = response.totalSize;
    });
  }
}
