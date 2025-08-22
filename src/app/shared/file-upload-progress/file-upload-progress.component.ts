import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-file-upload-progress',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatIconModule, MatButtonModule],
  template: `
    <div class="upload-progress">
      <div class="file-info">
        <mat-icon class="file-icon">{{ getFileIcon(fileName) }}</mat-icon>
        <div class="file-details">
          <p class="file-name">{{ fileName }}</p>
          <p class="file-size">{{ formatFileSize(fileSize) }}</p>
        </div>
        <button 
          *ngIf="showCancel" 
          mat-icon-button 
          (click)="onCancel.emit()" 
          class="cancel-btn"
          matTooltip="Cancel upload">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      
      <div class="progress-section">
        <mat-progress-bar 
          [value]="progress" 
          [color]="progressColor"
          mode="determinate">
        </mat-progress-bar>
        <span class="progress-text">{{ progress }}%</span>
      </div>
      
      <div class="status-section">
        <p class="status-message">{{ statusMessage }}</p>
        <div *ngIf="error" class="error-message">
          <mat-icon>error</mat-icon>
          <span>{{ error }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .upload-progress {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 1rem;
      margin: 1rem 0;
    }

    .file-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .file-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
      color: #667eea;
    }

    .file-details {
      flex: 1;
    }

    .file-name {
      margin: 0 0 0.25rem 0;
      font-weight: 500;
      color: #333;
      font-size: 0.9rem;
    }

    .file-size {
      margin: 0;
      color: #666;
      font-size: 0.8rem;
    }

    .cancel-btn {
      color: #f44336;
    }

    .progress-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .progress-section mat-progress-bar {
      flex: 1;
    }

    .progress-text {
      font-weight: 500;
      color: #333;
      min-width: 40px;
      text-align: right;
    }

    .status-section {
      text-align: center;
    }

    .status-message {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 0.9rem;
    }

    .error-message {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: #f44336;
      font-size: 0.85rem;
    }

    .error-message mat-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
    }

    @media (max-width: 480px) {
      .upload-progress {
        padding: 0.75rem;
      }

      .file-info {
        gap: 0.75rem;
      }

      .file-icon {
        font-size: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
      }

      .progress-section {
        gap: 0.75rem;
      }
    }
  `]
})
export class FileUploadProgressComponent {
  @Input() fileName: string = '';
  @Input() fileSize: number = 0;
  @Input() progress: number = 0;
  @Input() statusMessage: string = 'Uploading...';
  @Input() error: string = '';
  @Input() showCancel: boolean = true;

  getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') return 'picture_as_pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension || '')) return 'image';
    return 'insert_drive_file';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  get progressColor(): 'primary' | 'accent' | 'warn' {
    if (this.error) return 'warn';
    if (this.progress === 100) return 'accent';
    return 'primary';
  }
}
