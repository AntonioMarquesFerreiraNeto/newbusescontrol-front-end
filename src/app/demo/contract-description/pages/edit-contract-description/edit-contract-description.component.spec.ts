import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContractDescriptionComponent } from './edit-contract-description.component';

describe('EditContractDescriptionComponent', () => {
  let component: EditContractDescriptionComponent;
  let fixture: ComponentFixture<EditContractDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditContractDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContractDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
