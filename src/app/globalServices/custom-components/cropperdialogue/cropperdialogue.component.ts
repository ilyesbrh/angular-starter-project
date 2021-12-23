import { Component, ElementRef, Inject, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropperdialogue',
  templateUrl: './cropperdialogue.component.html',
  styleUrls: ['./cropperdialogue.component.scss']
})
export class CropperDialogueComponent implements OnInit {


  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  croppedImage: any = '';
  changed = false;

  constructor(
    public dialogRef: MatDialogRef<CropperDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private renderer: Renderer2) {

  }

  ngOnInit(): void {

  }

  onSave(): void {
    this.dialogRef.close(this.croppedImage);
  }
  onChange() {
    const input = this.renderer.createElement('input') as HTMLInputElement;
    input.setAttribute('accept', 'image/png, image/jpeg');
    input.setAttribute('type', 'file');

    input.onchange = async (_) => {
      this.imageCropper.imageURL = null;
      this.imageCropper.imageFile = input.files[0];
      // @ts-ignore
      this.imageCropper.loadImageFile(input.files[0]);

      this.changed = true;
    };

    input.click();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
