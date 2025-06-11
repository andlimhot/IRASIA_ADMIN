import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoCuComponent } from './quo-cu.component';

describe('QuoCuComponent', () => {
  let component: QuoCuComponent;
  let fixture: ComponentFixture<QuoCuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoCuComponent]
    });
    fixture = TestBed.createComponent(QuoCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
