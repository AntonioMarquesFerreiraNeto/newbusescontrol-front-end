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
import { NgSelectModule } from '@ng-select/ng-select';
import { ContractService } from 'src/app/services/contract.service';
import { Pagination } from 'src/app/class/Pagination';
import { Contract } from 'src/app/interfaces/Contract';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContractFilesComponent } from './pages/contract-files/contract-files.component';
import { ManageContractComponent } from './pages/manage-contract/manage-contract.component';
import { DeleteContractComponent } from './pages/delete-contract/delete-contract.component';
import { ApproveContractComponent } from './pages/approve-contract/approve-contract.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [RouterModule, SharedModule, MatPaginatorModule, MatExpansionModule, PanelModule, AvatarModule, ButtonModule, MenuModule, NgSelectModule],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.scss',
  animations: [fadeInOnEnterAnimation()]
})
export class ContractComponent implements OnInit {
  pagination = new Pagination;
  contracts: Contract[];
  isCollapsed: boolean[];
  enabledApprove = false;

  ngOnInit(): void {
    this.contractService.GetPaginated(this.pagination).subscribe(response => {
      this.contracts = response.response;
      this.isCollapsed = this.contracts.map(() => true);
      this.pagination.totalSize = response.totalSize;
    });

    this.userService.getMyProfile().subscribe((response) => {
      if(response.role == 'Admin') this.enabledApprove = true;
    });
  }

  constructor(private contractService: ContractService, public commonService: CommonService, private modal: NgbModal, private userService: UserService) { }

  contractsStatus = [
    { value: 'WaitingReview', description: 'Aguardando Revisão' },
    { value: 'Denied', description: 'Negado' },
    { value: 'WaitingSignature', description: 'Colhendo assinaturas' },
    { value: 'InProgress', description: 'Em andamento' },
    { value: 'Completed', description: 'Concluído' }
  ];

  toggleCollapse(index: number): void {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }

  getStatusDescription(status: string): string {
    switch (status) {
      case 'WaitingReview':
        return 'Aguardando revisão';
      case 'Denied':
        return 'Negado';
      case 'WaitingSignature':
        return 'Colhendo assinaturas';
      case 'InProgress':
        return 'Em andamento';
      case 'Completed':
        return 'Concluído';
      default:
        return 'Status desconhecido';
    }
  }

  getStatusLabel(status: string) : string {
    switch (status) {
      case 'WaitingReview':
        return 'label label-blue';
      case 'Denied':
        return 'label label-orange';
      case 'WaitingSignature':
        return 'label label-red';
      case 'InProgress':
        return 'label label-green';
      case 'Completed':
        return 'label label-pink';
      default:
        return 'label label-white';
    }
  }

  handlePageEvent(event: PageEvent) {
    const previousPageSize = this.pagination.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;

    if (event.pageSize !== previousPageSize) {
      this.pagination.page = 1;
    }

    this.refreshContracts();
  }

  filter(event: Event) {
    this.pagination.page = 1;
    this.pagination.filter =  event != undefined || event != null ? String(event) : '';
    this.refreshContracts();
  }

  refreshContracts() {
    this.contractService.GetPaginated(this.pagination).subscribe(response => {
      this.contracts = response.response;
      this.pagination.totalSize = response.totalSize;
      this.isCollapsed = this.contracts.map(() => true);
    });
  }

  openManageContract(id: string) {
    const style = { size: 'md' };

    const modal = this.modal.open(ManageContractComponent, style);
    modal.componentInstance.contractId = id;
    modal.componentInstance.onSubmitted.subscribe(() =>{
      this.refreshContracts();
    });
  }
  
  openDocumentFile(id: string) {
    const style = { size: 'md' };

    const modal = this.modal.open(ContractFilesComponent, style);
    modal.componentInstance.contractId = id;
  }

  openApprove(id: string, reference: string) {
    const style = { size: 'md' };

    const modal = this.modal.open(ApproveContractComponent, style);
    modal.componentInstance.contractId = id;
    modal.componentInstance.contractReference = reference;
    modal.componentInstance.onSubmitted.subscribe(() => {
      this.refreshContracts();
    });
  }

  openDelete(id: string, reference: string) {
    const style = { size: 'md' };

    const modal = this.modal.open(DeleteContractComponent, style);
    modal.componentInstance.contractId = id;
    modal.componentInstance.contractReference = reference;
    modal.componentInstance.onSubmitted.subscribe(() => {
      this.refreshContracts();
    });
  }

  getPaymentTypeDescription(paymetType: string): string {
    switch (paymetType) {
      case 'Single':
        return 'Fatura única';
      case 'Multiple':
        return 'Fatura múltipla';
      default:
        return 'Desconhecido';
    }
  }
}
