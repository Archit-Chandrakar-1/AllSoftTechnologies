import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<LoadingState>({ isLoading: false });
  public loading$: Observable<LoadingState> = this.loadingSubject.asObservable();

  private requestCount = 0;

  constructor() {}

  /**
   * Show loading with optional message
   */
  show(message?: string): void {
    this.requestCount++;
    this.loadingSubject.next({
      isLoading: true,
      message: message || 'Loading...'
    });
  }

  /**
   * Hide loading
   */
  hide(): void {
    this.requestCount = Math.max(0, this.requestCount - 1);
    
    if (this.requestCount === 0) {
      this.loadingSubject.next({ isLoading: false });
    }
  }

  /**
   * Update loading message
   */
  updateMessage(message: string): void {
    const currentState = this.loadingSubject.value;
    if (currentState.isLoading) {
      this.loadingSubject.next({
        ...currentState,
        message
      });
    }
  }

  /**
   * Update loading progress
   */
  updateProgress(progress: number): void {
    const currentState = this.loadingSubject.value;
    if (currentState.isLoading) {
      this.loadingSubject.next({
        ...currentState,
        progress: Math.min(100, Math.max(0, progress))
      });
    }
  }

  /**
   * Show loading with progress
   */
  showWithProgress(message: string, progress: number = 0): void {
    this.requestCount++;
    this.loadingSubject.next({
      isLoading: true,
      message,
      progress
    });
  }

  /**
   * Reset loading state
   */
  reset(): void {
    this.requestCount = 0;
    this.loadingSubject.next({ isLoading: false });
  }

  /**
   * Get current loading state
   */
  getCurrentState(): LoadingState {
    return this.loadingSubject.value;
  }

  /**
   * Check if currently loading
   */
  get isLoading(): boolean {
    return this.loadingSubject.value.isLoading;
  }

  /**
   * Get current loading message
   */
  get currentMessage(): string | undefined {
    return this.loadingSubject.value.message;
  }

  /**
   * Get current progress
   */
  get currentProgress(): number | undefined {
    return this.loadingSubject.value.progress;
  }
}
