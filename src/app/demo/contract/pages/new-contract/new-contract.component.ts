import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-new-contract',
  standalone: true,
  imports: [SharedModule, RouterModule, NgSelectModule, NgxMaskDirective, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-contract.component.html',
  styleUrl: './new-contract.component.scss',
  providers: [provideNgxMask()],
  animations: [fadeInOnEnterAnimation()]
})
export class NewContractComponent implements OnInit {
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

  constructor(
    private router: Router,
    private busService: BusService, 
    private employeeService: EmployeeService, 
    private settingPanelService: SettingPanelService, 
    private contractDescriptionService: ContractDescriptionService, 
    private customerService: CustomerService,
    private swalFireService: SwalFireService,
    private contractService: ContractService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.pagination.page = 1,
    this.pagination.pageSize = 100;
    
    this.busService.GetPaginated(this.pagination).subscribe(data => this.busList = data.response);
    this.employeeService.FindByType('driver').subscribe(response => this.driverList = response);
    this.settingPanelService.FindByParent('contract').subscribe(response => this.settingPanelList = response);
    this.contractDescriptionService.GetPaginated(this.pagination).subscribe(data => this.contractDescriptionList = data.response);
    this.customerService.GetPaginated(this.pagination).subscribe(data => this.customerList = data.response);

    this.contractForm = new FormGroup({
      busId: new FormControl(null, [Validators.required]),
      driverId: new FormControl(null, [Validators.required]),
      settingPanelId: new FormControl(null, [Validators.required]),
      contractDescriptionId: new FormControl(null, [Validators.required]),
      terminateDate: new FormControl('', [Validators.required]),
      paymentType: new FormControl(null, [Validators.required]),
      totalPrice: new FormControl(null, [Validators.required]),
      customersId: new FormControl(null, [Validators.required]),
      details: new FormControl('', [Validators.required, Validators.minLength(20)]),
    });
  }

  submit(){
    if(this.contractForm.invalid){
      return;
    }

    const data : Contract = this.contractForm.value;

    this.swalFireService.SwalLoading();

    this.contractService.Create(data).subscribe({
      next: () =>{
        this.swalFireService.SwalSuccess('Contrato criado com sucesso!', () => {
          this.router.navigate(['/contracts']);
        });
      },
      error: (error: HttpErrorResponse) =>{
        this.swalFireService.SwalError(error.error.detail);
      }
    });
  }
}
