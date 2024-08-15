import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSettingPanelComponent } from './new-setting-panel.component';

describe('NewSettingPanelComponent', () => {
  let component: NewSettingPanelComponent;
  let fixture: ComponentFixture<NewSettingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSettingPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSettingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
