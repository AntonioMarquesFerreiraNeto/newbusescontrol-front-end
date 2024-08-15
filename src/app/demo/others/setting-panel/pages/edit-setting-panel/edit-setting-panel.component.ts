import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { SettingPanel } from 'src/app/interfaces/SettingPanel';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';
import { SettingPanelService } from 'src/app/services/setting-panel.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-edit-setting-panel',
  standalone: true,
  imports: [NgSelectModule, SharedModule, CommonModule, RouterModule],
  templateUrl: './edit-setting-panel.component.html',
  styleUrl: './edit-setting-panel.component.scss',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class EditSettingPanelComponent implements OnInit {
  id: string;
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
  
  constructor(private settingPanelService: SettingPanelService, private snackbarService: SnackbarService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.settingPanelService.GetById(id).subscribe({
      next: (response) => {
        this.settingPanelForm = new FormGroup({
          terminationFee: new FormControl(response.terminationFee, [Validators.required]),
          lateFeeInterestRate: new FormControl(response.lateFeeInterestRate),
          customerDelinquencyEnabled: new FormControl(response.customerDelinquencyEnabled, [Validators.required]),
          limitDateTerminate: new FormControl(response.limitDateTerminate ? response.limitDateTerminate : 0),
          parent: new FormControl(response.parent, [Validators.required]),
          active: new FormControl(response.active, [Validators.required])
        });
        this.id = id;
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
        this.router.navigate(['/setting-panel']);
      }
    });
  }

  submit() {
    if (this.settingPanelForm.invalid) {
      return;
    }

    var data: SettingPanel = this.settingPanelForm.value;
    data.limitDateTerminate = data.limitDateTerminate == 0 ? null : data.limitDateTerminate;

    this.settingPanelService.Update(this.id, data).subscribe({
      next: () => {
        this.snackbarService.Open('Painel de configuração editado com sucesso!');
        this.router.navigate(['/setting-panel']);
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.Open(error.error.detail);
      }
    });
  }
}
