import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContractDescriptionComponent } from './new-contract-description.component';

describe('NewContractDescriptionComponent', () => {
  let component: NewContractDescriptionComponent;
  let fixture: ComponentFixture<NewContractDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewContractDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewContractDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
