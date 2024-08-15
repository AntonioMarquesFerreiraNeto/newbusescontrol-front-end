import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { SettingPanel } from 'src/app/interfaces/SettingPanel';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SettingPanelService } from 'src/app/services/setting-panel.service';

@Component({
  selector: 'app-setting-panel-details',
  standalone: true,
  imports: [],
  templateUrl: './setting-panel-details.component.html',
  styleUrl: './setting-panel-details.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class SettingPanelDetailsComponent implements OnInit {

  @Input() id: string;
  @Output() onSubmitted: EventEmitter<void> = new EventEmitter<void>();
  settingPanel: SettingPanel;

  constructor(private modal: NgbActiveModal, private settingPanelService: SettingPanelService, private snackbarService: SnackbarService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.settingPanelService.GetById(this.id).subscribe({
      next: (response) => {
        this.settingPanel = response;
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.close();
      }
    });
  }

  getDetailActive(active: boolean) {
    return active ? 'Ativo' : 'Inativo';
  }

  getParent(parent: string) {
    switch (parent) {
      case 'Contract':
        return 'Contratos';
      case 'Revenue':
        return 'Receitas';
      case 'Expense':
        return 'Despesas';
      default:
        return 'Parente desconhecido';
    }
  }

  getDateFormated(date: string) {
    const formato = 'dd \'de\' MMMM \'de\' yyyy'
    const dataFormatada = this.datePipe.transform(date, formato, 'pt-br');
    return dataFormatada;
  }

  getPercentageFormatted(value: number) {
    return value || value != 0 ? value + '%' : 'Nenhuma';
  }

  getLimitDateTerminateFormated(value: number) {
    if(value) {
      return value == 1 ? '1 ano' : `${value} anos`
    }
    else{
      return 'Nenhuma';
    }
  }

  close() {
    this.modal.close();
  }

  submit() {
    this.settingPanelService.Delete(this.id).subscribe({
      next: () => {
        this.snackbarService.Open('Painel de configuração deletado com sucesso!');
        this.close();
        this.onSubmitted.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.close();
      }
    });
  }
}
