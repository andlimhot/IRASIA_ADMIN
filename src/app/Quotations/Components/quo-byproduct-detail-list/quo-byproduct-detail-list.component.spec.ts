import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoByproductDetailListComponent } from './quo-byproduct-detail-list.component';

describe('QuoByproductDetailListComponent', () => {
  let component: QuoByproductDetailListComponent;
  let fixture: ComponentFixture<QuoByproductDetailListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoByproductDetailListComponent]
    });
    fixture = TestBed.createComponent(QuoByproductDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
