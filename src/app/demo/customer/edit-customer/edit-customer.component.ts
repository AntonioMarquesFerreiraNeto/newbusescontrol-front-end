import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [RouterModule, NgSelectModule, MatRadioModule, SharedModule, NgxMaskDirective, MatTabsModule],
  providers: [provideNgxMask()],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.scss'
})
export class EditCustomerComponent implements OnInit {
  id: string;
  customerForm: FormGroup;
  typeList = [
    { value: 'NaturalPerson', description: 'Pessoa física' },
    { value: 'LegalEntity', description: 'Pessoa jurídica' }
  ]

  genderList = [
    { value: 'Male', description: 'Masculino' },
    { value: 'Female', description: 'Feminino' }
  ]

  constructor(private fb: FormBuilder, private customerService: CustomerService, private swalFireService: SwalFireService, private snackbarService: SnackbarService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    
    this.customerService.GetById(this.id).subscribe({
      next: (response) => {
        this.customerForm = this.fb.group({
          name: [response.name, [Validators.required, Validators.minLength(3)]],
          cpf: [response.cpf, [Validators.minLength(11)]],
          cnpj: [response.cnpj, [Validators.minLength(14)]],
          birthDate: [response.birthDate],
          openDate: [response.openDate],
          email: [response.email, [Validators.required, Validators.email, Validators.maxLength(80)]],
          phoneNumber: [response.phoneNumber, [Validators.required, Validators.minLength(11)]],
          homeNumber: [response.homeNumber, [Validators.required, Validators.maxLength(20)]],
          logradouro: [response.logradouro, [Validators.required, Validators.maxLength(60)]],
          complementResidential: [response.complementResidential, [Validators.required, Validators.maxLength(60)]],
          neighborhood: [response.neighborhood, [Validators.required, Validators.maxLength(60)]],
          city: [response.city, [Validators.required, Validators.maxLength(60)]],
          state: [response.state, [Validators.required, Validators.maxLength(60)]],
          gender: [response.gender],
          type: [response.type, Validators.required]
        });
      }, 
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.router.navigate(['/customer']);
      }
    });
  }

  NaturalPerson(): boolean {
    return this.customerForm.get('type')?.value == 'NaturalPerson';
  }

  onTypeChange(type: string) {
    if (type == 'NaturalPerson') {
      this.customerForm.get('cpf')?.setValidators([Validators.required, Validators.maxLength(11)]);
      this.customerForm.get('birthDate')?.setValidators([Validators.required]);
      this.customerForm.get('gender')?.setValidators([Validators.required]);
      this.customerForm.get('cnpj')?.clearValidators();
      this.customerForm.get('openDate')?.clearValidators();
    }
    else if (type == 'LegalEntity') {
      this.customerForm.get('cnpj')?.setValidators([Validators.required, Validators.maxLength(14)]);
      this.customerForm.get('openDate')?.setValidators([Validators.required]);
      this.customerForm.get('cpf')?.clearValidators();
      this.customerForm.get('gender')?.clearValidators();
      this.customerForm.get('birthDate')?.clearValidators();
    }

    this.customerForm.get('cpf')?.updateValueAndValidity();
    this.customerForm.get('gender')?.updateValueAndValidity();
    this.customerForm.get('birthDate')?.updateValueAndValidity();
    this.customerForm.get('cnpj')?.updateValueAndValidity();
    this.customerForm.get('openDate')?.updateValueAndValidity();
  }

  Submit() {
    const type = this.customerForm.get('type').value;
    this.onTypeChange(type);

    if (this.customerForm.invalid) {
      return;
    }

    const data: Customer = this.customerForm.value;

    data.homeNumber = data.homeNumber.toString();

    this.swalFireService.SwalLoading();

    this.customerService.Update(this.id, data).subscribe({
      next: () => {
        this.swalFireService.SwalSuccess("Cliente atualizado com sucesso!", () => {
          this.router.navigate(['/customer']);
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
