import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Bus } from 'src/app/interfaces/Bus';
import { BusService } from 'src/app/services/bus.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-bus-availability',
  standalone: true,
  imports: [SharedModule, RouterModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule],
  templateUrl: './bus-availability.component.html',
  styleUrl: './bus-availability.component.scss'
})
export class BusAvailabilityComponent implements OnInit {
  @Input() headerClass: string;
  @Input() busId?: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  busDetails?: Bus;
  actionTxt?: string;

  constructor(private modal: NgbActiveModal, private busService: BusService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.busService.GetById(this.busId).subscribe({
      next: (response) => {
        this.busDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.modal.close();
      }
    });
  }

  onCustomHeaderAction(action: string) {
    if (action === 'cardRemoveAction') {
      this.modal.close();
    }
  }

  submit() {
    this.busService.ToggleAvailability(this.busId).subscribe({
      next: () => {
        this.snackbarService.Open(`Disponibilidade do ônibus para contrato atualizada com sucesso!`);
        this.onSubmitted.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
      }
    });

    this.modal.close();
  }

  close() {
    this.modal.close();
  }

  GetStatus() {
    return this.busDetails?.status == 'Active' ? 'Ativo' : 'Inativo';
  }

  GetAvailability() {
    return this.busDetails?.availability == 'Available' ? 'Disponível' : 'Indisponível';
  }
}
