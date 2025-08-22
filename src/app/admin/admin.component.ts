import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.adminForm.invalid) {
      return;
    }

    const username = this.adminForm.get('username')?.value;
    const password = this.adminForm.get('password')?.value;

    // TODO: Call backend API to create user here
    // Simulating success response below

    this.successMessage = `User "${username}" created successfully!`;
    this.errorMessage = '';
    this.adminForm.reset();

    // If error occurs, set errorMessage and clear successMessage
    // this.errorMessage = 'Failed to create user. Please try again.';
    // this.successMessage = '';
  }
}
