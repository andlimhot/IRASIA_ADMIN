import { TestBed } from '@angular/core/testing';

import { ServBannersService } from './serv-banners.service';

describe('ServBannersService', () => {
  let service: ServBannersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServBannersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
