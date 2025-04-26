import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import Cropper from 'cropperjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
  standalone: false, // Set to true if using standalone components
})
export class ImageCropperComponent implements AfterViewInit, OnDestroy {
  @ViewChild('image', { static: false })
  imageElement!: ElementRef<HTMLImageElement>;

  private cropper!: Cropper;
  croppedImage: string | null = null;
  cropData: Cropper.Data = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
  };
  putData: string = '';
  aspectRatio: number | null = 16 / 9;
  viewMode: number = 0;
  options: Cropper.Options = {
    aspectRatio: 16 / 9,
    viewMode: 1,
    preview: '.img-preview',
    responsive: true,
    restore: true,
    checkCrossOrigin: true,
    checkOrientation: true,
    modal: true,
    guides: true,
    center: true,
    highlight: true,
    background: true,
    autoCrop: true,
    movable: true,
    rotatable: true,
    scalable: true,
    zoomable: true,
    zoomOnTouch: true,
    zoomOnWheel: true,
    cropBoxMovable: true,
    cropBoxResizable: true,
    toggleDragModeOnDblclick: true,
    crop: () => this.updateCropData(),
  };

  ngAfterViewInit(): void {
    this.initializeCropper();
  }

  ngOnDestroy(): void {
    if (this.cropper) {
      this.cropper.destroy();
    }
  }

  private initializeCropper(): void {
    this.cropper = new Cropper(this.imageElement.nativeElement, this.options);
  }

  private updateCropData(): void {
    if (this.cropper) {
      this.cropData = this.cropper.getData(true);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageElement.nativeElement.src = reader.result as string;
        if (this.cropper) {
          this.cropper.destroy();
        }
        this.initializeCropper();
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  setDragMode(mode: 'move' | 'crop'): void {
    this.cropper.setDragMode(mode);
  }

  zoom(amount: number): void {
    this.cropper.zoom(amount);
  }

  move(x: number, y: number): void {
    this.cropper.move(x, y);
  }

  rotate(degrees: number): void {
    this.cropper.rotate(degrees);
  }

  scaleX(scale: number): void {
    this.cropper.scaleX(scale);
  }

  scaleY(scale: number): void {
    this.cropper.scaleY(scale);
  }

  crop(): void {
    this.cropper.crop();
  }

  clear(): void {
    this.cropper.clear();
  }

  disable(): void {
    this.cropper.disable();
  }

  enable(): void {
    this.cropper.enable();
  }

  reset(): void {
    this.cropper.reset();
  }

  destroy(): void {
    this.cropper.destroy();
    this.initializeCropper();
  }

  getCroppedCanvas(options?: Cropper.GetCroppedCanvasOptions): void {
    const canvas = this.cropper.getCroppedCanvas(options);
    this.croppedImage = canvas.toDataURL('image/jpeg');
  }

  getData(): void {
    const data = this.cropper.getData(true);
    this.putData = JSON.stringify(data);
  }

  setData(): void {
    try {
      const data = JSON.parse(this.putData);
      this.cropper.setData(data);
    } catch (error) {
      console.error('Invalid data format:', error);
    }
  }

  getContainerData(): void {
    const data = this.cropper.getContainerData();
    this.putData = JSON.stringify(data);
  }

  getImageData(): void {
    const data = this.cropper.getImageData();
    this.putData = JSON.stringify(data);
  }

  getCanvasData(): void {
    const data = this.cropper.getCanvasData();
    this.putData = JSON.stringify(data);
  }
 
  setCanvasData(): void {
    try {
      const data = JSON.parse(this.putData);
      this.cropper.setCanvasData(data);
    } catch (error) {
      console.error('Invalid canvas data format:', error);
    }
  }

  getCropBoxData(): void {
    const data = this.cropper.getCropBoxData();
    this.putData = JSON.stringify(data);
  }

  setCropBoxData(): void {
    try {
      const data = JSON.parse(this.putData);
      this.cropper.setCropBoxData(data);
    } catch (error) {
      console.error('Invalid crop box data format:', error);
    }
  }

  moveTo(x: number): void {
    this.cropper.moveTo(x);
  }

  zoomTo(ratio: number): void {
    this.cropper.zoomTo(ratio);
  }

  rotateTo(degrees: number): void {
    this.cropper.rotateTo(degrees);
  }

  setAspectRatio(ratio: number | null): void {
    this.aspectRatio = ratio;
    this.options.aspectRatio = ratio ?? NaN;
    this.cropper.destroy();
    this.initializeCropper();
  }

  setViewMode(mode: number): void {
    this.viewMode = mode;
    this.options.viewMode = mode as Cropper.ViewMode;
    this.cropper.destroy();
    this.initializeCropper();
  }

  updateOptions(): void {
    this.cropper.destroy();
    this.initializeCropper();
  }

  downloadImage(): void {
    if (this.croppedImage) {
      const link = document.createElement('a');
      link.href = this.croppedImage;
      link.download = 'cropped-image.jpg';
      link.click();
    }
  }
}
