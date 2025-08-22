import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  title?: string;
  duration?: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$: Observable<Notification[]> = this.notificationsSubject.asObservable();

  private defaultDuration = 5000; // 5 seconds

  constructor() {}

  /**
   * Show success notification
   */
  success(message: string, title?: string, duration?: number): string {
    return this.show('success', message, title, duration);
  }

  /**
   * Show error notification
   */
  error(message: string, title?: string, duration?: number): string {
    return this.show('error', message, title, duration);
  }

  /**
   * Show info notification
   */
  info(message: string, title?: string, duration?: number): string {
    return this.show('info', message, title, duration);
  }

  /**
   * Show warning notification
   */
  warning(message: string, title?: string, duration?: number): string {
    return this.show('warning', message, title, duration);
  }

  /**
   * Show notification
   */
  private show(
    type: Notification['type'],
    message: string,
    title?: string,
    duration?: number
  ): string {
    const notification: Notification = {
      id: this.generateId(),
      type,
      message,
      title,
      duration: duration || this.defaultDuration,
      timestamp: new Date()
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    // Auto-remove notification after duration
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.remove(notification.id);
      }, notification.duration);
    }

    return notification.id;
  }

  /**
   * Remove notification by ID
   */
  remove(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const filteredNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(filteredNotifications);
  }

  /**
   * Clear all notifications
   */
  clear(): void {
    this.notificationsSubject.next([]);
  }

  /**
   * Clear notifications by type
   */
  clearByType(type: Notification['type']): void {
    const currentNotifications = this.notificationsSubject.value;
    const filteredNotifications = currentNotifications.filter(n => n.type !== type);
    this.notificationsSubject.next(filteredNotifications);
  }

  /**
   * Get current notifications
   */
  getCurrentNotifications(): Notification[] {
    return this.notificationsSubject.value;
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Get notification count
   */
  get notificationCount(): number {
    return this.notificationsSubject.value.length;
  }

  /**
   * Get notification count by type
   */
  getNotificationCountByType(type: Notification['type']): number {
    return this.notificationsSubject.value.filter(n => n.type === type).length;
  }
}
