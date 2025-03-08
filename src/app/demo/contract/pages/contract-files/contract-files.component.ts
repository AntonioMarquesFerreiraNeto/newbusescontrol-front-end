import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Contract } from 'src/app/interfaces/Contract';
import { Customer } from 'src/app/interfaces/Customer';
import { CommonService } from 'src/app/services/common.service';
import { ContractService } from 'src/app/services/contract.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';

@Component({
  selector: 'app-contract-files',
  standalone: true,
  imports: [NgSelectModule, CommonModule, BrowserModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './contract-files.component.html',
  styleUrl: './contract-files.component.scss'
})
export class ContractFilesComponent implements OnInit {
  @Input() contractId: string;
  contract: Contract;
  customerId: string;
  customersList: Customer[];
  disabledContract: boolean = false;
  disabledTermination: boolean = false;

  constructor (public activeModal: NgbActiveModal, private contractService: ContractService, private snackbarService: SnackbarService, public commonService: CommonService, private swalFireService: SwalFireService){}

  ngOnInit(): void {
    this.contractService.GetById(this.contractId).subscribe({
      next: (response) => {
        this.contract = response;
        this.customersList = this.contract.customersContract.map(x => x.customer);
      },
      error: (error: HttpErrorResponse) =>{
        this.snackbarService.Open(error.error.detail);
      }
    });
  }

  getPdfContract() {
    if(!this.customerId) {
      this.snackbarService.Open('Por favor, selecione o cliente.', 'bottom');
      return;
    }

    this.disabledContract = true;

    this.contractService.GetPdfContract(this.contract.id, this.customerId).subscribe({
      next: (response) =>{
        window.open(response.url, '_blank');
        this.disabledContract = false;
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail, 'bottom');
        this.disabledContract = false;
      }
    });
  }

  StartProcessTermination() {
    if(!this.customerId) {
      this.snackbarService.Open('Por favor, selecione o cliente.', 'bottom');
      return;
    }

    this.disabledTermination = true;

    this.contractService.StartProcessTermination(this.contract.id, this.customerId).subscribe({
      next: (response) =>{
        window.open(response.url, '_blank');
        this.disabledTermination = false;
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail, 'bottom');
        this.disabledTermination = false;
      }
    });
  }
}
