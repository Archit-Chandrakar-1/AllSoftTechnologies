# Deployment Guide for Document Management System

This guide provides step-by-step instructions for deploying the DMS Frontend application to various environments.

## 🚀 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19)
- Git

## 📦 Build the Application

### 1. Production Build
```bash
npm run build:prod
```

This command will:
- Compile the application with production optimizations
- Minify and bundle all assets
- Generate optimized code for deployment
- Create output in the `dist/dms-frontend` directory

### 2. Development Build
```bash
npm run build
```

This creates an unoptimized build for development/testing purposes.

## 🌐 Deployment Options

### Option 1: Static Hosting (Recommended)

#### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build:prod`
3. Set publish directory: `dist/dms-frontend`
4. Deploy automatically on push to main branch

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts to deploy

#### GitHub Pages
1. Add to `angular.json`:
```json
{
  "projects": {
    "dms-frontend": {
      "architect": {
        "build": {
          "options": {
            "baseHref": "/your-repo-name/"
          }
        }
      }
    }
  }
}
```
2. Build and deploy:
```bash
npm run build:prod
npx angular-cli-ghpages --dir=dist/dms-frontend
```

### Option 2: Docker Deployment

#### Create Dockerfile
```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:prod

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist/dms-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Create nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        # Handle Angular routing
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }
}
```

#### Build and Run Docker Container
```bash
# Build image
docker build -t dms-frontend .

# Run container
docker run -d -p 80:80 --name dms-app dms-frontend
```

### Option 3: Cloud Platform Deployment

#### AWS S3 + CloudFront
1. Create S3 bucket for static hosting
2. Enable static website hosting
3. Upload built files to S3
4. Create CloudFront distribution
5. Configure custom domain (optional)

#### Azure Static Web Apps
1. Install Azure CLI
2. Create static web app:
```bash
az staticwebapp create --name dms-frontend --source .
```
3. Deploy:
```bash
az staticwebapp deploy --name dms-frontend --source .
```

#### Google Cloud Platform
1. Install gcloud CLI
2. Create bucket and enable static website hosting
3. Upload files:
```bash
gsutil -m cp -r dist/dms-frontend/* gs://your-bucket-name/
```

## 🔧 Environment Configuration

### 1. Environment Files
Create environment files for different deployment stages:

#### `src/environments/environment.ts` (Development)
```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000/api',
  authEndpoint: '/auth',
  documentsEndpoint: '/documents',
  tagsEndpoint: '/tags'
};
```

#### `src/environments/environment.prod.ts` (Production)
```typescript
export const environment = {
  production: true,
  apiBaseUrl: 'https://your-production-api.com/api',
  authEndpoint: '/auth',
  documentsEndpoint: '/documents',
  tagsEndpoint: '/tags'
};
```

### 2. Update API Endpoints
Ensure all service files use environment configuration:

```typescript
import { environment } from '../../environments/environment';

private apiBase = `${environment.apiBaseUrl}${environment.documentsEndpoint}`;
```

## 🔒 Security Considerations

### 1. HTTPS
- Always use HTTPS in production
- Configure SSL certificates
- Redirect HTTP to HTTPS

### 2. Security Headers
Add security headers in your hosting configuration:

```nginx
# Nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

### 3. CORS Configuration
Ensure your backend API allows requests from your frontend domain.

## 📱 Performance Optimization

### 1. Enable Compression
Configure your web server to compress static assets:

```nginx
# Nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 2. Browser Caching
Set appropriate cache headers for static assets:

```nginx
# Nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. CDN Configuration
Use a CDN for global content delivery:
- CloudFlare
- AWS CloudFront
- Azure CDN
- Google Cloud CDN

## 🧪 Testing Deployment

### 1. Pre-deployment Checklist
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Production build succeeds (`npm run build:prod`)
- [ ] Environment variables configured
- [ ] API endpoints updated

### 2. Post-deployment Testing
- [ ] Application loads without errors
- [ ] All routes work correctly
- [ ] API calls succeed
- [ ] Authentication works
- [ ] File upload/download functions
- [ ] Search functionality works
- [ ] Responsive design on mobile

### 3. Performance Testing
- [ ] Page load times
- [ ] Bundle size analysis
- [ ] Core Web Vitals
- [ ] Lighthouse score

## 🔄 Continuous Deployment

### 1. GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build:prod
    
    - name: Deploy to hosting platform
      # Add your deployment steps here
```

### 2. Automated Testing
- Run tests on every commit
- Block deployment if tests fail
- Include security scanning
- Performance regression testing

## 📊 Monitoring and Analytics

### 1. Error Tracking
- Sentry
- LogRocket
- Bugsnag

### 2. Performance Monitoring
- Google Analytics
- Hotjar
- FullStory

### 3. Uptime Monitoring
- UptimeRobot
- Pingdom
- StatusCake

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

2. **Runtime Errors**
   - Check browser console for errors
   - Verify environment configuration
   - Check API endpoint connectivity

3. **Performance Issues**
   - Analyze bundle size: `npm run analyze`
   - Enable production mode
   - Check CDN configuration

4. **CORS Errors**
   - Verify backend CORS settings
   - Check API endpoint URLs
   - Ensure HTTPS in production

## 📞 Support

For deployment issues:
- Check the Angular deployment guide
- Review hosting platform documentation
- Contact the development team
- Create an issue in the repository

---

**Note**: This deployment guide assumes you have access to the hosting platforms mentioned. Adjust the instructions based on your specific hosting environment and requirements.
