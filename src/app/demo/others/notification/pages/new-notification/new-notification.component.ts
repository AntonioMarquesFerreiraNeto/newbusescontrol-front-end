import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-new-notification',
  standalone: true,
  imports: [SharedModule, RouterModule, NgSelectModule],
  templateUrl: './new-notification.component.html',
  styleUrl: './new-notification.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class NewNotificationComponent implements OnInit {

  notificationForm: FormGroup;

  accessLevel = [
    { value: 'Public', description: 'Pública' },
    { value: 'Admin', description: 'Administradores' },
    { value: 'Assistant', description: 'Assistentes' }
  ]

  constructor(private notificationService: NotificationService, private snackbarService: SnackbarService, private router: Router) {

  }

  ngOnInit(): void {
    this.notificationForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      message: new FormControl('', [Validators.required, Validators.minLength(10)]),
      accessLevel: new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (this.notificationForm.invalid) {
      return;
    }

    const data = this.notificationForm.value;

    this.notificationService.Create(data).subscribe({
      next: () => {
        this.snackbarService.Open('Notificação criada com sucesso!');
        this.router.navigate(['/notifications']);
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
      }
    });
  }
}
