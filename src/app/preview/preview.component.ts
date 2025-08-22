import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SafeUrlPipe
  ],
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
  @Input() fileUrl: string | null = null;
  @Input() fileName: string | null = null;

  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  }

  isPdf(url: string): boolean {
    return /\.pdf$/i.test(url);
  }

  downloadFile() {
    if (!this.fileUrl || !this.fileName) return;

    const link = document.createElement('a');
    link.href = this.fileUrl;
    link.download = this.fileName;
    link.click();
  }
}
