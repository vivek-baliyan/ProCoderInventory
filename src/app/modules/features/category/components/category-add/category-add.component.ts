import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-category-add',
  standalone: false,
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css',
})
export class CategoryAddComponent implements OnInit {
  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  isDragOver = false;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  originalImageData: string | null = null; // To store original image
  @ViewChild('imageCropper') imageCropper: any;

  cropData = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    width: 0,
    height: 0,
  };

  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.loadSavedData('0');
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;

    // Store the original image data
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];

      // Read and store the original image as base64
      const reader = new FileReader();
      reader.onload = () => {
        this.originalImageData = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Save both the original image and crop data
  saveCategory() {
    // Create data object to send to server or store locally
    const categoryData = {
      originalImage: this.originalImageData,
      cropData: this.cropData,
      croppedImage: this.getCroppedImageBase64(), // Implement this method to get base64 from the cropped image
    };

    // Now you can send this to your backend service
    // this.categoryService.saveCategory(categoryData);

    // Or store in localStorage for demo purposes
    localStorage.setItem('categoryImageData', JSON.stringify(categoryData));
  }

  // Separate method to apply the saved position
  applySavedCropperPosition() {
    if (!this.imageCropper) {
      console.error('Image cropper component not found');
      return;
    }

    // Different versions of ngx-image-cropper have different methods
    // Try these approaches based on your version:

    // Approach 1: Direct crop position setting (newer versions)
    if (this.imageCropper.setCropperPosition) {
      const cropperPosition = {
        x1: this.cropData.x1,
        y1: this.cropData.y1,
        x2: this.cropData.x2,
        y2: this.cropData.y2,
      };
      this.imageCropper.setCropperPosition(cropperPosition);
    }
    // Approach 2: Using cropper.crop (some versions)
    else if (this.imageCropper.cropper && this.imageCropper.cropper.crop) {
      const cropperPosition = {
        x1: this.cropData.x1,
        y1: this.cropData.y1,
        x2: this.cropData.x2,
        y2: this.cropData.y2,
      };
      this.imageCropper.cropper.crop(cropperPosition);
    }

    // Approach 3: Using internal updateCropperPosition (some versions)
    else if (this.imageCropper.updateCropperPosition) {
      const cropperPosition = {
        x1: this.cropData.x1,
        y1: this.cropData.y1,
        x2: this.cropData.x2,
        y2: this.cropData.y2,
      };
      this.imageCropper.updateCropperPosition(cropperPosition);
    }
  }

  // Method to get base64 from the cropped image
  getCroppedImageBase64(): string {
    // This is a simplified approach - you may need to adjust based on how your cropper provides data
    // If your cropper provides base64 directly, use that instead
    const croppedImageStr = this.croppedImage.toString();
    return croppedImageStr.replace('unsafe:', '');
  }

  loadSavedData(categoryId: string) {
    // Get saved data (from API or localStorage)
    const savedDataStr = localStorage.getItem('categoryImageData');
    if (savedDataStr) {
      const savedData = JSON.parse(savedDataStr);

      // Store crop data first
      this.cropData = savedData.cropData;

      // IMPORTANT: Create image from saved data and trigger cropper
      if (savedData.originalImage) {
        this.originalImageData = savedData.originalImage;
        this.createFileFromBase64AndTriggerCropper(savedData.originalImage);
      }
    }
  }

  // Improved method to create file and trigger cropper
  createFileFromBase64AndTriggerCropper(base64String: string) {
    try {
      // Extract base64 data
      const parts = base64String.split(',');
      const byteString = atob(parts[1]);
      const mimeType = parts[0].split(':')[1].split(';')[0];

      // Create array buffer
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // Create File object
      const blob = new Blob([ab], { type: mimeType });
      this.selectedFile = new File([blob], 'image.jpg', { type: mimeType });

      // Approach 1: Create a real file input event (better compatibility)
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(this.selectedFile);

      const event = new Event('change', { bubbles: true });
      const target = document.createElement('input');
      target.type = 'file';
      target.files = dataTransfer.files;

      Object.defineProperty(event, 'target', { value: target });
      this.imageChangedEvent = event;
    } catch (error) {
      console.error('Error creating file from base64', error);
    }
  }

  cropperReady() {
    console.log('cropper ready');
  }

  loadImageFailed() {
    // show message
  }
}
