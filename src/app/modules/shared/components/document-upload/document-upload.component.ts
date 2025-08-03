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
    if (files && files.length > 0) {
      const newFiles: File[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Check if we've reached the maximum number of files
        if (this.documents.length + newFiles.length >= this.maxFiles) {
          console.warn(`Maximum ${this.maxFiles} files allowed`);
          break;
        }
        
        // Check file size
        if (file.size > this.maxFileSize) {
          console.warn(`File ${file.name} exceeds maximum size of ${this.getFileSizeText(this.maxFileSize)}`);
          continue;
        }
        
        // Check file type
        if (this.acceptedTypes && !this.isFileTypeAccepted(file)) {
          console.warn(`File type ${file.type} is not accepted`);
          continue;
        }
        
        newFiles.push(file);
      }
      
      // Add new files to the existing documents array
      this.documents.push(...newFiles);
      this.documentsChange.emit(this.documents);
      
      // Clear the input to allow selecting the same file again if needed
      event.target.value = '';
    }
  }

  private isFileTypeAccepted(file: File): boolean {
    if (!this.acceptedTypes) return true;
    
    const acceptedExtensions = this.acceptedTypes.split(',').map(ext => ext.trim().toLowerCase());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    return acceptedExtensions.includes(fileExtension);
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