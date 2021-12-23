import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperDialogueComponent } from './cropperdialogue.component';

describe('CropperdialogueComponent', () => {
  let component: CropperDialogueComponent;
  let fixture: ComponentFixture<CropperDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CropperDialogueComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropperDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
