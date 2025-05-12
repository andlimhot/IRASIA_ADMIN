import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCuComponent } from './employee-cu.component';

describe('EmployeeCuComponent', () => {
  let component: EmployeeCuComponent;
  let fixture: ComponentFixture<EmployeeCuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeCuComponent]
    });
    fixture = TestBed.createComponent(EmployeeCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
