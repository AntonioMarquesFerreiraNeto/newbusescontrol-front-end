import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { SupportTicket } from 'src/app/interfaces/SupportTicket';
import { SupportTicketService } from 'src/app/services/support-ticket.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-new-support-ticket',
  standalone: true,
  imports: [RouterModule, SharedModule, NgSelectModule],
  templateUrl: './new-support-ticket.component.html',
  styleUrl: './new-support-ticket.component.scss',
  animations: [fadeInOnEnterAnimation()]
})
export class NewSupportTicketComponent implements OnInit {
  supportTicket: SupportTicket;
  form: FormGroup;
  types = [
    { type: 'Technical', description: 'Técnico' },
    { type: 'Business', description: 'Negócio' },
    { type: 'Financial', description: 'Financeiro' },
    { type: 'Others', description: 'Outro' }
  ]

  constructor(private supportTicketService: SupportTicketService, private swalFireService: SwalFireService, private router: Router) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      message: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  submit() {
    if(this.form.invalid){
      return;
    }

    const data : SupportTicket = this.form.value;

    this.supportTicketService.Create(data).subscribe({
      next: () => {
        this.swalFireService.SwalSuccess('Chamado aberto com sucesso!', () => {
          this.router.navigate(['/support/tickets']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
      }
    });
  }
}