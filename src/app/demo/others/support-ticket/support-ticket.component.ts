import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgSelectModule } from '@ng-select/ng-select';
import { SupportTicketService } from 'src/app/services/support-ticket.service';
import { Pagination } from 'src/app/class/Pagination';
import { SupportTicket } from 'src/app/interfaces/SupportTicket';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-support-ticket',
  standalone: true,
  imports: [RouterModule, SharedModule, MatPaginatorModule, MatExpansionModule, NgSelectModule],
  templateUrl: './support-ticket.component.html',
  styleUrl: './support-ticket.component.scss',
  animations: [fadeInOnEnterAnimation()]
})
export class SupportTicketComponent implements OnInit {
  pagination = new Pagination;
  displaySeeMore: boolean = true;
  tickets: SupportTicket[];
  ticketStatus = [
    { value: 'Open', description: 'Aberto' },
    { value: 'InProgress', description: 'Em progresso' },
    { value: 'Closed', description: 'Fechado' },
    { value: 'Canceled ', description: 'Cancelado' }
  ];

  constructor(private supportTicketService: SupportTicketService, public commonService: CommonService) { }

  ngOnInit(): void {
    this.pagination.pageSize = Pagination.DEFAULT_PAGE_SIZE_TICKETS;

    this.supportTicketService.FindByPagination(this.pagination).subscribe((data) => {
      this.tickets = data.response;
      this.pagination.pageSize = data.pageSize;

      this.displaySeeMore = this.tickets.length != 0 ? true : false;
      this.displaySeeMore = this.tickets.length < data.totalSize;
    });
  }

  seeMoreTickets() {
    this.pagination.page++;
    this.pagination.pageSize = Pagination.DEFAULT_PAGE_SIZE_TICKETS;

    this.supportTicketService.FindByPagination(this.pagination).subscribe((data) => {
      this.tickets = this.tickets.concat(data.response);
      
      this.displaySeeMore = this.tickets.length != 0 ? true : false;
      this.displaySeeMore = this.tickets.length < data.totalSize;
    });
  }

  filter(event: Event) {
    this.pagination.filter = event ? String(event) : '';

    this.pagination.page = 1;
    this.pagination.pageSize = Pagination.DEFAULT_PAGE_SIZE_TICKETS;

    this.supportTicketService.FindByPagination(this.pagination).subscribe((data) => {
      this.tickets = data.response;
      this.pagination.pageSize = data.pageSize;

      this.displaySeeMore = this.tickets.length != 0 ? true : false;
      this.displaySeeMore = this.tickets.length < data.totalSize;
    });
  }

  getStatusDescription(status: string) {
    switch (status) {
      case 'Open': return 'Aberto';
      case 'InProgress': return 'Em progresso';
      case 'Closed': return 'Fechado';
      case 'Canceled': return 'Cancelado';
      default: return 'Não encontrado';
    }
  }

  getStatusLabel(status: string) {
    switch (status) {
      case 'Open': return 'label label-blue';
      case 'InProgress': return 'label label-green';
      case 'Closed': return 'label label-pink';
      case 'Canceled': return 'label label-orange';
      default: return 'label label-black';
    }
  }
}
