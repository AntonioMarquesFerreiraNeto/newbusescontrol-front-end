import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Webhook } from 'src/app/interfaces/Webhook';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { WebhookService } from 'src/app/services/webhook.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-new-webhook',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, NgSelectModule],
  templateUrl: './new-webhook.component.html',
  styleUrl: './new-webhook.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class NewWebhookComponent implements OnInit {
  
  webhookForm: FormGroup;
  listEvents: string[];
  listType = [
    { value: 'Received', description: 'Pagamento recebido' },
    { value: 'Refunded', description: 'Pagamento estornado' },
    { value: 'Chargeback', description: 'Pagamento em chargeback' },
  ]

  constructor(private webhookService: WebhookService, private swalFireService: SwalFireService, private snackbarService: SnackbarService, private router: Router) { }

  ngOnInit(): void {
    this.webhookForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(11)]),
      url: new FormControl('', [Validators.required, Validators.minLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl(null, [Validators.required]),
      events: new FormControl(null, [Validators.required])
    });

    this.listEvents = this.webhookService.GetAllEvents();
  }

  submit() {
    console.log(this.webhookForm);
    if(this.webhookForm.invalid) 
    {
      return;
    }

    const data : Webhook = this.webhookForm.value;

    this.swalFireService.SwalLoading();

    this.webhookService.Create(data).subscribe({
      next: () => {
        this.swalFireService.Close();
        this.snackbarService.Open('Webhook criado com sucesso!');
        this.router.navigate(['/webhooks']);
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.Close();
        this.snackbarService.Open(error.error.detail);
      }
    });
  }
}
