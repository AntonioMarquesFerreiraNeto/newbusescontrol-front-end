import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSettingPanelComponent } from './edit-setting-panel.component';

describe('EditSettingPanelComponent', () => {
  let component: EditSettingPanelComponent;
  let fixture: ComponentFixture<EditSettingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSettingPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSettingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
