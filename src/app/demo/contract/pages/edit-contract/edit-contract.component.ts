import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bus } from 'src/app/interfaces/Bus';
import { BusService } from 'src/app/services/bus.service';
import { Pagination } from 'src/app/class/Pagination';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interfaces/Employee';
import { SettingPanel } from 'src/app/interfaces/SettingPanel';
import { SettingPanelService } from 'src/app/services/setting-panel.service';
import { ContractDescription } from 'src/app/interfaces/ContractDescription';
import { ContractDescriptionService } from 'src/app/services/contract-description.service';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ContractService } from 'src/app/services/contract.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Contract } from 'src/app/interfaces/Contract';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { SnackbarService } from 'src/app/services/helpers/snackbar.service';

@Component({
  selector: 'app-edit-contract',
  standalone: true,
  imports: [SharedModule, RouterModule, NgSelectModule, NgxMaskDirective, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-contract.component.html',
  styleUrl: './edit-contract.component.scss',
  providers: [
    provideNgxMask()
  ],
  animations: [fadeInOnEnterAnimation()]
})
export class EditContractComponent implements OnInit {
  contract: Contract;
  contractId: string;
  busList: Bus[];
  driverList: Employee[];
  settingPanelList: SettingPanel[];
  contractDescriptionList: ContractDescription[];
  customerList: Customer[];
  contractForm: FormGroup;
  pagination = new Pagination;
  paymentTypeList = [
    { description: 'Fatura única', value: 'Single' },
    { description: 'Fatura múltipla', value: 'Multiple' }
  ];

  ngOnInit(): void {
    this.pagination.page = 1,
    this.pagination.pageSize = 100;

    this.busService.GetPaginated(this.pagination).subscribe(data => this.busList = data.response);
    this.employeeService.FindByType('driver').subscribe(response => this.driverList = response);
    this.settingPanelService.FindByParent('contract').subscribe(response => this.settingPanelList = response);
    this.contractDescriptionService.GetPaginated(this.pagination).subscribe(data => this.contractDescriptionList = data.response);
    this.customerService.GetPaginated(this.pagination).subscribe(data => this.customerList = data.response);

    this.contractId = this.route.snapshot.paramMap.get('id');

    this.contractService.GetById(this.contractId).subscribe({
      next: (response) => {
        this.contract = response;

        this.contractForm = new FormGroup({
          busId: new FormControl(this.contract.busId, [Validators.required]),
          driverId: new FormControl(this.contract.driverId, [Validators.required]),
          settingPanelId: new FormControl(this.contract.settingPanelId, [Validators.required]),
          contractDescriptionId: new FormControl(this.contract.contractDescription.id, [Validators.required]),
          terminateDate: new FormControl(this.contract.terminateDate, [Validators.required]),
          paymentType: new FormControl(this.contract.paymentType, [Validators.required]),
          totalPrice: new FormControl(this.contract.totalPrice, [Validators.required]),
          customersId: new FormControl(this.contract.customersContract.map(x => x.customerId), [Validators.required]),
          details: new FormControl(this.contract.details, [Validators.required, Validators.minLength(20)])
        });
      },
      error: (error: HttpErrorResponse) =>{
        this.snackbarService.Open(error.error.detail);
        this.router.navigate(['/contracts']);
      }
    });
  }

  constructor(
    private router: Router,
    private busService: BusService,
    private employeeService: EmployeeService,
    private settingPanelService: SettingPanelService,
    private contractDescriptionService: ContractDescriptionService,
    private customerService: CustomerService,
    private swalFireService: SwalFireService,
    private contractService: ContractService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute
  ) { }

  submit() {
    if (this.contractForm.invalid) {
      return;
    }

    const data: Contract = this.contractForm.value;

    this.swalFireService.SwalLoading();

    this.contractService.Update(this.contractId, data).subscribe({
      next: () => {
        this.swalFireService.SwalSuccess('Contrato atualizado com sucesso!', () => {
          this.router.navigate(['/contracts']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
      }
    });
  }
}
