import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestUploadListComponent } from './request-upload-list.component';

describe('RequestUploadListComponent', () => {
  let component: RequestUploadListComponent;
  let fixture: ComponentFixture<RequestUploadListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestUploadListComponent]
    });
    fixture = TestBed.createComponent(RequestUploadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
