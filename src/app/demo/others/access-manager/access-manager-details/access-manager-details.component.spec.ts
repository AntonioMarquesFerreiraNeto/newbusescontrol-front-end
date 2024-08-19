import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessManagerDetailsComponent } from './access-manager-details.component';

describe('AccessManagerDetailsComponent', () => {
  let component: AccessManagerDetailsComponent;
  let fixture: ComponentFixture<AccessManagerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessManagerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessManagerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
