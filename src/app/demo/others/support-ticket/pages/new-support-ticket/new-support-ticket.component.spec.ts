import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSupportTicketComponent } from './new-support-ticket.component';

describe('NewSupportTicketComponent', () => {
  let component: NewSupportTicketComponent;
  let fixture: ComponentFixture<NewSupportTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSupportTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSupportTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
