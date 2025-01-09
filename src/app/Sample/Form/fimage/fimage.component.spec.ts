import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FImageComponent } from './fimage.component';

describe('FImageComponent', () => {
  let component: FImageComponent;
  let fixture: ComponentFixture<FImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FImageComponent]
    });
    fixture = TestBed.createComponent(FImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
