import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFinancialComponent } from './new-financial.component';

describe('NewFinancialComponent', () => {
  let component: NewFinancialComponent;
  let fixture: ComponentFixture<NewFinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFinancialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
