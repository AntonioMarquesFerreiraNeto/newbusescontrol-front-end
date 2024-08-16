import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRegistrationQueueComponent } from './users-registration-queue.component';

describe('UsersRegistrationQueueComponent', () => {
  let component: UsersRegistrationQueueComponent;
  let fixture: ComponentFixture<UsersRegistrationQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersRegistrationQueueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRegistrationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
