import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCuComponent } from './products-cu.component';

describe('ProductsCuComponent', () => {
  let component: ProductsCuComponent;
  let fixture: ComponentFixture<ProductsCuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsCuComponent]
    });
    fixture = TestBed.createComponent(ProductsCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
