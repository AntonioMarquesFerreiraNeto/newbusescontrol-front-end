import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAutomatedComponent } from './system-automated.component';

describe('SystemAutomatedComponent', () => {
  let component: SystemAutomatedComponent;
  let fixture: ComponentFixture<SystemAutomatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemAutomatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemAutomatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
