import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Employee } from 'src/app/interfaces/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, NgxMaskDirective, SharedModule, FormsModule, ReactiveFormsModule],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() id: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  employee: Employee;
  actionTxt: string;

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
        this.actionTxt = this.employee.status == 'Active' ? 'Inativar' : 'Ativar';
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
  
  phoneNumberFormatted() {
    return this.employee.phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  getTypeByValue(value: string){
    return this.typeList.find(x => x.value == value).description;
  }

  close() {
    this.modal.close();
  }

  submit() {
    this.employeeService.ToggleActive(this.id).subscribe({
      next: () => {
        const action = this.employee.status == 'Active' ? 'inativado' : 'ativado';
        this.snackbarService.Open(`Funcionário ${action} com sucesso!`);
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
