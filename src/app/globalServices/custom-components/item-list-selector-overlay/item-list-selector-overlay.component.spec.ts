import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListSelectorOverlayComponent } from './item-list-selector-overlay.component';

describe('ItemListSelectorOverlayComponent', () => {
  let component: ItemListSelectorOverlayComponent;
  let fixture: ComponentFixture<ItemListSelectorOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemListSelectorOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListSelectorOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
