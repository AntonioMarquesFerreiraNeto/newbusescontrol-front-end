import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Pagination } from 'src/app/class/Pagination';
import { Financial } from 'src/app/interfaces/Financial';
import { FinancialService } from 'src/app/services/financial.service';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OptionsFinancialComponent } from './pages/options-financial/options-financial.component';
import { EditFinancialComponent } from './pages/edit-financial/edit-financial.component';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [RouterModule, SharedModule, MatPaginatorModule, MatExpansionModule, PanelModule, AvatarModule, ButtonModule, MenuModule],
  templateUrl: './financial.component.html',
  styleUrl: './financial.component.scss',
  animations: [fadeInOnEnterAnimation()]
})
export class FinancialComponent implements OnInit {
  pagination = new Pagination;
  financials: Financial[];
  isCollapsed: boolean[];

  ngOnInit(): void {
    this.buildFinancial();
  }

  constructor(private financialService: FinancialService, public commonService: CommonService, private modal: NgbModal) { }

  search(event: Event) {
    const element = event.target as HTMLInputElement;
    this.pagination.search = element.value;

    this.buildFinancial();
  }

  buildFinancial() {
    this.financialService.GetPaginated(this.pagination).subscribe((data) => {
      this.financials = data.response;
      this.isCollapsed = this.financials.map(() => true);
      this.pagination.totalSize = data.totalSize;
    });
  }

  handlePageEvent(event: PageEvent) {
    const previousPageSize = this.pagination.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;

    if (event.pageSize !== previousPageSize) {
      this.pagination.page = 1;
    }

    this.buildFinancial();
  }

  toggleCollapse(index: number): void {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }

  getTypeDescription(type: string) {
    switch (type) {
      case 'Revenue': return 'Receita';
      case 'Expense': return 'Despesa';
      default: return 'Não encontrado';
    }
  }

  getTypeLabel(type: string) {
    switch (type) {
      case 'Revenue': return 'label label-green';
      case 'Expense': return 'label label-red';
      default: return 'label label-white';
    }
  }

  getPaymentTypeDescription(paymentType: string) {
    switch (paymentType) {
      case 'Single': return 'Fatura Única';
      case 'Multiple': return 'Parcelada';
      default: return 'Não encontrado';
    }
  }

  getPaymentTypeLabel(type: string) {
    switch (type) {
      case 'Single': return 'label label-blue';
      case 'Multiple': return 'label label-pink';
      default: return 'label label-white';
    }
  }

  optionsFinancial() {
    this.modal.open(OptionsFinancialComponent, {
      backdrop: 'static',
      size: 'md'
    });
  }

  openEditFinancial(id: string) {
    const modal = this.modal.open(EditFinancialComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modal.componentInstance.id = id;
    modal.componentInstance.onSubmitted.subscribe(() => {
      this.buildFinancial();
    });
  }
}
