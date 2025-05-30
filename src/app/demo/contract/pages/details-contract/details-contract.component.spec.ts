import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsContractComponent } from './details-contract.component';

describe('DetailsContractComponent', () => {
  let component: DetailsContractComponent;
  let fixture: ComponentFixture<DetailsContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
