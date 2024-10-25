import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { ContractDescription } from 'src/app/interfaces/ContractDescription';
import { ContractDescriptionService } from 'src/app/services/contract-description.service';

@Component({
  selector: 'app-delete-contract-description',
  standalone: true,
  imports: [SharedModule, RouterModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule],
  templateUrl: './delete-contract-description.component.html',
  styleUrl: './delete-contract-description.component.scss'
})
export class DeleteContractDescriptionComponent implements OnInit {
  @Input() id?: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  contractDescriptionDetails?: ContractDescription;

  constructor(private modal: NgbActiveModal, private contractDescriptionService: ContractDescriptionService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.contractDescriptionService.GetById(this.id).subscribe({
      next: (response) => {
        this.contractDescriptionDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.modal.close();
      }
    });
  }

  submit() {
    this.contractDescriptionService.Delete(this.id).subscribe({
      next: () => {
        this.snackbarService.Open(`Descrição deletada com sucesso!`);
        this.onSubmitted.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
      }
    });

    this.modal.close();
  }

  close() {
    this.modal.close();
  }
}
