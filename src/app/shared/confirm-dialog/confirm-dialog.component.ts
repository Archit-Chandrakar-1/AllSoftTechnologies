import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="confirm-dialog">
      <div class="dialog-header">
        <mat-icon class="dialog-icon" [class]="iconClass">{{ icon }}</mat-icon>
        <h2>{{ title }}</h2>
      </div>
      
      <div class="dialog-content">
        <p>{{ message }}</p>
      </div>
      
      <div class="dialog-actions">
        <button mat-button (click)="onCancel.emit()" class="cancel-btn">
          {{ cancelText }}
        </button>
        <button mat-raised-button [color]="confirmColor" (click)="onConfirm.emit()" class="confirm-btn">
          {{ confirmText }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      padding: 1.5rem;
      max-width: 400px;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .dialog-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
    }

    .dialog-icon.warning {
      color: #ff9800;
    }

    .dialog-icon.danger {
      color: #f44336;
    }

    .dialog-icon.info {
      color: #2196f3;
    }

    .dialog-header h2 {
      margin: 0;
      color: #333;
      font-size: 1.5rem;
    }

    .dialog-content {
      margin-bottom: 2rem;
    }

    .dialog-content p {
      margin: 0;
      color: #666;
      line-height: 1.5;
      font-size: 1rem;
    }

    .dialog-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }

    .cancel-btn {
      color: #666;
    }

    .confirm-btn {
      min-width: 100px;
    }

    @media (max-width: 480px) {
      .confirm-dialog {
        padding: 1rem;
      }

      .dialog-actions {
        flex-direction: column;
      }

      .dialog-actions button {
        width: 100%;
      }
    }
  `]
})
export class ConfirmDialogComponent {
  @Input() title: string = 'Confirm Action';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Input() icon: string = 'help';
  @Input() iconClass: 'warning' | 'danger' | 'info' = 'warning';
  @Input() confirmText: string = 'Confirm';
  @Input() cancelText: string = 'Cancel';
  @Input() confirmColor: 'primary' | 'accent' | 'warn' = 'primary';

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
}
