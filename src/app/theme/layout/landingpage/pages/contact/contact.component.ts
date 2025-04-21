import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SharedModule } from 'primeng/api';
import { Contact } from 'src/app/interfaces/Contact';
import { ContactService } from 'src/app/services/contact.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NgxMaskDirective, CommonModule, FormsModule, SharedModule, ReactiveFormsModule],
  providers: [provideNgxMask()],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  disabledContact: boolean = false;

  constructor(private modal: NgbActiveModal, private swalFireService: SwalFireService, private snackbarService: SnackbarService, private contactService: ContactService) { }
  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });
  }

  close() {
    this.modal.close();
  }

  submit() {
    if(!this.contactForm.valid) {
      return;
    }

    this.disabledContact = true;

    const data : Contact = this.contactForm.value;

    this.contactService.Create(data).subscribe({
      next: () => {
        this.swalFireService.SwalSuccess('Contato realizado com sucesso!');
        this.disabledContact = false;
        this.modal.close();
      },
      error: (error: HttpErrorResponse) => {
        const errorMsg = error.error.detail ?? 'Desculpe, mas não conseguimos processar sua solicitação';
        this.snackbarService.Open(errorMsg, 'top');
        this.disabledContact = false;
      }
    });
  }
}
