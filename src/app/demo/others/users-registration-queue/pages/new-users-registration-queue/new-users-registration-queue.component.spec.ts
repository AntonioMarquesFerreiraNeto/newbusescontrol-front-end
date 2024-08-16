import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsersRegistrationQueueComponent } from './new-users-registration-queue.component';

describe('NewUsersRegistrationQueueComponent', () => {
  let component: NewUsersRegistrationQueueComponent;
  let fixture: ComponentFixture<NewUsersRegistrationQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUsersRegistrationQueueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUsersRegistrationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
