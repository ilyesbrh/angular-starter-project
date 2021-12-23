import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { StateManager } from '../../state-manager.service';
import { CropperDialogueComponent } from '../cropperdialogue/cropperdialogue.component';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  @Input() data: Array<{ id: number, link: string, [x: string]: any }>;

  @Output() add = new EventEmitter<{ formData: FormData, base64: string }>();
  @Output() update = new EventEmitter<{ id: number, formData: FormData, base64: string }>();
  @Output() delete = new EventEmitter<{ id: number, formData: FormData, base64: string }>();

  constructor(private dialog: MatDialog, public sanitizer: DomSanitizer, public state: StateManager) { }

  ngOnInit(): void {
  }

  deleteImage(id) {

    this.delete.emit(id);

  }

  /* Image Gallery */
  openFileChangeEventPopup(selectedImage: any): void {

    // to disable editing
    if (selectedImage) return;

    const dialogRef = this.dialog.open(CropperDialogueComponent, {
      maxHeight: '90vh',
      data: { event: selectedImage }
    });

    dialogRef.afterClosed().subscribe(async result => {

      if (!result) return;

      const base64ToFile = (base64Image: string) => {
        const split = base64Image.split(',');
        const type = split[0].replace('data:', '').replace(';base64', '');
        const byteString = atob(split[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i += 1) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type });
      };


      const base64MimeType = (encoded) =>
        typeof encoded !== 'string'
          ? null
          : encoded.substring(encoded.indexOf('/') + 1, encoded.indexOf(';base64'));

      const croppedImage = base64ToFile(result);

      const fd = new FormData();
      fd.append('link', croppedImage);

      if (!selectedImage) this.add.emit({ formData: fd, base64: result });
      else this.update.emit({ id: selectedImage.id, formData: fd, base64: result });


    });

  }

}
