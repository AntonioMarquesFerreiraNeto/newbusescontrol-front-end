import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-bus-details',
  standalone: true,
  imports: [SharedModule, RouterModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule],
  templateUrl: './bus-details.component.html',
  styleUrl: './bus-details.component.scss'
})
export class BusDetailsComponent implements OnInit {

  @Input() headerClass: string;
  
  busDetails = {
    marca: 'Marcopolo',
    nome: 'Paradiso 1200',
    cor: 'Branco',
    fabricação: '07/2024',
    renavam: '12345678901',
    placa: 'ABC-1234',
    chassi: '1HGBH41JXMN109186',
    capacidade: 50,
    disponibilidade: 'Disponível',
    status: 'Ativo'
  };

  constructor(public modal: NgbActiveModal){

  }
  
  ngOnInit(): void {
      
  }

  onCustomHeaderAction(action: string) {
    if (action === 'cardRemoveAction') {
      this.modal.close();
    }
  }

  close() {
    this.modal.close();
  }
}
