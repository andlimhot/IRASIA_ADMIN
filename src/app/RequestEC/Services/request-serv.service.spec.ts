import { TestBed } from '@angular/core/testing';

import { RequestServService } from './request-serv.service';

describe('RequestServService', () => {
  let service: RequestServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
