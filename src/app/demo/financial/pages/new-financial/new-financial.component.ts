import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Pagination } from 'src/app/class/Pagination';
import { Customer } from 'src/app/interfaces/Customer';
import { Financial } from 'src/app/interfaces/Financial';
import { SettingPanel } from 'src/app/interfaces/SettingPanel';
import { Supplier } from 'src/app/interfaces/Supplier';
import { CommonService } from 'src/app/services/common.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FinancialService } from 'src/app/services/financial.service';
import { SettingPanelService } from 'src/app/services/setting-panel.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SwalFireService } from 'src/app/services/swal-fire.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-new-financial',
  standalone: true,
  imports: [SharedModule, RouterModule, NgSelectModule, CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './new-financial.component.html',
  styleUrl: './new-financial.component.scss',
  providers: [provideNgxMask()],
  animations: [fadeInOnEnterAnimation()],
})
export class NewFinancialComponent implements OnInit {
  type: string;
  titleCard: string;
  pagination = new Pagination;
  financialForm: FormGroup;
  settingPanelList: SettingPanel[];
  customerList: Customer[];
  supplierList: Supplier[];
  paymentTypeList = [
    { description: 'Fatura única', value: 'Single' },
    { description: 'Fatura múltipla', value: 'Multiple' }
  ];

  constructor(
    public commonService: CommonService, 
    private route: ActivatedRoute, 
    private settingPanelService: SettingPanelService, 
    private customerService: CustomerService, 
    private supplierService: SupplierService,
    private financialService: FinancialService,
    private swalFireService: SwalFireService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pagination.page = 1,
    this.pagination.pageSize = 100;

    this.type = this.route.snapshot.paramMap.get('type');
    this.titleCard = this.type == 'revenue' ? 'Nova receita' : 'Nova despesa';

    this.financialForm = new FormGroup({
      settingPanelId: new FormControl(null, Validators.required),
      personId: new FormControl(null, Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      totalPrice: new FormControl('', Validators.required),
      paymentType: new FormControl(null, Validators.required),
      terminateDate: new FormControl('', Validators.required)
    });

    this.settingPanelService.FindByParent(this.type == 'revenue' ? 'Revenue' : 'Expense').subscribe(response => this.settingPanelList = response);
    this.customerService.GetPaginated(this.pagination).subscribe(data => this.customerList = data.response);
    this.supplierService.GetPaginated(this.pagination).subscribe(data => this.supplierList = data.response);
  }

  submit() {
    if(this.financialForm.invalid) {
      return;
    }

    let request : Financial = this.financialForm.value;
    request.customerId = this.financialForm.get('personId').value;
    request.supplierId = this.financialForm.get('personId').value;
    
    this.swalFireService.SwalLoading();

    const subscribeInstance = this.type == 'revenue' ? this.financialService.CreateRevenue(request) : this.financialService.CreateExpense(request);
    subscribeInstance.subscribe({
      next: () => {
        this.swalFireService.SwalSuccess('Lançamento registrado com sucesso!', () => {
          this.router.navigate(['/financials']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.swalFireService.SwalError(error.error.detail);
      }
    });
  }
}
