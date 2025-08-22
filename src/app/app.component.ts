import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './services/auth.service';
import { NotificationsComponent } from './shared/notifications/notifications.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    NotificationsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dms-frontend';
  isAdmin = false;

  constructor(private authService: AuthService) {
    // Check if user is admin based on token or role
    this.checkAdminStatus();
  }

  checkAdminStatus() {
    const token = localStorage.getItem('authToken');
    if (token) {
      // TODO: Decode JWT token to check role
      // For now, we'll assume admin if token exists
      this.isAdmin = true;
    }
  }

  logout() {
    this.authService.logout();
    this.isAdmin = false;
    // Redirect to login
    window.location.href = '/login';
  }
}
