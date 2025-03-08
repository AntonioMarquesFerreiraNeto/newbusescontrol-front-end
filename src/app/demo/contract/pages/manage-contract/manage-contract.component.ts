import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Contract } from 'src/app/interfaces/Contract';

@Component({
  selector: 'app-manage-contract',
  standalone: true,
  imports: [NgSelectModule, CommonModule, BrowserModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './manage-contract.component.html',
  styleUrl: './manage-contract.component.scss'
})
export class ManageContractComponent  implements OnInit {
  contractId: string;
  contract: Contract;
  disabledButton : Boolean = false;

  contractStatus = [
    { value: 'WaitingReview', description: 'Aguardando Revisão' },
    { value: 'Denied', description: 'Negado' },
    { value: 'WaitingSignature', description: 'Colhendo assinaturas' },
    { value: 'InProgress', description: 'Em andamento' },
    { value: 'Completed', description: 'Concluído' }
  ];

  constructor(public modal: NgbActiveModal){}

  ngOnInit(): void {
  }

  changeStatus(){

  }
}
