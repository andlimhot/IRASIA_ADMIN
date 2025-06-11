import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoByproductListComponent } from './quo-byproduct-list.component';

describe('QuoByproductListComponent', () => {
  let component: QuoByproductListComponent;
  let fixture: ComponentFixture<QuoByproductListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoByproductListComponent]
    });
    fixture = TestBed.createComponent(QuoByproductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
