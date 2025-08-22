// src/app/services/tag.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TagRequest {
  term: string;
}

export interface Tag {
  id: string;
  tag_name: string;
  count?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiBase = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getTags(term: string = ''): Observable<Tag[]> {
    const request: TagRequest = { term };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.getAuthToken()
    });

    return this.http.post<Tag[]>(`${this.apiBase}${environment.documentTagsEndpoint}`, request, { headers });
  }

  addTag(tagName: string): Observable<Tag> {
    const request: TagRequest = { term: tagName };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.getAuthToken()
    });

    return this.http.post<Tag>(`${this.apiBase}${environment.documentTagsEndpoint}`, request, { headers });
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}
