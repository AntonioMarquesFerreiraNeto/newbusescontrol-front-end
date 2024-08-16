import { TestBed } from '@angular/core/testing';

import { UserRegistrationQueueService } from './user-registration-queue.service';

describe('UserRegistrationQueueService', () => {
  let service: UserRegistrationQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistrationQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
