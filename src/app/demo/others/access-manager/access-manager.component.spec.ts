import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessManagerComponent } from './access-manager.component';

describe('AccessManagerComponent', () => {
  let component: AccessManagerComponent;
  let fixture: ComponentFixture<AccessManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
