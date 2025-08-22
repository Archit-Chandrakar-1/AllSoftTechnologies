import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  uploadForm!: FormGroup;

  minorHeadLabel = 'Select Name/Department';
  minorHeadOptions: string[] = [];

  selectedTags: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  selectedFile: File | null = null;
  selectedFileName: string = '';
  fileInvalid: boolean = false;

  personalNames = ['John', 'Tom', 'Emily'];
  professionalDepartments = ['Accounts', 'HR', 'IT', 'Finance'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      date: ['', Validators.required],
      category: ['', Validators.required],
      minorHead: ['', Validators.required],
      remarks: [''],
      tags: [[]]
    });
  }

  onCategoryChange(event: any) {
    const category = event.value;
    this.minorHeadOptions = [];
    this.uploadForm.get('minorHead')!.setValue('');
    if (category === 'Personal') {
      this.minorHeadOptions = this.personalNames;
      this.minorHeadLabel = 'Name';
    } else if (category === 'Professional') {
      this.minorHeadOptions = this.professionalDepartments;
      this.minorHeadLabel = 'Department';
    } else {
      this.minorHeadLabel = 'Select Name/Department';
    }
  }

  addTag(event: any): void {
    const input = event.input;
    const value = event.value?.trim();
    if (value && !this.selectedTags.includes(value)) {
      this.selectedTags.push(value);
      this.uploadForm.get('tags')!.setValue(this.selectedTags);
    }
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
      this.uploadForm.get('tags')!.setValue(this.selectedTags);
    }
  }

  onFileSelect(event: any) {
    this.fileInvalid = false;
    const file: File = event.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/webp', 'image/bmp'];
      if (!validTypes.includes(file.type)) {
        this.fileInvalid = true;
        this.selectedFile = null;
        this.selectedFileName = '';
        return;
      }
      this.selectedFile = file;
      this.selectedFileName = file.name;
    }
  }

  onSubmit() {
    if (this.uploadForm.invalid || !this.selectedFile) {
      return;
    }
    const dateValue = this.uploadForm.get('date')?.value;
    if (!dateValue) return;

    const formData = new FormData();
    formData.append('date', dateValue.toISOString());
    formData.append('category', this.uploadForm.get('category')!.value);
    formData.append('minorHead', this.uploadForm.get('minorHead')!.value);
    formData.append('remarks', this.uploadForm.get('remarks')!.value || '');
    formData.append('file', this.selectedFile);

    this.selectedTags.forEach(tag => {
      formData.append('tags', tag);
    });

    // TODO: Call backend upload API service here

    console.log('Form Data Prepared:', formData);

    this.uploadForm.reset();
    this.selectedTags = [];
    this.selectedFile = null;
    this.selectedFileName = '';
  }
}
