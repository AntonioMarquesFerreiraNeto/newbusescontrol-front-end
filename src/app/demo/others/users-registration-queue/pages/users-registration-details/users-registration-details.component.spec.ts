import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRegistrationDetailsComponent } from './users-registration-details.component';

describe('UsersRegistrationDetailsComponent', () => {
  let component: UsersRegistrationDetailsComponent;
  let fixture: ComponentFixture<UsersRegistrationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersRegistrationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRegistrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
