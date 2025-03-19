import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserLoginComponent } from './form-user-login.component';

describe('FormUserLoginComponent', () => {
  let component: FormUserLoginComponent;
  let fixture: ComponentFixture<FormUserLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUserLoginComponent]
    });
    fixture = TestBed.createComponent(FormUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
