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
import { DetailsContractComponent } from './demo/contract/pages/details-contract/details-contract.component';
import { EditContractComponent } from './demo/contract/pages/edit-contract/edit-contract.component';
import { SupportTicketComponent } from './demo/others/support-ticket/support-ticket.component';
import { NewSupportTicketComponent } from './demo/others/support-ticket/pages/new-support-ticket/new-support-ticket.component';
import { SuportTicketMessagesComponent } from './demo/others/support-ticket/pages/suport-ticket-messages/suport-ticket-messages.component';
import { TicketsComponent } from './demo/others/tickets/tickets.component';
import { LandingpageComponent } from './theme/layout/landingpage/landingpage.component';

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
        component: NewBusComponent,
        title: 'Buses Control | Novo Ônibus'
      },
      {
        path: 'bus/edit/:id',
        component: EditBusComponent,
        title: 'Buses Control | Editar Ônibus'
      },
      {
        path: 'customer',
        component: CustomerComponent
      },
      {
        path: 'customer/new',
        component: NewCustomerComponent,
        title: 'Buses Control | Novo Cliente'
      },
      {
        path: 'customer/edit/:id',
        component: EditCustomerComponent,
        title: 'Buses Control | Editar Cliente'
      },
      {
        path: 'system/automated',
        component: SystemAutomatedComponent,
        title: 'Buses Control | Rotinas'
      },
      {
        path: 'system/automated/run/:id',
        component: RunPageComponent,
        title: 'Buses Control | Executar rotina'
      },
      {
        path: 'webhooks',
        component: WebhooksComponent,
        title: 'Buses Control | Webhooks'
      },
      {
        path: 'webhooks/new',
        component: NewWebhookComponent,
        title: 'Buses Control | Novo Webhook'
      },
      {
        path: 'notifications',
        component: NotificationComponent,
        title: 'Buses Control | Notificações'
      },
      {
        path: 'notifications/new',
        component: NewNotificationComponent,
        title: 'Buses Control | Nova Notificação'
      },
      {
        path: 'setting-panel',
        component: SettingPanelComponent,
        title: 'Buses Control | Painéis'
      },
      {
        path: 'setting-panel/new',
        component: NewSettingPanelComponent,
        title: 'Buses Control | Novo Painel'
      },
      {
        path: 'setting-panel/edit/:id',
        component: EditSettingPanelComponent,
        title: 'Buses Control | Editar Painel'
      },
      {
        path: 'employee',
        component: EmployeeComponent
      },
      {
        path: 'employee/new',
        component: NewEmployeeComponent,
        title: 'Buses Control | Novo Funcionário'
      },
      {
        path: 'employee/edit/:id',
        component: EditEmployeeComponent,
        title: 'Buses Control | Editar Funcionário'
      },
      {
        path: 'users-registration-queue',
        component: UsersRegistrationQueueComponent,
        title: 'Buses Control | Registro de Usuários'
      },
      {
        path: 'users-registration-queue/new',
        component: NewUsersRegistrationQueueComponent,
        title: 'Buses Control | Novo Usuário'
      },
      {
        path: 'access-manager',
        component: AccessManagerComponent,
        title: 'Buses Control | Acessos'
      },
      {
        path: 'suppliers',
        component: SupplierComponent
      },
      {
        path: 'suppliers/new',
        component: NewSupplierComponent,
        title: 'Buses Control | Novo Fornecedor'
      },
      {
        path: 'suppliers/edit/:id',
        component: EditSupplierComponent,
        title: 'Buses Control | Editar Fornecedor'
      },
      {
        path: 'contracts',
        component: ContractComponent
      },
      {
        path: 'contracts/new',
        component: NewContractComponent,
        title: 'Buses Control | Novo Contrato'
      },
      {
        path: 'contracts/edit/:id',
        component: EditContractComponent,
        title: 'Buses Control | Editar Contrato'
      },
      {
        path: 'contracts/details/:id',
        component: DetailsContractComponent,
        title: 'Buses Control | Visualizar Contrato'
      },
      {
        path: 'contract/descriptions',
        component: ContractDescriptionComponent
      },
      {
        path: 'contract/descriptions/new',
        component: NewContractDescriptionComponent,
        title: 'Buses Control | Nova Descrição'
      },
      {
        path: 'contract/descriptions/edit/:id',
        component: EditContractDescriptionComponent,
        title: 'Buses Control | Editar Descrição'
      },
      {
        path: 'tickets',
        component: TicketsComponent,
        title: 'Buses Control | Chamados'
      },
      {
        path: 'support/tickets',
        component: SupportTicketComponent,
        title: 'Buses Control | Meus Chamados'
      },
      {
        path: 'support/tickets/new',
        component: NewSupportTicketComponent,
        title: 'Buses Control | Abrir chamado'
      },
      {
        path: 'support/tickets/messages/:id',
        component: SuportTicketMessagesComponent,
        title: 'Buses Control | Mensagens'
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
    path: 'home',
    component: LandingpageComponent,
    title: 'Buses Control | Principal'
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
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
