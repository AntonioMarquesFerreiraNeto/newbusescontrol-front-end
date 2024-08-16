import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRegistrationApproveComponent } from './users-registration-approve.component';

describe('UsersRegistrationApproveComponent', () => {
  let component: UsersRegistrationApproveComponent;
  let fixture: ComponentFixture<UsersRegistrationApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersRegistrationApproveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRegistrationApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
