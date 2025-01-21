import { TestBed } from '@angular/core/testing';

import { ServProducttypeService } from './serv-producttype.service';

describe('ServProducttypeService', () => {
  let service: ServProducttypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServProducttypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
