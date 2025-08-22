import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService, Notification } from '../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  template: `
    <div class="notifications-container">
      <div 
        *ngFor="let notification of notifications" 
        class="notification"
        [class]="'notification-' + notification.type">
        
        <div class="notification-content">
          <div class="notification-icon">
            <mat-icon>{{ getIcon(notification.type) }}</mat-icon>
          </div>
          
          <div class="notification-text">
            <h4 *ngIf="notification.title" class="notification-title">
              {{ notification.title }}
            </h4>
            <p class="notification-message">{{ notification.message }}</p>
          </div>
          
          <button 
            mat-icon-button 
            class="notification-close"
            (click)="removeNotification(notification.id)">
            <mat-icon>close</mat-icon>
          </button>
        </div>
        
        <div 
          *ngIf="notification.duration && notification.duration > 0" 
          class="notification-progress"
          [style.animation-duration]="notification.duration + 'ms'">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notifications-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      max-width: 400px;
      width: 100%;
    }

    .notification {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      margin-bottom: 12px;
      overflow: hidden;
      animation: slideInRight 0.3s ease-out;
    }

    .notification-content {
      display: flex;
      align-items: flex-start;
      padding: 16px;
      gap: 12px;
    }

    .notification-icon {
      flex-shrink: 0;
    }

    .notification-icon mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .notification-text {
      flex: 1;
      min-width: 0;
    }

    .notification-title {
      margin: 0 0 4px 0;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.2;
    }

    .notification-message {
      margin: 0;
      font-size: 13px;
      line-height: 1.4;
      color: #666;
    }

    .notification-close {
      flex-shrink: 0;
      color: #999;
    }

    .notification-close:hover {
      color: #666;
    }

    .notification-progress {
      height: 3px;
      background: #e0e0e0;
      animation: progressBar linear forwards;
    }

    /* Notification Types */
    .notification-success {
      border-left: 4px solid #4caf50;
    }

    .notification-success .notification-icon mat-icon {
      color: #4caf50;
    }

    .notification-success .notification-progress {
      background: #4caf50;
    }

    .notification-error {
      border-left: 4px solid #f44336;
    }

    .notification-error .notification-icon mat-icon {
      color: #f44336;
    }

    .notification-error .notification-progress {
      background: #f44336;
    }

    .notification-info {
      border-left: 4px solid #2196f3;
    }

    .notification-info .notification-icon mat-icon {
      color: #2196f3;
    }

    .notification-info .notification-progress {
      background: #2196f3;
    }

    .notification-warning {
      border-left: 4px solid #ff9800;
    }

    .notification-warning .notification-icon mat-icon {
      color: #ff9800;
    }

    .notification-warning .notification-progress {
      background: #ff9800;
    }

    /* Animations */
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes progressBar {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }

    /* Responsive */
    @media (max-width: 480px) {
      .notifications-container {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
      }

      .notification {
        margin-bottom: 8px;
      }

      .notification-content {
        padding: 12px;
        gap: 8px;
      }

      .notification-icon mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .notification-title {
        font-size: 13px;
      }

      .notification-message {
        font-size: 12px;
      }
    }
  `]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.notificationService.notifications$.subscribe(
        notifications => this.notifications = notifications
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeNotification(id: string): void {
    this.notificationService.remove(id);
  }

  getIcon(type: Notification['type']): string {
    switch (type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      default:
        return 'notifications';
    }
  }
}
