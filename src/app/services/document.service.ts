// src/app/services/document.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DocumentData {
  major_head: string;
  minor_head: string;
  document_date: string;
  document_remarks: string;
  tags: Array<{tag_name: string}>;
  user_id: string;
}

export interface SearchRequest {
  major_head?: string;
  minor_head?: string;
  from_date?: string;
  to_date?: string;
  tags?: Array<{tag_name: string}>;
  uploaded_by?: string;
  start: number;
  length: number;
  filterId?: string;
  search: {
    value: string;
  };
}

export interface Document {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadDate: string;
  category: string;
  minorHead: string;
  tags: string[];
  remarks: string;
  uploadedBy: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiBase = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  uploadDocument(file: File, documentData: DocumentData): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify(documentData));
    
    const headers = new HttpHeaders({
      'token': this.getAuthToken()
    });

    return this.http.post(`${this.apiBase}${environment.uploadDocumentEndpoint}`, formData, { headers });
  }

  searchDocuments(searchRequest: SearchRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.getAuthToken()
    });

    return this.http.post(`${this.apiBase}${environment.searchDocumentsEndpoint}`, searchRequest, { headers });
  }

  downloadFile(fileId: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'token': this.getAuthToken()
    });

    return this.http.get(`${this.apiBase}/download/${fileId}`, { 
      headers, 
      responseType: 'blob' 
    });
  }

  downloadAllZip(searchRequest: SearchRequest): Observable<Blob> {
    const headers = new HttpHeaders({
      'token': this.getAuthToken()
    });

    return this.http.post(`${this.apiBase}/download-all`, searchRequest, { 
      headers, 
      responseType: 'blob' 
    });
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}
