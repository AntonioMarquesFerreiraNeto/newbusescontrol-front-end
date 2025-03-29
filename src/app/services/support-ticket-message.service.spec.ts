import { TestBed } from '@angular/core/testing';

import { SupportTicketMessageService } from './support-ticket-message.service';

describe('SupportTicketMessageService', () => {
  let service: SupportTicketMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportTicketMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
