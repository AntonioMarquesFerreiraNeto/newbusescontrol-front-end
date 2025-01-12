import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthResetCodeComponent } from './auth-reset-code.component';

describe('AuthResetCodeComponent', () => {
  let component: AuthResetCodeComponent;
  let fixture: ComponentFixture<AuthResetCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthResetCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthResetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
