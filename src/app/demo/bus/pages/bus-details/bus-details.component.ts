import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Bus } from 'src/app/interfaces/Bus';
import { BusService } from 'src/app/services/bus.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';

@Component({
  selector: 'app-bus-details',
  standalone: true,
  imports: [SharedModule, RouterModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule],
  templateUrl: './bus-details.component.html',
  styleUrl: './bus-details.component.scss'
})
export class BusDetailsComponent implements OnInit {
  @Input() busId?: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  busDetails?: Bus;
  actionTxt?: string;

  constructor(private modal: NgbActiveModal, private busService: BusService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.busService.GetById(this.busId).subscribe({
      next: (response) => {
        this.busDetails = response;
        this.actionTxt = this.busDetails?.status == 'Active' ? "Inativar" : "Ativar";
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
    this.busService.ToggleActive(this.busId).subscribe({
      next: () => {
        var actionMessage = this.busDetails?.status == 'Active' ? 'Inativado' : 'Ativado';
        this.snackbarService.Open(`Ônibus ${actionMessage} com sucesso!`);
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

  getStatus() {
    return this.busDetails?.status == 'Active' ? 'Ativo' : 'Inativo';
  }

  getAvailability() {
    return this.busDetails?.availability == 'Available' ? 'Disponível' : 'Indisponível';
  }
}
