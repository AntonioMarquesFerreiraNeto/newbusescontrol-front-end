import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { BusComponent } from './demo/bus/bus.component';
import { NewBusComponent } from './demo/bus/pages/new-bus/new-bus.component';
import { CustomerComponent } from './demo/customer/customer.component';
import { NewCustomerComponent } from './demo/customer/new-customer/new-customer.component';
import { EditBusComponent } from './demo/bus/pages/edit-bus/edit-bus.component';
import { EditCustomerComponent } from './demo/customer/edit-customer/edit-customer.component';
import { SystemAutomatedComponent } from './demo/others/system-automated/system-automated.component';
import { RunPageComponent } from './demo/others/system-automated/run-page/run-page.component';
import { WebhooksComponent } from './demo/others/webhooks/webhooks.component';
import { NewWebhookComponent } from './demo/others/webhooks/pages/new-webhook/new-webhook.component';
import { NotificationComponent } from './demo/others/notification/notification.component';
import { NewNotificationComponent } from './demo/others/notification/pages/new-notification/new-notification.component';
import { SettingPanelComponent } from './demo/others/setting-panel/setting-panel.component';
import { NewSettingPanelComponent } from './demo/others/setting-panel/pages/new-setting-panel/new-setting-panel.component';
import { EditSettingPanelComponent } from './demo/others/setting-panel/pages/edit-setting-panel/edit-setting-panel.component';
import { EmployeeComponent } from './demo/employee/employee.component';
import { NewEmployeeComponent } from './demo/employee/pages/new-employee/new-employee.component';
import { EditEmployeeComponent } from './demo/employee/pages/edit-employee/edit-employee.component';
import { UsersRegistrationQueueComponent } from './demo/others/users-registration-queue/users-registration-queue.component';
import { NewUsersRegistrationQueueComponent } from './demo/others/users-registration-queue/pages/new-users-registration-queue/new-users-registration-queue.component';
import { AccessManagerComponent } from './demo/others/access-manager/access-manager.component';
import { SupplierComponent } from './demo/supplier/supplier.component';
import { NewSupplierComponent } from './demo/supplier/pages/new-supplier/new-supplier.component';
import { EditSupplierComponent } from './demo/supplier/pages/edit-supplier/edit-supplier.component';
import { ContractDescriptionComponent } from './demo/contract-description/contract-description.component';
import { NewContractDescriptionComponent } from './demo/contract-description/pages/new-contract-description/new-contract-description.component';
import { EditContractDescriptionComponent } from './demo/contract-description/pages/edit-contract-description/edit-contract-description.component';
import { ContractComponent } from './demo/contract/contract.component';
import { NewContractComponent } from './demo/contract/pages/new-contract/new-contract.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component')
      },
      {
        path: 'bus',
        component: BusComponent
      },
      {
        path: 'bus/new',
        component: NewBusComponent
      },
      {
        path: 'bus/edit/:id',
        component: EditBusComponent
      },
      {
        path: 'customer',
        component: CustomerComponent
      },
      {
        path: 'customer/new',
        component: NewCustomerComponent
      },
      {
        path: 'customer/edit/:id',
        component: EditCustomerComponent
      },
      {
        path: 'system/automated',
        component: SystemAutomatedComponent
      },
      {
        path: 'system/automated/run/:id',
        component: RunPageComponent
      },
      {
        path: 'webhooks',
        component: WebhooksComponent
      },
      {
        path: 'webhooks/new',
        component: NewWebhookComponent
      },
      {
        path: 'notifications',
        component: NotificationComponent
      },
      {
        path: 'notifications/new',
        component: NewNotificationComponent
      },
      {
        path: 'setting-panel',
        component: SettingPanelComponent
      },
      {
        path: 'setting-panel/new',
        component: NewSettingPanelComponent
      },
      {
        path: 'setting-panel/edit/:id',
        component: EditSettingPanelComponent
      },
      {
        path: 'employee',
        component: EmployeeComponent
      },
      {
        path: 'employee/new',
        component: NewEmployeeComponent
      },
      {
        path: 'employee/edit/:id',
        component: EditEmployeeComponent
      },
      {
        path: 'users-registration-queue',
        component: UsersRegistrationQueueComponent
      },
      {
        path: 'users-registration-queue/new',
        component: NewUsersRegistrationQueueComponent
      },
      {
        path: 'access-manager',
        component: AccessManagerComponent
      },
      {
        path: 'suppliers',
        component: SupplierComponent
      },
      {
        path: 'suppliers/new',
        component: NewSupplierComponent
      },
      {
        path: 'suppliers/edit/:id',
        component: EditSupplierComponent
      },
      {
        path: 'contracts',
        component: ContractComponent
      },
      {
        path: 'contract/new',
        component: NewContractComponent
      },
      {
        path: 'contract/descriptions',
        component: ContractDescriptionComponent
      },
      {
        path: 'contract/descriptions/new',
        component: NewContractDescriptionComponent
      },
      {
        path: 'contract/descriptions/edit/:id',
        component: EditContractDescriptionComponent
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then((m) => m.FormElementsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./demo/pages/tables/tables.module').then((m) => m.TablesModule)
      },
      {
        path: 'apexchart',
        loadComponent: () => import('./demo/chart/apex-chart/apex-chart.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/extra/sample-page/sample-page.component')
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
