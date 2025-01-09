import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttypeCuComponent } from './producttype-cu.component';

describe('ProducttypeCuComponent', () => {
  let component: ProducttypeCuComponent;
  let fixture: ComponentFixture<ProducttypeCuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProducttypeCuComponent]
    });
    fixture = TestBed.createComponent(ProducttypeCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
