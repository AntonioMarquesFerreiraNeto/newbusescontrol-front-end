import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTypeEmployeeComponent } from './change-type-employee.component';

describe('ChangeTypeEmployeeComponent', () => {
  let component: ChangeTypeEmployeeComponent;
  let fixture: ComponentFixture<ChangeTypeEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeTypeEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeTypeEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
