import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Employee } from 'src/app/interfaces/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [SharedModule, MatTabsModule, NgSelectModule, RouterModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class NewEmployeeComponent implements OnInit {

  employeeForm: FormGroup;

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

  constructor(private employeeService: EmployeeService, private swalFireService: SwalFireService, private snackbarService: SnackbarService, private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      type: new FormControl(null, Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      birthDate: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11)]),
      homeNumber: new FormControl('', [Validators.required]),
      logradouro: new FormControl('', [Validators.required]),
      complementResidential: new FormControl('', [Validators.required]),
      neighborhood: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (this.employeeForm.invalid) {
      return;
    }

    const data: Employee = this.employeeForm.value;

    this.swalFireService.SwalLoading();

    this.employeeService.Create(data).subscribe({
      next: () => {
        this.swalFireService.SwalSuccess('Funcionário cadastrado com sucesso!', () => {
          this.router.navigate(['/employee']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
      }
    });
  }

  stateList = [
    { id: 'ac', description: 'Acre' },
    { id: 'al', description: 'Alagoas' },
    { id: 'ap', description: 'Amapá' },
    { id: 'am', description: 'Amazonas' },
    { id: 'ba', description: 'Bahia' },
    { id: 'ce', description: 'Ceará' },
    { id: 'df', description: 'Distrito Federal' },
    { id: 'es', description: 'Espírito Santo' },
    { id: 'go', description: 'Goiás' },
    { id: 'ma', description: 'Maranhão' },
    { id: 'mt', description: 'Mato Grosso' },
    { id: 'ms', description: 'Mato Grosso do Sul' },
    { id: 'mg', description: 'Minas Gerais' },
    { id: 'pa', description: 'Pará' },
    { id: 'pb', description: 'Paraíba' },
    { id: 'pr', description: 'Paraná' },
    { id: 'pe', description: 'Pernambuco' },
    { id: 'pi', description: 'Piauí' },
    { id: 'rj', description: 'Rio de Janeiro' },
    { id: 'rn', description: 'Rio Grande do Norte' },
    { id: 'rs', description: 'Rio Grande do Sul' },
    { id: 'ro', description: 'Rondônia' },
    { id: 'rr', description: 'Roraima' },
    { id: 'sc', description: 'Santa Catarina' },
    { id: 'sp', description: 'São Paulo' },
    { id: 'se', description: 'Sergipe' },
    { id: 'to', description: 'Tocantins' }
  ];
}
