import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Supplier } from 'src/app/interfaces/Supplier';
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

  constructor(private supplierService: SupplierService, private snackbarService: SnackbarService, private swalFireService: SwalFireService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.supplierService.GetById(this.id).subscribe({
      next: (response) => {
        this.supplierForm = new FormGroup({
          name: new FormControl(response.name, [Validators.required, Validators.minLength(3)]),
          openDate: new FormControl(response.openDate, Validators.required),
          cnpj: new FormControl(response.cnpj, [Validators.required, Validators.minLength(14)]),
          email: new FormControl(response.email, [Validators.required, Validators.email]),
          phoneNumber: new FormControl(response.phoneNumber, [Validators.required]),
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
      return;
    }

    const data: Supplier = this.supplierForm.value;

    this.swalFireService.SwalLoading();

    this.supplierService.Update(this.id, data).subscribe({
      next: () => {
        this.swalFireService.Close();
        this.snackbarService.Open('Fornecedor atualizado com sucesso!');
        this.router.navigate(['/suppliers']);
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.Close();
        this.snackbarService.Open(error.error.detail);
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
