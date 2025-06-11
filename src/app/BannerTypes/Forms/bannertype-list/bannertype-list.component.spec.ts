import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannertypeListComponent } from './bannertype-list.component';

describe('BannertypeListComponent', () => {
  let component: BannertypeListComponent;
  let fixture: ComponentFixture<BannertypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannertypeListComponent]
    });
    fixture = TestBed.createComponent(BannertypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
