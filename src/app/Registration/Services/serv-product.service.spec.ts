import { TestBed } from '@angular/core/testing';

import { ServProductService } from './serv-product.service';

describe('ServProductService', () => {
  let service: ServProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
