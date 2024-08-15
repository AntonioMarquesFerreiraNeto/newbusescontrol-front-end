import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Pagination } from 'src/app/class/Pagination';
import { SettingPanel } from 'src/app/interfaces/SettingPanel';
import { SettingPanelService } from 'src/app/services/setting-panel.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SettingPanelDetailsComponent } from './pages/setting-panel-details/setting-panel-details.component';

@Component({
  selector: 'app-setting-panel',
  standalone: true,
  imports: [RouterModule, SharedModule, MatPaginatorModule],
  templateUrl: './setting-panel.component.html',
  styleUrl: './setting-panel.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class SettingPanelComponent {

  settingsPanel: SettingPanel[];
  pagination = new Pagination();

  constructor(private settingPanelService: SettingPanelService, private datePipe: DatePipe, private modal: NgbModal) {

    this.settingPanelService.GetPaginated(this.pagination).subscribe((response) => {
      this.settingsPanel = response.response;
      this.pagination.totalSize = response.totalSize;
    });
  }


  getLabelActive(active: boolean) {
    return active ? 'label-blue' : 'label-pink'
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

  handlePageEvent(event: PageEvent) {
    const previousPageSize = this.pagination.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;

    if (event.pageSize !== previousPageSize) {
      this.pagination.page = 1;
    }

    this.refreshSettingsPanel();
  }

  openDetails(id: string) {
    const style = { size: 'lg' };
    var modalRef = this.modal.open(SettingPanelDetailsComponent, style);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.onSubmitted.subscribe(() => {
      this.refreshSettingsPanel();
    });
  }

  refreshSettingsPanel() {
    this.settingPanelService.GetPaginated(this.pagination).subscribe((response) => {
      this.settingsPanel = response.response;
      this.pagination.totalSize = response.totalSize;
    });
  }
}
