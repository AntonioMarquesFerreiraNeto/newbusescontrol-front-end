import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Home',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'navigation',
    title: 'FROTA',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'bus',
        title: 'Frota',
        type: 'item',
        url: '/bus',
        icon: 'bi bi-bus-front-fill',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'persons',
    title: 'Pessoas',
    type: 'group',
    icon: 'icon-ui',
    children: [
      {
        id: 'customer',
        title: 'Clientes',
        type: 'item',
        url: '/customer',
        icon: 'feather icon-users',
        classes: 'nav-item'
      },
      {
        id: 'supplier',
        title: 'Fornecedores',
        type: 'item',
        url: '/sample-page',
        icon: 'feather icon-users',
        classes: 'nav-item'
      },
      {
        id: 'employee',
        title: 'Funcionários',
        type: 'item',
        url: '/basic/button',
        icon: 'bi bi-person-gear',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'ui-element',
    title: 'financeiro',
    type: 'group',
    icon: 'icon-ui',
    children: [
      {
        id: 'financial',
        title: 'Financeiro',
        type: 'item',
        url: '/forms/basic',
        icon: 'bi bi-piggy-bank',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'ui-element',
    title: 'contrato',
    type: 'group',
    icon: 'icon-ui',
    children: [
      {
        id: 'contract',
        title: 'Contratos',
        type: 'item',
        url: '/tables/bootstrap',
        icon: 'feather icon-file',
        classes: 'nav-item'
      },
      {
        id: 'contract',
        title: 'Descrições',
        type: 'item',
        url: '/apexchart',
        icon: 'feather icon-file-text',
        classes: 'nav-item'
      },
      {
        id: 'contract',
        title: 'Configurações',
        type: 'item',
        url: '/datta-able/angular/default/widget/table',
        icon: 'bi bi-file-lock',
        classes: 'nav-item'
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
