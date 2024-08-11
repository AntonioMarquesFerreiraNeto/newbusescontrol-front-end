import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Bus } from 'src/app/interfaces/Bus';
import { Color } from 'src/app/interfaces/Color';
import { BusService } from 'src/app/services/bus.service';
import { ColorService } from 'src/app/services/color.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [SharedModule, RouterModule, NgSelectModule, NgxMaskDirective, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [provideNgxMask()],
  templateUrl: './edit-bus.component.html',
  styleUrl: './edit-bus.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class EditBusComponent implements OnInit {
  busEdit?: Bus;
  busForm?: FormGroup;
  colors!: Color[];

  availability = [
    { value: 1, description: 'Disponível' },
    { value: 2, description: 'Indisponível' }
  ]

  constructor(private busService: BusService, private colorService: ColorService, private snackBarService: SnackbarService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    var id = this.activeRoute.snapshot.paramMap.get('id');

    this.busService.GetById(id).subscribe({
      next: (response) => {
        this.busEdit = response;

        this.busForm = new FormGroup({
          colorId: new FormControl(this.busEdit ? this.busEdit.colorId : null, [Validators.required]),
          brand: new FormControl(this.busEdit ? this.busEdit.brand : '', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
          name: new FormControl(this.busEdit ? this.busEdit.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
          manufactureDate: new FormControl(this.busEdit ? this.busEdit.manufactureDate : '', [Validators.required]),
          renavam: new FormControl(this.busEdit ? this.busEdit.renavam : '', [Validators.required, Validators.minLength(3)]),
          licensePlate: new FormControl(this.busEdit ? this.busEdit.licensePlate : '', [Validators.required, Validators.minLength(7)]),
          chassi: new FormControl(this.busEdit ? this.busEdit.chassi : '', [Validators.required, Validators.minLength(17)]),
          seatingCapacity: new FormControl(this.busEdit ? this.busEdit.seatingCapacity : '', [Validators.required, Validators.max(240)])
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackBarService.Open(error.error.detail);
        this.router.navigate(['/bus']);
      }
    });

    this.colorService.GetPaginated(1, 100).subscribe(x => this.colors = x.response);
  }

  submit() {
    if (this.busForm.invalid) return;

    const data: Bus = this.busForm.value;

    this.busService.Update(this.busEdit.id, data).subscribe({
      next: () => {
        this.snackBarService.Open("Ônibus editado com sucesso!");
        this.router.navigate(['/bus']);
      },
      error: (error: HttpErrorResponse) => {
        this.snackBarService.Open(error.error.detail);
      }
    });
  }
}
