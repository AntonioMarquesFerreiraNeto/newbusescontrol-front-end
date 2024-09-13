import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { SettingPanel } from 'src/app/interfaces/SettingPanel';
import { SettingPanelService } from 'src/app/services/setting-panel.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-new-setting-panel',
  standalone: true,
  imports: [NgSelectModule, SharedModule, CommonModule, RouterModule],
  templateUrl: './new-setting-panel.component.html',
  styleUrl: './new-setting-panel.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class NewSettingPanelComponent implements OnInit {

  settingPanelForm: FormGroup;

  parentList = [
    { value: 'Contract', description: 'Contratos' },
    { value: 'Revenue', description: 'Receitas' },
    { value: 'Expense', description: 'Despesas' }
  ]

  activeList = [
    { value: true, description: 'Ativo' },
    { value: false, description: 'Inativo' }
  ]

  customerDelinquencyEnabledList = [
    { value: true, description: 'Sim' },
    { value: false, description: 'Não' }
  ]

  percentageList = [
    { value: 0, description: 'Nenhuma' },
    { value: 1, description: '1%' },
    { value: 1.5, description: '1,5%' },
    { value: 2, description: '2%' },
    { value: 2.5, description: '2,5%' },
    { value: 3, description: '3%' },
    { value: 3.5, description: '3,5%' },
    { value: 4, description: '4%' },
    { value: 4.5, description: '4,5%' },
    { value: 5, description: '5%' },
    { value: 5.5, description: '5,5%' },
    { value: 6, description: '6%' },
    { value: 6.5, description: '6,5%' },
    { value: 7, description: '7%' },
    { value: 7.5, description: '7,5%' },
    { value: 8, description: '8%' },
    { value: 8.5, description: '8,5%' },
    { value: 9, description: '9%' },
    { value: 9.5, description: '9,5%' },
    { value: 10, description: '10%' }
  ]
  filteredPercentageList = this.percentageList.filter(x => x.value != 0);

  limitDateTerminateList = [
    { value: 0, description: 'Nenhuma' },
    { value: 1, description: '1 ano' },
    { value: 2, description: '2 anos' },
    { value: 3, description: '3 anos' },
    { value: 4, description: '4 anos' },
    { value: 5, description: '5 anos' },
    { value: 6, description: '6 anos' },
    { value: 7, description: '7 anos' },
    { value: 8, description: '8 anos' },
    { value: 9, description: '9 anos' },
    { value: 10, description: '10 anos' }
  ];
  

  constructor(private settingPanelService: SettingPanelService, private swalFireService: SwalFireService, private router: Router) { }

  ngOnInit(): void {
    this.settingPanelForm = new FormGroup({
      terminationFee: new FormControl(null, [Validators.required]),
      lateFeeInterestRate: new FormControl(null),
      customerDelinquencyEnabled: new FormControl(null, [Validators.required]),
      limitDateTerminate: new FormControl(null),
      parent: new FormControl(null, [Validators.required]),
      active: new FormControl(null, [Validators.required])
    });
  }

  submit() {
    if (this.settingPanelForm.invalid) {
      return;
    }

    var data: SettingPanel = this.settingPanelForm.value;
    data.limitDateTerminate = data.limitDateTerminate == 0 ? null : data.limitDateTerminate;

    this.swalFireService.SwalLoading();

    this.settingPanelService.Create(data).subscribe({
      next: () => {
        this.swalFireService.SwalSuccess('Painel de configuração adicionado com sucesso!', () => {
          this.router.navigate(['/setting-panel']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
      }
    });
  }
}
