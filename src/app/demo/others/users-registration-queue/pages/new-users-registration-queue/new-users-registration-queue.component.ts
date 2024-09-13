import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Pagination } from 'src/app/class/Pagination';
import { Employee } from 'src/app/interfaces/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { UserRegistrationQueueService } from 'src/app/services/user-registration-queue.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-new-users-registration-queue',
  standalone: true,
  imports: [SharedModule, NgSelectModule, RouterModule],
  templateUrl: './new-users-registration-queue.component.html',
  styleUrl: './new-users-registration-queue.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class NewUsersRegistrationQueueComponent implements OnInit {

  @Input() id: string;
  employee: Employee;
  userRegistrationQueueForm: FormGroup;
  employeeList: Employee[];
  pagination = new Pagination;

  constructor(private employeeService: EmployeeService, private userRegistrationQueueService: UserRegistrationQueueService, private swalFireService: SwalFireService, private snackbarService: SnackbarService, private router: Router) { }

  ngOnInit(): void {
    this.pagination.pageSize = 100;
    this.employeeService.GetPaginated(this.pagination).subscribe((response) => {
      this.employeeList = response.response;
    });

    this.userRegistrationQueueForm = new FormGroup({
      employeeId: new FormControl(null, Validators.required)
    });
  }

  selectedEmployee(employeeId: string) {
    this.employee = this.employeeList.find(x => x.id == employeeId);
  }

  getTypeFormattedEmployee() {

    if (!this.employee) return 'Tipo de funcionário selecionado'

    switch (this.employee.type) {
      case 'Admin':
        return 'Administrador';
      case 'Assistant':
        return 'Assistente';
      case 'SupportAgent':
        return 'Suporte';
      case 'Driver':
        return 'Motorista';
      default:
        return 'Não encontrado';
    }
  }

  getCpfFormatted() {
    return this.employee.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  getGender() {
    return this.employee.gender == 'Male' ? 'Masculino' : 'Feminino';
  }

  submit() {
    if(this.userRegistrationQueueForm.invalid) {
      return;
    }

    this.swalFireService.SwalLoading();

    this.userRegistrationQueueService.Create(this.userRegistrationQueueForm.value).subscribe({
      next: (response) => {
        this.swalFireService.SwalSuccess(response.message, () => {
          this.router.navigate(['/users-registration-queue']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
      }
    });
  }
}
