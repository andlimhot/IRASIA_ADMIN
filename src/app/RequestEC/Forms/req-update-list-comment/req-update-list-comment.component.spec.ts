import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqUpdateListCommentComponent } from './req-update-list-comment.component';

describe('ReqUpdateListCommentComponent', () => {
  let component: ReqUpdateListCommentComponent;
  let fixture: ComponentFixture<ReqUpdateListCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReqUpdateListCommentComponent]
    });
    fixture = TestBed.createComponent(ReqUpdateListCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
