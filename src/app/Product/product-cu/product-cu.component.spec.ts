import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCuComponent } from './product-cu.component';

describe('ProductCuComponent', () => {
  let component: ProductCuComponent;
  let fixture: ComponentFixture<ProductCuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCuComponent]
    });
    fixture = TestBed.createComponent(ProductCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
