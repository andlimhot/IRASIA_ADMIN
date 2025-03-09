import { TestBed } from '@angular/core/testing';

import { ProductProducttypeServService } from './product-producttype-serv.service';

describe('ProductProducttypeServService', () => {
  let service: ProductProducttypeServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductProducttypeServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
