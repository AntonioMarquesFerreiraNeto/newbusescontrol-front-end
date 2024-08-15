import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPanelDetailsComponent } from './setting-panel-details.component';

describe('SettingPanelDetailsComponent', () => {
  let component: SettingPanelDetailsComponent;
  let fixture: ComponentFixture<SettingPanelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingPanelDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPanelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
