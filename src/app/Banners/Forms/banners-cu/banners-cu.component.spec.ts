import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersCuComponent } from './banners-cu.component';

describe('BannersCuComponent', () => {
  let component: BannersCuComponent;
  let fixture: ComponentFixture<BannersCuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannersCuComponent]
    });
    fixture = TestBed.createComponent(BannersCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
