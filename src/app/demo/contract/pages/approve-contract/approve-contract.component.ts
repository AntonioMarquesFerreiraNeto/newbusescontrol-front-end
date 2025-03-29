import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContractService } from 'src/app/services/contract.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';

@Component({
  selector: 'app-approve-contract',
  standalone: true,
  imports: [],
  templateUrl: './approve-contract.component.html',
  styleUrl: './approve-contract.component.scss'
})
export class ApproveContractComponent {
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  @Input() contractId: string;
  @Input() contractReference: string;

  constructor(public modal: NgbActiveModal, private snackbarService: SnackbarService, private contractService: ContractService) { }

  approveContract() {
    this.contractService.Approve(this.contractId).subscribe({
      next: (response) => {
        this.snackbarService.Open(response.message);
        this.modal.close();
        this.onSubmitted.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail, 'bottom');
      }
    });
  }
}
