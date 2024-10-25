import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteContractDescriptionComponent } from './delete-contract-description.component';

describe('DeleteContractDescriptionComponent', () => {
  let component: DeleteContractDescriptionComponent;
  let fixture: ComponentFixture<DeleteContractDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteContractDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteContractDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
