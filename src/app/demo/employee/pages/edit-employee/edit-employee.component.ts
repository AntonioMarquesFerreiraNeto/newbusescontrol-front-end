import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Employee } from 'src/app/interfaces/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [SharedModule, RouterModule, MatTabsModule, NgxMaskDirective, NgSelectModule],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class EditEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  id: string;

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

  constructor(private employeeService: EmployeeService, private swalFireService: SwalFireService, private snackbarService: SnackbarService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.employeeService.GetById(this.id).subscribe({
      next: (response) => {
        this.employeeForm = new FormGroup({
          type: new FormControl(response.type, Validators.required),
          name: new FormControl(response.name, [Validators.required, Validators.minLength(3)]),
          birthDate: new FormControl(response.birthDate, Validators.required),
          cpf: new FormControl(response.cpf, [Validators.required, Validators.minLength(11)]),
          email: new FormControl(response.email, [Validators.required, Validators.email]),
          phoneNumber: new FormControl(response.phoneNumber, [Validators.required, Validators.minLength(11)]),
          homeNumber: new FormControl(response.homeNumber, [Validators.required]),
          logradouro: new FormControl(response.logradouro, [Validators.required]),
          complementResidential: new FormControl(response.complementResidential, [Validators.required]),
          neighborhood: new FormControl(response.neighborhood, [Validators.required]),
          city: new FormControl(response.city, [Validators.required]),
          state: new FormControl(response.state, [Validators.required]),
          gender: new FormControl(response.gender, Validators.required)
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.router.navigate(['/employee']);
      }
    });
  }

  submit() {
    if (this.employeeForm.invalid) {
      return;
    }

    const data: Employee = this.employeeForm.value;

    this.swalFireService.SwalLoading();

    this.employeeService.Update(this.id, data).subscribe({
      next: () => {
        this.swalFireService.SwalSuccess('Funcionário editado com sucesso!', () => {
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