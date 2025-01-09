import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttypeListComponent } from './producttype-list.component';

describe('ProducttypeListComponent', () => {
  let component: ProducttypeListComponent;
  let fixture: ComponentFixture<ProducttypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProducttypeListComponent]
    });
    fixture = TestBed.createComponent(ProducttypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
