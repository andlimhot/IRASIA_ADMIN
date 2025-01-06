import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCUComponent } from './registration-cu.component';

describe('RegistrationCUComponent', () => {
  let component: RegistrationCUComponent;
  let fixture: ComponentFixture<RegistrationCUComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistrationCUComponent]
    });
    fixture = TestBed.createComponent(RegistrationCUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
