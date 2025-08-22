import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { timer, Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  otpForm: FormGroup;
  showOtpForm = false;
  countdown = 0;
  private countdownSubscription?: Subscription;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  onSendOtp(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const mobileNumber = this.loginForm.get('mobileNumber')?.value;
      
      this.authService.generateOtp(mobileNumber).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.showOtpForm = true;
          this.startCountdown();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Failed to send OTP. Please try again.';
        }
      });
    }
  }

  onValidateOtp(): void {
    if (this.otpForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const mobileNumber = this.loginForm.get('mobileNumber')?.value;
      const otp = this.otpForm.get('otp')?.value;
      
      this.authService.validateOtp(mobileNumber, otp).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.authService.setToken(response.token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Invalid OTP. Please try again.';
        }
      });
    }
  }

  onResendOtp(): void {
    this.onSendOtp();
  }

  private startCountdown(): void {
    this.countdown = 30;
    this.countdownSubscription = timer(0, 1000).subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.countdownSubscription?.unsubscribe();
      }
    });
  }

  get canResendOtp(): boolean {
    return this.countdown === 0;
  }
}
