import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  standalone: false,
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css',
})
export class ImageUploaderComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Input() imageBase64: string | null = null;

  @Output() onFileSelection = new EventEmitter<string>();

  isDragging = false;
  isHovering = false;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  ngOnInit(): void {
    if (this.imageBase64) {
      this.imagePreview = 'data:image/jpeg;base64,' + this.imageBase64;
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files.length) {
      this.handleFileSelection(event.dataTransfer.files[0]);
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFileSelection(input.files[0]);
    }
  }

  handleFileSelection(file: File): void {
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;

        this.onFileSelection.emit(this.imagePreview!);
      };

      reader.readAsDataURL(file);
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.fileInput.nativeElement.value = '';
  }
}
