import { CommonModule, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Contract } from 'src/app/interfaces/Contract';
import { CommonService } from 'src/app/services/common.service';
import { ContractService } from 'src/app/services/contract.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-details-contract',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterModule],
  templateUrl: './details-contract.component.html',
  styleUrl: './details-contract.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class DetailsContractComponent implements OnInit {
  contract: Contract;

  constructor (private route: ActivatedRoute, private router: Router, private contractService: ContractService, private snackbarService: SnackbarService, public commonService: CommonService, private swalFireService: SwalFireService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.contractService.GetById(id).subscribe({
      next: (response) => {
        this.contract = response;
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.router.navigate(['/contracts']);
      }
    });
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

  getAvatar(gender: string) {
    return gender == 'Male' ? 'assets/images/user/avatar-2.jpg' : 'assets/images/user/avatar-1.jpg';
  }

  getPdfContract(custumerId: string) {
    this.swalFireService.SwalLoading('Por favor, aguarde enquanto processamos sua solictação...');

    this.contractService.GetPdfContract(this.contract.id, custumerId).subscribe({
      next: (response) =>{
        window.open(response.url, '_blank');
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
      },
      complete: () => {
        this.swalFireService.Close();
      }
    });
  }

  StartProcessTermination(custumerId: string) {
    this.swalFireService.SwalLoading('Por favor, aguarde enquanto processamos sua solictação...');

    this.contractService.StartProcessTermination(this.contract.id, custumerId).subscribe({
      next: (response) =>{
        window.open(response.url, '_blank');
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
      },
      complete: () => {
        this.swalFireService.Close();
      }
    });
  }
}
