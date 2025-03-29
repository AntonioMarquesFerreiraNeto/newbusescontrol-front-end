import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import TblBootstrapComponent from "../pages/tables/tbl-bootstrap/tbl-bootstrap.component";
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BusDetailsComponent } from './pages/bus-details/bus-details.component';
import { Bus } from 'src/app/interfaces/Bus';
import { BusService } from 'src/app/services/bus.service';
import { DatePipe } from '@angular/common';
import { BusAvailabilityComponent } from './pages/bus-availability/bus-availability.component';
import { Pagination } from 'src/app/class/Pagination';

@Component({
  selector: 'app-bus',
  standalone: true,
  imports: [SharedModule, TblBootstrapComponent, RouterModule, NgSelectModule, MatProgressSpinner, MatPaginatorModule],
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class BusComponent implements OnInit {
  tableMsg: string = '';
  frota: Bus[];
  pagination = new Pagination;

  constructor(private modal: NgbModal, private busService: BusService, private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.busService.GetPaginated(this.pagination).subscribe(response => {
      this.frota = response.response;
      this.pagination.totalSize = response.totalSize;
    });

    this.tableMsg = this.frota?.length == 0 ? 'Nenhum registro encontrado' : '';
  }

  search(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pagination.search = input.value;
    this.pagination.page = 1;
    
    this.refreshFrota();
  }

  handlePageEvent(event: PageEvent) {
    const previousPageSize = this.pagination.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;

    if (event.pageSize !== previousPageSize) {
      this.pagination.page = 1;
    }

    this.refreshFrota();
  }

  refreshFrota() {
    this.busService.GetPaginated(this.pagination).subscribe(response => {
      this.frota = response.response;
      this.pagination.totalSize = response.totalSize;
    });
  }

  openDetails(id: string) {
    const style = { size: 'lg' };
    var modal = this.modal.open(BusDetailsComponent, style);
    modal.componentInstance.busId = id;
    modal.componentInstance.onSubmitted.subscribe(() => {
      this.refreshFrota();
    });
  }

  openAvailability(event: MouseEvent, id: string) {
    event.stopImmediatePropagation();
    const style = { size: 'lg' };

    var modal = this.modal.open(BusAvailabilityComponent, style);
    modal.componentInstance.busId = id;
    
    modal.componentInstance.onSubmitted.subscribe(() => {
      this.refreshFrota();
    });
  }

  dateFormated(date: string) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  getLabelStatus(status: string) {
    return status == 'Active' ? 'label-blue' : 'label-pink'
  }

  getDetailStatus(status: string) {
    return status == 'Active' ? 'Ativo' : 'Inativo';
  }

  getLabelAvailability(availability: string) {
    return availability == 'Available' ? 'label-blue' : 'label-pink'
  }

  getDetailAvailability(availability: string) {
    return availability == 'Available' ? 'Disponível' : 'Indisponível'
  }

  getIconAvailability(availability: string) {
    return availability == 'Available' ? 'feather icon-unlock' : 'feather icon-lock'
  }
}
