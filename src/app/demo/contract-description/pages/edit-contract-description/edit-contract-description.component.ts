import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ContractDescription } from 'src/app/interfaces/ContractDescription';
import { ContractDescriptionService } from 'src/app/services/contract-description.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-edit-contract-description',
  standalone: true,
  imports: [RouterModule, NgSelectModule, MatRadioModule, SharedModule, NgxMaskDirective, MatTabsModule],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './edit-contract-description.component.html',
  styleUrl: './edit-contract-description.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class EditContractDescriptionComponent implements OnInit {
  constructor(private contractDescriptionService: ContractDescriptionService, private swalFireService: SwalFireService, private router: Router, private route: ActivatedRoute, private snackbarService: SnackbarService) {}

  id: string = '';

  contractDescriptionForm: FormGroup;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.contractDescriptionService.GetById(this.id).subscribe({
      next: (response) =>{
        this.contractDescriptionForm = new FormGroup({
          title: new FormControl(response.title, [Validators.required, Validators.minLength(10)]),
          subTitle: new FormControl(response.subTitle, [Validators.required, Validators.minLength(10)]),
          owner: new FormControl(response.owner, [Validators.required, Validators.minLength(200)]),
          generalProvisions: new FormControl(response.generalProvisions, [Validators.required, Validators.minLength(200)]),
          objective: new FormControl(response.objective, [Validators.required, Validators.minLength(200)]),
          copyright: new FormControl(response.copyright, [Validators.required, Validators.minLength(10)])
        });
      },
      error: (error: HttpErrorResponse) =>{
        this.snackbarService.Open(error.error.detail);
        this.router.navigate(['/contract/descriptions']);
      }
    });
  }

  Submit() {
    if(this.contractDescriptionForm.invalid) {
      return;
    }

    const data : ContractDescription = this.contractDescriptionForm.value;

    this.swalFireService.SwalLoading();

    this.contractDescriptionService.Update(this.id, data).subscribe({
      next: () => {
        this.swalFireService.SwalSuccess('Descrição de contratos atualizada com sucesso!', () => {
          this.router.navigate(['/contract/descriptions']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
      }
    });
  }
}
