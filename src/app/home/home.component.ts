import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recentDocuments: any[] = [];
  stats = {
    totalDocuments: 0,
    personalDocuments: 0,
    professionalDocuments: 0
  };

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // TODO: Load recent documents and stats from backend
    // For now, using mock data
    this.recentDocuments = [
      {
        id: 1,
        fileName: 'Project_Plan.pdf',
        category: 'Professional',
        minorHead: 'IT',
        uploadDate: new Date('2024-01-15'),
        tags: ['planning', 'project']
      },
      {
        id: 2,
        fileName: 'Vacation_Photo.jpg',
        category: 'Personal',
        minorHead: 'John',
        uploadDate: new Date('2024-01-14'),
        tags: ['holiday', 'memories']
      },
      {
        id: 3,
        fileName: 'Financial_Report.pdf',
        category: 'Professional',
        minorHead: 'Finance',
        uploadDate: new Date('2024-01-13'),
        tags: ['finance', 'report']
      }
    ];

    this.stats = {
      totalDocuments: 156,
      personalDocuments: 89,
      professionalDocuments: 67
    };
  }

  getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') return 'picture_as_pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension || '')) return 'image';
    return 'insert_drive_file';
  }
}
