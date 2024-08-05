import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusComponent } from './new-bus.component';

describe('NewBusComponent', () => {
  let component: NewBusComponent;
  let fixture: ComponentFixture<NewBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
