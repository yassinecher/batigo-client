import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  template: `
    <input type="file" (change)="onFileSelected($event)" accept="image/*">
    <input type="text" [(ngModel)]="imageUrl" placeholder="Enter image URL">
    <button (click)="submit()">Upload</button>
  `
})
export class ImageUploadComponent {
  @Input() building_space!: number;
  @Input() floors!: number;
  @Input() windows!: number;
  @Input() doors!: number;
  @Input() stairs!: number;
  @Output() imageUploaded = new EventEmitter<{ file?: File; url?: string }>();
  imageUrl = '';
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    if (this.selectedFile) {
      this.imageUploaded.emit({ file: this.selectedFile });
    } else if (this.imageUrl) {
      this.imageUploaded.emit({ url: this.imageUrl });
    }
  }
}