import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Employee } from 'src/app/interfaces/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-change-type-employee',
  standalone: true,
  imports: [NgSelectModule, CommonModule, NgxMaskDirective, SharedModule, FormsModule, ReactiveFormsModule],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './change-type-employee.component.html',
  styleUrl: './change-type-employee.component.scss'
})
export class ChangeTypeEmployeeComponent implements OnInit {
  @Input() id: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  employee: Employee;
  typeForm: FormGroup;

  typeList = [
    { value: 'Assistant', description: 'Assistente' },
    { value: 'Admin', description: 'Administrador' },
    { value: 'SupportAgent', description: 'Suporte' },
    { value: 'Driver', description: 'Motorista' }
  ]

  genderList = [
    { value: 'Male', description: 'Masculino' },
    { value: 'Female', description: 'Feminino' }
  ]

  constructor(private modal: NgbActiveModal, private employeeService: EmployeeService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.employeeService.GetById(this.id).subscribe({
      next: (response) => {
        this.employee = response;
        this.typeForm = new FormGroup({
          type: new FormControl(this.employee.type, Validators.required)
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.close();
      }
    });
  }

  getCpfFormatted() {
    return this.employee.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  close() {
    this.modal.close();
  }

  submit() {
    if (this.typeForm.invalid) {
      return;
    }

    this.employeeService.ToggleType(this.id, this.typeForm.value).subscribe({
      next: (response) => {
        this.snackbarService.Open(response.message);
        this.onSubmitted.emit();
        this.close();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.close();
      }
    });
  }

}
