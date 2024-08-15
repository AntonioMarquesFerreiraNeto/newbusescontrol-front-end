import { TestBed } from '@angular/core/testing';

import { SettingPanelService } from './setting-panel.service';

describe('SettingPanelService', () => {
  let service: SettingPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
