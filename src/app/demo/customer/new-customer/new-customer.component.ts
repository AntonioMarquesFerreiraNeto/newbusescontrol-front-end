import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatRadioModule } from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [RouterModule, NgSelectModule, MatRadioModule, SharedModule, NgxMaskDirective, MatTabsModule],
  providers: [provideNgxMask()],
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent {
  customerForm: FormGroup;
  typeList = [
    { value: 1, description: 'Pessoa física' },
    { value: 2, description: 'Pessoa jurídica' }
  ]

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(90)]],
      cpf: ['', [Validators.maxLength(11)]],
      cnpj: ['', [Validators.maxLength(14)]],
      birthDate: [null],
      openDate: [null],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(80)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(11)]],
      homeNumber: ['', [Validators.required, Validators.maxLength(20)]],
      logradouro: ['', [Validators.required, Validators.maxLength(60)]],
      complementResidential: ['', [Validators.maxLength(60)]],
      neighborhood: ['', [Validators.required, Validators.maxLength(60)]],
      city: ['', [Validators.required, Validators.maxLength(60)]],
      state: [null, [Validators.required, Validators.maxLength(60)]],
      type: [1, Validators.required]
    });

    this.customerForm.get('type')?.valueChanges.subscribe(value => {
      this.onTypeChange(value);
    });
  }

  NaturalPerson(): boolean {
    return this.customerForm.get('type')?.value == 1;
  }

  onTypeChange(type: string) {
    if (type === 'PessoaFisica') {
      this.customerForm.get('cpf')?.setValidators([Validators.required, Validators.maxLength(11)]);
      this.customerForm.get('birthDate')?.setValidators([Validators.required]);
      this.customerForm.get('cnpj')?.clearValidators();
      this.customerForm.get('openDate')?.clearValidators();
    } else if (type === 'PessoaJuridica') {
      this.customerForm.get('cnpj')?.setValidators([Validators.required, Validators.maxLength(14)]);
      this.customerForm.get('openDate')?.setValidators([Validators.required]);
      this.customerForm.get('cpf')?.clearValidators();
      this.customerForm.get('birthDate')?.clearValidators();
    }

    this.customerForm.get('cpf')?.updateValueAndValidity();
    this.customerForm.get('birthDate')?.updateValueAndValidity();
    this.customerForm.get('cnpj')?.updateValueAndValidity();
    this.customerForm.get('openDate')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      console.log('Customer Data:', customerData);
      // Lógica para salvar os dados do cliente
    }
  }

  stateList = [
    {id: 'ac', description: 'Acre'},
    {id: 'al', description: 'Alagoas'},
    {id: 'ap', description: 'Amapá'},
    {id: 'am', description: 'Amazonas'},
    {id: 'ba', description: 'Bahia'},
    {id: 'ce', description: 'Ceará'},
    {id: 'df', description: 'Distrito Federal'},
    {id: 'es', description: 'Espírito Santo'},
    {id: 'go', description: 'Goiás'},
    {id: 'ma', description: 'Maranhão'},
    {id: 'mt', description: 'Mato Grosso'},
    {id: 'ms', description: 'Mato Grosso do Sul'},
    {id: 'mg', description: 'Minas Gerais'},
    {id: 'pa', description: 'Pará'},
    {id: 'pb', description: 'Paraíba'},
    {id: 'pr', description: 'Paraná'},
    {id: 'pe', description: 'Pernambuco'},
    {id: 'pi', description: 'Piauí'},
    {id: 'rj', description: 'Rio de Janeiro'},
    {id: 'rn', description: 'Rio Grande do Norte'},
    {id: 'rs', description: 'Rio Grande do Sul'},
    {id: 'ro', description: 'Rondônia'},
    {id: 'rr', description: 'Roraima'},
    {id: 'sc', description: 'Santa Catarina'},
    {id: 'sp', description: 'São Paulo'},
    {id: 'se', description: 'Sergipe'},
    {id: 'to', description: 'Tocantins'}
  ];  
}
