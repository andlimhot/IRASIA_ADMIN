import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoByproductCommentComponent } from './quo-byproduct-comment.component';

describe('QuoByproductCommentComponent', () => {
  let component: QuoByproductCommentComponent;
  let fixture: ComponentFixture<QuoByproductCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoByproductCommentComponent]
    });
    fixture = TestBed.createComponent(QuoByproductCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
