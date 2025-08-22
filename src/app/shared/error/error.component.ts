import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card class="error-card">
      <mat-card-content>
        <div class="error-content">
          <mat-icon class="error-icon">error</mat-icon>
          <h3>{{ title || 'An Error Occurred' }}</h3>
          <p>{{ message || 'Something went wrong. Please try again.' }}</p>
          <div class="error-actions" *ngIf="showRetry">
            <button mat-raised-button color="primary" (click)="onRetry.emit()">
              <mat-icon>refresh</mat-icon>
              Retry
            </button>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .error-card {
      max-width: 400px;
      margin: 2rem auto;
      text-align: center;
      background: #fff3f3;
      border: 1px solid #ffcdd2;
    }

    .error-content {
      padding: 1rem;
    }

    .error-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      color: #f44336;
      margin-bottom: 1rem;
    }

    .error-content h3 {
      color: #d32f2f;
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
    }

    .error-content p {
      color: #666;
      margin: 0 0 1.5rem 0;
      line-height: 1.5;
    }

    .error-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .error-actions button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `]
})
export class ErrorComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() showRetry: boolean = true;
  @Output() onRetry = new EventEmitter<void>();
}
