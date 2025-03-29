import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'primeng/api';
import { ContractService } from 'src/app/services/contract.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';

@Component({
  selector: 'app-delete-contract',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './delete-contract.component.html',
  styleUrl: './delete-contract.component.scss'
})
export class DeleteContractComponent {
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  @Input() contractId: string;
  @Input() contractReference: string;

  constructor (private contractService: ContractService, private snackbarService: SnackbarService, public modal: NgbActiveModal) { }

  deleteContract() { 
    this.contractService.Delete(this.contractId).subscribe({
      next: () => {
        this.snackbarService.Open('Contrato deletado com sucesso.');
        this.modal.close();
        this.onSubmitted.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail, 'bottom');
      }
    });
  }
}
