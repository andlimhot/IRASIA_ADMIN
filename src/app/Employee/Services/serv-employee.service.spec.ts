import { TestBed } from '@angular/core/testing';

import { ServEmployeeService } from './serv-employee.service';

describe('ServEmployeeService', () => {
  let service: ServEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
