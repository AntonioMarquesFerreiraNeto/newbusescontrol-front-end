import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import TblBootstrapComponent from "../pages/tables/tbl-bootstrap/tbl-bootstrap.component";
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinner} from '@angular/material/progress-spinner';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { MatPaginatorModule} from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BusDetailsComponent } from './pages/bus-details/bus-details.component';

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
export class BusComponent {
  status = [ 
    { value: null, description: 'Todos' }, 
    { value: 2, description: 'Ativos' }, 
    { value: 3, description: 'Inativos'}, 
  ]

  constructor(private modal: NgbModal){

  }

  OpenDetails() {
    const style = { size: 'lg' };
    this.modal.open(BusDetailsComponent, style);
  }
}
