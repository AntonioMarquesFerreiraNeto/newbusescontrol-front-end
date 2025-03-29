import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuportTicketMessagesComponent } from './suport-ticket-messages.component';

describe('SuportTicketMessagesComponent', () => {
  let component: SuportTicketMessagesComponent;
  let fixture: ComponentFixture<SuportTicketMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuportTicketMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuportTicketMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
