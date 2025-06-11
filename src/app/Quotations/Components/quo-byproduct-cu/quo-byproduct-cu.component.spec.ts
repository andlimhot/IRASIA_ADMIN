import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoByproductCuComponent } from './quo-byproduct-cu.component';

describe('QuoByproductCuComponent', () => {
  let component: QuoByproductCuComponent;
  let fixture: ComponentFixture<QuoByproductCuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoByproductCuComponent]
    });
    fixture = TestBed.createComponent(QuoByproductCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
