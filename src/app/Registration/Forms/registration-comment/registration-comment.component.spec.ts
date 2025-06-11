import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCommentComponent } from './registration-comment.component';

describe('RegistrationCommentComponent', () => {
  let component: RegistrationCommentComponent;
  let fixture: ComponentFixture<RegistrationCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationCommentComponent]
    });
    fixture = TestBed.createComponent(RegistrationCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
