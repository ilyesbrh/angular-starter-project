import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeProductSelectorOverlayComponent } from './size-product-selector-overlay.component';

describe('SizeProductSelectorOverlayComponent', () => {
  let component: SizeProductSelectorOverlayComponent;
  let fixture: ComponentFixture<SizeProductSelectorOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizeProductSelectorOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeProductSelectorOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
