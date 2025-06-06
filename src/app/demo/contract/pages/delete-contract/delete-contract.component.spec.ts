import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteContractComponent } from './delete-contract.component';

describe('DeleteContractComponent', () => {
  let component: DeleteContractComponent;
  let fixture: ComponentFixture<DeleteContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
