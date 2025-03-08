import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractFilesComponent } from './contract-files.component';

describe('ContractFilesComponent', () => {
  let component: ContractFilesComponent;
  let fixture: ComponentFixture<ContractFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
