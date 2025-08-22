import { Injectable } from '@angular/core';

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  fileType?: string;
  mimeType?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileValidationService {
  private readonly allowedImageTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp'
  ];

  private readonly allowedDocumentTypes = [
    'application/pdf'
  ];

  private readonly maxFileSize = 50 * 1024 * 1024; // 50MB

  validateFile(file: File): FileValidationResult {
    // Check file size
    if (file.size > this.maxFileSize) {
      return {
        isValid: false,
        error: `File size exceeds maximum limit of ${this.formatFileSize(this.maxFileSize)}`
      };
    }

    // Check file type
    const mimeType = file.type;
    const fileExtension = this.getFileExtension(file.name);

    if (!this.isAllowedMimeType(mimeType) && !this.isAllowedFileExtension(fileExtension)) {
      return {
        isValid: false,
        error: 'Only PDF and image files (JPEG, PNG, GIF, BMP, WebP) are allowed'
      };
    }

    // Determine file type for display
    let fileType = 'Unknown';
    if (mimeType === 'application/pdf') {
      fileType = 'PDF Document';
    } else if (mimeType.startsWith('image/')) {
      fileType = 'Image File';
    }

    return {
      isValid: true,
      fileType,
      mimeType
    };
  }

  private isAllowedMimeType(mimeType: string): boolean {
    return [...this.allowedImageTypes, ...this.allowedDocumentTypes].includes(mimeType);
  }

  private isAllowedFileExtension(extension: string): boolean {
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    return allowedExtensions.includes(extension.toLowerCase());
  }

  private getFileExtension(fileName: string): string {
    return fileName.split('.').pop() || '';
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }

  isPdfFile(file: File): boolean {
    return file.type === 'application/pdf';
  }

  getFileIcon(file: File): string {
    if (this.isPdfFile(file)) {
      return 'picture_as_pdf';
    } else if (this.isImageFile(file)) {
      return 'image';
    }
    return 'insert_drive_file';
  }

  getFilePreviewUrl(file: File): string {
    if (this.isImageFile(file)) {
      return URL.createObjectURL(file);
    }
    return '';
  }
}
