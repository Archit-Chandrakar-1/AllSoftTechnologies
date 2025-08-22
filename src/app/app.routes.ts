import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent) },
  { path: 'upload', loadComponent: () => import('./upload/upload.component').then(m => m.UploadComponent) },
  { path: 'search', loadComponent: () => import('./search/search.component').then(m => m.SearchComponent) },
  { path: 'preview', loadComponent: () => import('./preview/preview.component').then(m => m.PreviewComponent) }
];
