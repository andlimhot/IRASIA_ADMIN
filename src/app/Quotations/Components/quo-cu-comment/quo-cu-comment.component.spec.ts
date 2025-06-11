import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoCuCommentComponent } from './quo-cu-comment.component';

describe('QuoCuCommentComponent', () => {
  let component: QuoCuCommentComponent;
  let fixture: ComponentFixture<QuoCuCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoCuCommentComponent]
    });
    fixture = TestBed.createComponent(QuoCuCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
