// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OtpRequest {
  mobile_number: string;
}

export interface OtpValidation {
  mobile_number: string;
  otp: string;
}

export interface AuthResponse {
  token: string;
  user: any;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBase = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  generateOtp(mobileNumber: string): Observable<AuthResponse> {
    const request: OtpRequest = { mobile_number: mobileNumber };
    return this.http.post<AuthResponse>(`${this.apiBase}${environment.generateOtpEndpoint}`, request);
  }

  validateOtp(mobileNumber: string, otp: string): Observable<AuthResponse> {
    const request: OtpValidation = { mobile_number: mobileNumber, otp: otp };
    return this.http.post<AuthResponse>(`${this.apiBase}${environment.validateOtpEndpoint}`, request);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.removeToken();
    localStorage.clear();
  }
}
