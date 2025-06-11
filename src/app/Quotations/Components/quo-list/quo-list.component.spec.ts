import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoListComponent } from './quo-list.component';

describe('QuoListComponent', () => {
  let component: QuoListComponent;
  let fixture: ComponentFixture<QuoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoListComponent]
    });
    fixture = TestBed.createComponent(QuoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
