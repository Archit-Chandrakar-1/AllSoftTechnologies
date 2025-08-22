import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

interface Document {
  id: number;
  fileName: string;
  category: string;
  minorHead: string;
  tags: string[];
  fileUrl: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;

  minorHeadLabel = 'Name/Department';
  minorHeadOptions: string[] = [];

  selectedTags: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  searchResults: Document[] = [];

  personalNames = ['John', 'Tom', 'Emily'];
  professionalDepartments = ['Accounts', 'HR', 'IT', 'Finance'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      category: [''],
      minorHead: [''],
      tags: [[]],
      fromDate: [''],
      toDate: ['']
    });
  }

  onCategoryChange(category: string) {
    this.minorHeadOptions = [];
    this.searchForm.get('minorHead')!.setValue('');
    if (category === 'Personal') {
      this.minorHeadOptions = this.personalNames;
      this.minorHeadLabel = 'Name';
    } else if (category === 'Professional') {
      this.minorHeadOptions = this.professionalDepartments;
      this.minorHeadLabel = 'Department';
    } else {
      this.minorHeadLabel = 'Name/Department';
    }
  }

  addTag(event: any): void {
    const input = event.input;
    const value = event.value?.trim();

    if (value && !this.selectedTags.includes(value)) {
      this.selectedTags.push(value);
      this.searchForm.get('tags')!.setValue(this.selectedTags);
    }
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
      this.searchForm.get('tags')!.setValue(this.selectedTags);
    }
  }

  onSearch() {
    if (this.searchForm.valid) {
      // TODO: Implement search logic here
      console.log('Search form submitted:', this.searchForm.value);
      
      // Simulate search results
      this.searchResults = [
        {
          id: 1,
          fileName: 'Sample Document 1.pdf',
          category: 'Personal',
          minorHead: 'John',
          tags: ['important', 'personal'],
          fileUrl: '/assets/sample1.pdf'
        },
        {
          id: 2,
          fileName: 'Sample Document 2.pdf',
          category: 'Professional',
          minorHead: 'IT',
          tags: ['work', 'technical'],
          fileUrl: '/assets/sample2.pdf'
        }
      ];
    }
  }

  onDocumentClick(doc: Document) {
    // TODO: Navigate to preview or open document
    console.log('Document clicked:', doc);
  }

  preview(doc: Document) {
    // TODO: Open preview component or dedicated view for the file
    console.log('Previewing file:', doc.fileName);
    // Implement router navigation or modal display in real app
  }

  download(doc: Document) {
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.fileName;
    link.click();
  }

  downloadAll() {
    // TODO: Implement backend API call to get zip file with selected documents
    console.log('Download all as ZIP functionality not implemented.');
    alert('Download all as ZIP functionality not implemented.');
  }
}
