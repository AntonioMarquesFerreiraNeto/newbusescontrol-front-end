import { TestBed } from '@angular/core/testing';

import { ContractDescriptionService } from './contract-description.service';

describe('ContractDescriptionService', () => {
  let service: ContractDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
