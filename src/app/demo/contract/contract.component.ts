import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [RouterModule, SharedModule, MatPaginatorModule, MatExpansionModule, PanelModule, AvatarModule, ButtonModule, MenuModule],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.scss',
  animations: [fadeInOnEnterAnimation()]
})
export class ContractComponent implements OnInit {
  ngOnInit(): void {
      
  }

  contracts = [
    {
      id: 1,
      reference: '#ABCEFG',
      value: 'R$ 10.000,00',
      status: 'Em andamento',
      createdAt: '19 de Janeiro de 2024',
      description: 'Contrato para fornecimento de produtos.',
      client: 'Empresa X'
    },
    {
      id: 2,
      reference: '#HJKLMN',
      value: 'R$ 5.000,00',
      status: 'Finalizado',
      createdAt: '10 de Fevereiro de 2024',
      description: 'Serviços de consultoria.',
      client: 'Empresa Y'
    },
    {
      id: 3,
      reference: '#OPQRST',
      value: 'R$ 7.500,00',
      status: 'Em andamento',
      createdAt: '15 de Março de 2024',
      description: 'Manutenção de sistemas.',
      client: 'Empresa Z'
    }
  ];

  // Estado de colapso para cada linha
  isCollapsed: boolean[] = this.contracts.map(() => true);

  // Método para alternar o estado de colapso
  toggleCollapse(index: number): void {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }
}
