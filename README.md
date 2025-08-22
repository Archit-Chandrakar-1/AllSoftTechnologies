# Document Management System (DMS) Frontend

A modern, responsive Angular-based frontend application for managing documents with advanced search, tagging, and organization capabilities.

## 🚀 Features

### Core Functionality
- **User Authentication**: OTP-based login system
- **Document Upload**: Support for PDF and image files with metadata
- **Advanced Search**: Multi-criteria document search with filters
- **Document Preview**: Built-in preview for supported file types
- **Tag Management**: Dynamic tagging system for document organization
- **Responsive Design**: Mobile-first approach with modern UI/UX

### Document Categories
- **Personal**: Individual user documents (Names: John, Tom, Emily)
- **Professional**: Business documents (Departments: Accounts, HR, IT, Finance)

### File Support
- **PDF Files**: Full preview and download support
- **Image Files**: JPEG, PNG, GIF, BMP, WebP formats
- **File Validation**: Automatic file type checking and validation

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 19 (Standalone Components)
- **UI Components**: Angular Material Design
- **Styling**: CSS3 with modern features (Grid, Flexbox, CSS Variables)
- **State Management**: Angular Services with RxJS
- **Routing**: Angular Router with lazy loading
- **HTTP Client**: Angular HttpClient for API communication

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd dms-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Update the API endpoints in the following service files:
- `src/app/services/auth.service.ts`
- `src/app/services/document.service.ts`
- `src/app/services/tag.service.ts`

### 4. Start Development Server
```bash
npm start
```

The application will be available at `http://localhost:4200`

### 5. Build for Production
```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── admin/           # Admin user creation interface
│   ├── home/            # Dashboard and main landing page
│   ├── login/           # OTP-based authentication
│   ├── preview/         # Document preview component
│   ├── search/          # Document search interface
│   ├── upload/          # Document upload form
│   ├── services/        # API services and business logic
│   ├── pipes/           # Custom Angular pipes
│   ├── app.component.*  # Main application component
│   ├── app.config.ts    # Application configuration
│   └── app.routes.ts    # Routing configuration
├── assets/              # Static assets
└── styles.css           # Global styles
```

## 🔧 Configuration

### API Endpoints
The application expects the following backend API structure:

#### Authentication
- `POST /api/auth/send-otp` - Send OTP to mobile number
- `POST /api/auth/validate-otp` - Validate OTP and get token

#### Documents
- `POST /api/documents/upload` - Upload new document
- `GET /api/documents/search` - Search documents with filters
- `GET /api/documents/download/{id}` - Download individual file
- `POST /api/documents/download-zip` - Download multiple files as ZIP

#### Tags
- `GET /api/tags/all` - Get all available tags
- `POST /api/tags/add` - Add new tag

### Environment Variables
Create environment files for different deployment stages:
- `src/environments/environment.ts` (Development)
- `src/environments/environment.prod.ts` (Production)

## 📱 Component Details

### Login Component
- Mobile number input with validation
- OTP verification interface
- Automatic token storage
- Error handling and user feedback

### Upload Component
- Date picker for document date
- Category selection (Personal/Professional)
- Dynamic dropdown for names/departments
- Tag input with chip interface
- File type validation
- Remarks field for additional notes

### Search Component
- Category-based filtering
- Date range selection
- Tag-based search
- Real-time results display
- Download options (individual/zip)

### Preview Component
- PDF viewer integration
- Image display
- Download functionality
- Unsupported file type handling

### Admin Component
- User creation interface
- Username and password fields
- Form validation
- Success/error messaging

## 🎨 UI/UX Features

### Design Principles
- **Material Design**: Following Google's Material Design guidelines
- **Responsive Layout**: Mobile-first responsive design
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Lazy loading and optimized bundle size

### Color Scheme
- Primary: Blue gradient (#667eea to #764ba2)
- Accent: Purple (#667eea)
- Success: Green (#27ae60)
- Error: Red (#e74c3c)
- Neutral: Gray scale (#2c3e50, #7f8c8d)

## 🔒 Security Features

- JWT token-based authentication
- Secure HTTP headers
- Input validation and sanitization
- XSS protection
- CSRF token support (backend dependent)

## 📊 State Management

The application uses Angular services for state management:
- **AuthService**: Handles authentication state and tokens
- **DocumentService**: Manages document operations
- **TagService**: Handles tag-related operations

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run e2e
```

## 🚀 Deployment

### Build Optimization
```bash
npm run build --prod
```

### Docker Support
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/dms-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔧 Development

### Code Style
- Follow Angular style guide
- Use TypeScript strict mode
- Implement proper error handling
- Add comprehensive comments

### Git Workflow
1. Create feature branch from main
2. Implement changes with tests
3. Submit pull request
4. Code review and approval
5. Merge to main branch

## 📝 API Documentation

### Request Headers
```typescript
{
  'Authorization': 'Bearer <jwt-token>',
  'Content-Type': 'application/json'
}
```

### Response Format
```typescript
{
  success: boolean,
  data: any,
  message: string,
  errors?: string[]
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure Node.js version compatibility
2. **Material Icons**: Verify @angular/material installation
3. **Routing Issues**: Check route configuration and lazy loading
4. **API Errors**: Verify backend connectivity and endpoints

### Debug Mode
Enable debug logging in development:
```typescript
// In app.config.ts
import { provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ 
      eventCoalescing: true,
      shouldCoalesceEventChangeDetection: false 
    })
  ]
};
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For technical support or questions:
- Email: nk@allsoft.co
- Create an issue in the repository
- Check the documentation

## 🔄 Version History

- **v1.0.0**: Initial release with core functionality
- **v1.1.0**: Added responsive design and mobile optimization
- **v1.2.0**: Enhanced search capabilities and UI improvements

---

**Note**: This is a frontend-only implementation. Backend API endpoints need to be implemented separately using .NET and MySQL as specified in the requirements.
