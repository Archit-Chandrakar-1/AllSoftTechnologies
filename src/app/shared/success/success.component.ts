import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="success-card">
      <mat-card-content>
        <div class="success-content">
          <mat-icon class="success-icon">check_circle</mat-icon>
          <h3>{{ title || 'Success!' }}</h3>
          <p>{{ message || 'Operation completed successfully.' }}</p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .success-card {
      max-width: 400px;
      margin: 2rem auto;
      text-align: center;
      background: #f1f8e9;
      border: 1px solid #c5e1a5;
    }

    .success-content {
      padding: 1rem;
    }

    .success-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      color: #4caf50;
      margin-bottom: 1rem;
    }

    .success-content h3 {
      color: #2e7d32;
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
    }

    .success-content p {
      color: #666;
      margin: 0;
      line-height: 1.5;
    }
  `]
})
export class SuccessComponent {
  @Input() title: string = '';
  @Input() message: string = '';
}
