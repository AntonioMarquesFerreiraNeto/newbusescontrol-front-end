import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsFinancialComponent } from './options-financial.component';

describe('OptionsFinancialComponent', () => {
  let component: OptionsFinancialComponent;
  let fixture: ComponentFixture<OptionsFinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsFinancialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
