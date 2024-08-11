import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bus } from 'src/app/interfaces/Bus';
import { BusService } from 'src/app/services/bus.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Color } from 'src/app/interfaces/Color';
import { ColorService } from 'src/app/services/color.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';

@Component({
  selector: 'app-new-bus',
  standalone: true,
  imports: [SharedModule, RouterModule, NgSelectModule, NgxMaskDirective, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [provideNgxMask()],
  templateUrl: './new-bus.component.html',
  styleUrl: './new-bus.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class NewBusComponent implements OnInit {
  busForm!: FormGroup;
  colors!: Color[];

  availability = [
    { value: 1, description: 'Disponível' },
    { value: 2, description: 'Indisponível' }
  ]
  
  constructor(private busService: BusService, private colorService: ColorService, private snackBarService: SnackbarService, private router: Router) { }

  ngOnInit(): void {
    this.colorService.GetPaginated(1, 100).subscribe(x => this.colors = x.response);

    this.busForm = new FormGroup({
      colorId: new FormControl(null, [Validators.required]),
      brand: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
      manufactureDate: new FormControl('', [Validators.required]),
      renavam: new FormControl('', [Validators.required, Validators.minLength(3)]),
      licensePlate: new FormControl('', [Validators.required, Validators.minLength(7)]),
      chassi: new FormControl('', [Validators.required, Validators.minLength(17)]),
      seatingCapacity: new FormControl('', [Validators.required, Validators.max(240)])
    });
  }

  submit() {
    if(this.busForm.invalid) return;

    const data: Bus = this.busForm.value;

    this.busService.Create(data).subscribe({
      next: () => {
        this.snackBarService.Open("Ônibus adicionado com sucesso!");
        this.router.navigate(['/bus']);
      },
      error: (error: HttpErrorResponse) => {
        this.snackBarService.Open(error.error.detail);
      }
    });
  }
}
