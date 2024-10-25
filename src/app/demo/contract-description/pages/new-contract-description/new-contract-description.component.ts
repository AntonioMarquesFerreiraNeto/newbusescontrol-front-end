import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ContractDescription } from 'src/app/interfaces/ContractDescription';
import { ContractDescriptionService } from 'src/app/services/contract-description.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-new-contract-description',
  standalone: true,
  imports: [RouterModule, NgSelectModule, MatRadioModule, SharedModule, NgxMaskDirective, MatTabsModule],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './new-contract-description.component.html',
  styleUrl: './new-contract-description.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class NewContractDescriptionComponent implements OnInit {
  
  constructor(private contractDescriptionService: ContractDescriptionService, private swalFireService: SwalFireService, private router: Router) {}

  contractDescriptionForm: FormGroup;

  ngOnInit(): void {
    this.contractDescriptionForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      subTitle: new FormControl('', [Validators.required, Validators.minLength(10)]),
      owner: new FormControl('', [Validators.required, Validators.minLength(200)]),
      generalProvisions: new FormControl('', [Validators.required, Validators.minLength(200)]),
      objective: new FormControl('', [Validators.required, Validators.minLength(200)]),
      copyright: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  Submit() {
    if(this.contractDescriptionForm.invalid) {
      return;
    }

    const data : ContractDescription = this.contractDescriptionForm.value;

    this.swalFireService.SwalLoading();

    this.contractDescriptionService.Create(data).subscribe({
      next: () => {
        this.swalFireService.SwalSuccess('Descrição de contratos criada com sucesso!', () => {
          this.router.navigate(['/contract/descriptions']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
      }
    });
  }
}
