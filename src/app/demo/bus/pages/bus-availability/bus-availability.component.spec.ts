import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusAvailabilityComponent } from './bus-availability.component';

describe('BusAvailabilityComponent', () => {
  let component: BusAvailabilityComponent;
  let fixture: ComponentFixture<BusAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
