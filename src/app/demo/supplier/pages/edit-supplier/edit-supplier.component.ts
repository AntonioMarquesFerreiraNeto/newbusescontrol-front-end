import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Supplier } from 'src/app/interfaces/Supplier';
import { HelpersService } from 'src/app/services/helpers/helpers.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-edit-supplier',
  standalone: true,
  imports: [SharedModule, MatTabsModule, NgSelectModule, RouterModule, NgxMaskDirective],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './edit-supplier.component.html',
  styleUrl: './edit-supplier.component.scss'
})
export class EditSupplierComponent implements OnInit {
  supplierForm: FormGroup;
  id: string;

  constructor(private supplierService: SupplierService, private snackbarService: SnackbarService, private helpersService: HelpersService, private swalFireService: SwalFireService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.supplierService.GetById(this.id).subscribe({
      next: (response) => {
        this.supplierForm = new FormGroup({
          name: new FormControl(response.name, [Validators.required, Validators.minLength(3)]),
          openDate: new FormControl(response.openDate, Validators.required),
          cnpj: new FormControl(response.cnpj, [Validators.required, Validators.minLength(14)]),
          email: new FormControl(response.email, [Validators.required, Validators.email]),
          phoneNumber: new FormControl(response.phoneNumber, [Validators.required, Validators.minLength(11)]),
          homeNumber: new FormControl(response.homeNumber, [Validators.required]),
          logradouro: new FormControl(response.logradouro, [Validators.required]),
          complementResidential: new FormControl(response.complementResidential, [Validators.required]),
          neighborhood: new FormControl(response.neighborhood, [Validators.required]),
          city: new FormControl(response.city, [Validators.required]),
          state: new FormControl(response.state, [Validators.required])
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.router.navigate(['/suppliers']);
      }
    });
  }

  submit() {
    if (this.supplierForm.invalid) {
      console.log(this.supplierForm);
      return;
    }

    const data: Supplier = this.supplierForm.value;

    this.swalFireService.SwalLoading();

    this.supplierService.Update(this.id, data).subscribe({
      next: () => {
        this.swalFireService.SwalSuccess('Fornecedor atualizado com sucesso!', () => {
          this.router.navigate(['/suppliers']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
      }
    });
  }

  handlerSupplierDetails() {
    const cnpj = this.supplierForm.get('cnpj').value;
    if (cnpj.length < 14) {
      this.swalFireService.SwalInfo('Informe um CNPJ válido para buscarmos os dados da empresa.');
      return;
    }

    this.swalFireService.SwalLoading('Por favor, aguarde enquanto buscamos as informações da entidade jurídica....');

    this.helpersService.GetDetailsLegalEntity(cnpj).subscribe({
      next: (response) => {
        this.swalFireService.SwalSuccess('Dados do fornecedor retornados com sucesso!', () => {
          this.supplierForm.get('name').setValue(response.razaoSocial || this.supplierForm.get('name').value);
          this.supplierForm.get('email').setValue(response.email || this.supplierForm.get('email').value);
          this.supplierForm.get('phoneNumber').setValue(response.phoneNumber || this.supplierForm.get('phoneNumber').value);
          this.supplierForm.get('homeNumber').setValue(response.number || this.supplierForm.get('homeNumber').value);
          this.supplierForm.get('complementResidential').setValue(response.complement || this.supplierForm.get('complementResidential').value);
          this.supplierForm.get('logradouro').setValue(response.logradouro || this.supplierForm.get('logradouro').value);
          this.supplierForm.get('neighborhood').setValue(response.neighborhood || this.supplierForm.get('neighborhood').value);
          this.supplierForm.get('city').setValue(response.city || this.supplierForm.get('city').value);
          this.supplierForm.get('state').setValue(response.uf || this.supplierForm.get('state').value);
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
