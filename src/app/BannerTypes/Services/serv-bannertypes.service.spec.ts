import { TestBed } from '@angular/core/testing';

import { ServBannertypesService } from './serv-bannertypes.service';

describe('ServBannertypesService', () => {
  let service: ServBannertypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServBannertypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
