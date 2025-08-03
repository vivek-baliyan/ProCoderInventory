import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-upload',
  standalone: false,
  templateUrl: './document-upload.component.html',
  styleUrl: './document-upload.component.css'
})
export class DocumentUploadComponent {
  @Input() documents: File[] = [];
  @Input() maxFiles: number = 10;
  @Input() maxFileSize: number = 5 * 1024 * 1024; // 5MB in bytes
  @Input() acceptedTypes: string = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
  @Input() readonly: boolean = false;
  @Input() title: string = 'Documents';
  @Output() documentsChange = new EventEmitter<File[]>();

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        if (this.documents.length < this.maxFiles && file.size <= this.maxFileSize) {
          this.documents.push(file);
        } else if (this.documents.length >= this.maxFiles) {
          console.warn(`Maximum ${this.maxFiles} files allowed`);
          break;
        } else if (file.size > this.maxFileSize) {
          console.warn(`File ${file.name} exceeds maximum size of ${this.getFileSizeText(this.maxFileSize)}`);
        }
      }
      this.documentsChange.emit(this.documents);
      // Clear the input to allow selecting the same file again if needed
      event.target.value = '';
    }
  }

  removeDocument(index: number): void {
    this.documents.splice(index, 1);
    this.documentsChange.emit(this.documents);
  }

  getFileSizeText(bytes: number): string {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  }

  getFileSize(file: File): string {
    return this.getFileSizeText(file.size);
  }

  getFileIcon(fileName: string): string {
    const extension = fileName.toLowerCase().split('.').pop();
    switch (extension) {
      case 'pdf':
        return 'icofont-file-pdf';
      case 'doc':
      case 'docx':
        return 'icofont-file-word';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'icofont-file-image';
      default:
        return 'icofont-file-document';
    }
  }
}