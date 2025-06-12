import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'primeng/api';
import { Financial } from 'src/app/interfaces/Financial';
import { FinancialService } from 'src/app/services/financial.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';

@Component({
  selector: 'app-edit-financial',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-financial.component.html',
  styleUrl: './edit-financial.component.scss'
})
export class EditFinancialComponent implements OnInit {
  @Input() id: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  financial: Financial;
  financialForm: FormGroup;

  ngOnInit(): void {
    this.financialService.GetById(this.id).subscribe({
      next: (response) => {
        this.financial = response;
        this.financialForm = new FormGroup({
          title: new FormControl(this.financial.title, Validators.required),
          description: new FormControl(this.financial.description, Validators.required),
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.modal.close();
      }
    });
  }

  constructor(public modal: NgbActiveModal, private financialService: FinancialService, private snackbarService: SnackbarService) { }

  submit() {
    if(this.financialForm.invalid) {
      return;
    }

    const data : Financial = this.financialForm.value;

    this.financialService.UpdateDetails(this.financial.id, data).subscribe({
      next: () => {
        this.snackbarService.Open('Lançamento editado com sucesso.');
        this.onSubmitted.emit();
        this.modal.close();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
      }
    });
  }
}