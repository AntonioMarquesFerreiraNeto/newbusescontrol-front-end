import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import TblBootstrapComponent from "../pages/tables/tbl-bootstrap/tbl-bootstrap.component";
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BusDetailsComponent } from './pages/bus-details/bus-details.component';
import { Bus } from 'src/app/interfaces/Bus';
import { BusService } from 'src/app/services/bus.service';
import { DatePipe } from '@angular/common';
import { BusAvailabilityComponent } from './pages/bus-availability/bus-availability.component';

@Component({
  selector: 'app-bus',
  standalone: true,
  imports: [SharedModule, TblBootstrapComponent, RouterModule, NgSelectModule, MatProgressSpinner, MatPaginatorModule],
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class BusComponent implements OnInit {
  status = [
    { value: null, description: 'Todos' },
    { value: 2, description: 'Ativos' },
    { value: 3, description: 'Inativos' },
  ]
  tableMsg = '';
  frota!: Bus[];

  constructor(private modal: NgbModal, private busService: BusService, private datePipe: DatePipe) {

  }
  
  ngOnInit(): void {
    this.busService.GetPaginated(1, 20).subscribe(
      response => this.frota = response
    );

    this.tableMsg = this.frota?.length == 0 ? 'Nenhum registro encontrado' : '';
  }

  RefreshFrota() {
    this.busService.GetPaginated(1, 20).subscribe(
      response => this.frota = response
    );
  }

  OpenDetails(id: string) {
    const style = { size: 'lg' };
    var modal = this.modal.open(BusDetailsComponent, style);
    modal.componentInstance.busId = id;
    modal.componentInstance.onSubmitted.subscribe(() => {
      this.RefreshFrota(); 
    });
  }

  OpenAvailability(event: MouseEvent, id: string) {
    event.stopImmediatePropagation();
    const style = { size: 'lg' };
    var modal = this.modal.open(BusAvailabilityComponent, style);
    modal.componentInstance.busId = id;
    modal.componentInstance.onSubmitted.subscribe(() => {
      this.RefreshFrota(); 
    });
  }  

  DateFormated(date: string) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  GetLabelStatus(status: string) {
    return status == 'Active' ? 'label-blue' : 'label-pink'
  }

  GetDetailStatus(status: string) {
    return status == 'Active' ? 'Ativo' : 'Inativo';
  }

  GetLabelAvailability(availability: string) {
    return availability == 'Available' ? 'label-blue' : 'label-pink'
  }

  GetDetailAvailability(availability: string) {
    return availability == 'Available' ? 'Disponível' : 'Indisponível'
  }

  GetIconAvailability(availability: string){
    return availability == 'Available' ? 'feather icon-unlock' : 'feather icon-lock'
  }
}
