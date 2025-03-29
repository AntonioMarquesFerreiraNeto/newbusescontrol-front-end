import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Contract } from 'src/app/interfaces/Contract';
import { User } from 'src/app/interfaces/User';
import { ContractService } from 'src/app/services/contract.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-contract',
  standalone: true,
  imports: [NgSelectModule, CommonModule, BrowserModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './manage-contract.component.html',
  styleUrl: './manage-contract.component.scss'
})
export class ManageContractComponent implements OnInit {
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  contractId: string;
  contract: Contract;
  status: string;
  disabledButton: Boolean = false;
  contractActions = [];

  constructor(public modal: NgbActiveModal, private contractService: ContractService, private snackbarService: SnackbarService, private swalFireService: SwalFireService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMyProfile().subscribe((response) => this.buildActions(response));

    this.contractService.GetById(this.contractId).subscribe({
      next: (response) => {
        this.contract = response;
        const count = this.contractActions.filter(x => x.status == this.contract.status).length;
        if (count != 0) {
          this.status = this.contract.status;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.modal.close();
      }
    });
  }

  buildActions( userProfile: User) {
    this.contractActions.push({ status: 'WaitingReview', description: 'Aguardando Revisão' });

    if(userProfile.role == 'Admin') {
      this.contractActions.push(
        { status: 'Denied', description: 'Negado' },
        { status: 'InProgress', description: 'Iniciar/Em Andamento' }
      );
    }
  }

  changeStatus() {
    if (!this.status) {
      this.snackbarService.Open('Por favor, selecione o status.', 'bottom');
      return;
    }

    this.disabledButton = true;

    this.contractService.ChangeStatus(this.status, this.contract.id).subscribe({
      next: (response) =>{
        this.disabledButton = false;
        this.modal.close();
        if(response != null) this.snackbarService.Open(response.message);
        else this.snackbarService.Open('Status atualizado com sucesso!');
        this.onSubmitted.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail, 'bottom');
        this.disabledButton = false;
      }
    });
  }
}
