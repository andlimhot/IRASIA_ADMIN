import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannertypeCuComponent } from './bannertype-cu.component';

describe('BannertypeCuComponent', () => {
  let component: BannertypeCuComponent;
  let fixture: ComponentFixture<BannertypeCuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannertypeCuComponent]
    });
    fixture = TestBed.createComponent(BannertypeCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
