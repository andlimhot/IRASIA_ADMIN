import { TestBed } from '@angular/core/testing';

import { ServRegistrationService } from './serv-registration.service';

describe('ServRegistrationService', () => {
  let service: ServRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
