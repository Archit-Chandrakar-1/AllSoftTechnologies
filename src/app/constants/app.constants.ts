export const APP_CONSTANTS = {
  // Application Info
  APP_NAME: 'Document Management System',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'A modern document management system for organizing and searching documents',

  // File Upload
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  ALLOWED_FILE_TYPES: {
    IMAGES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'],
    DOCUMENTS: ['application/pdf'],
    ALL: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'application/pdf']
  },
  ALLOWED_FILE_EXTENSIONS: ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],

  // Document Categories
  CATEGORIES: {
    PERSONAL: 'Personal',
    PROFESSIONAL: 'Professional'
  },

  // Personal Names (for Personal category)
  PERSONAL_NAMES: ['John', 'Tom', 'Emily', 'Sarah', 'Michael', 'Lisa', 'David', 'Anna'],

  // Professional Departments (for Professional category)
  PROFESSIONAL_DEPARTMENTS: ['Accounts', 'HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Operations', 'Legal'],

  // API Endpoints
  API_ENDPOINTS: {
    AUTH: {
      SEND_OTP: '/auth/send-otp',
      VALIDATE_OTP: '/auth/validate-otp',
      LOGOUT: '/auth/logout'
    },
    DOCUMENTS: {
      UPLOAD: '/documents/upload',
      SEARCH: '/documents/search',
      DOWNLOAD: '/documents/download',
      DOWNLOAD_ZIP: '/documents/download-zip',
      DELETE: '/documents/delete'
    },
    TAGS: {
      GET_ALL: '/tags/all',
      ADD: '/tags/add',
      DELETE: '/tags/delete'
    }
  },

  // HTTP Status Codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  },

  // Local Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'authToken',
    USER_INFO: 'userInfo',
    THEME: 'theme',
    LANGUAGE: 'language'
  },

  // Validation Rules
  VALIDATION: {
    MOBILE_NUMBER: {
      PATTERN: '^[0-9]{10}$',
      MIN_LENGTH: 10,
      MAX_LENGTH: 10
    },
    OTP: {
      PATTERN: '^[0-9]{6}$',
      LENGTH: 6
    },
    PASSWORD: {
      MIN_LENGTH: 6,
      MAX_LENGTH: 50
    },
    USERNAME: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 30,
      PATTERN: '^[a-zA-Z0-9_]+$'
    }
  },

  // UI Constants
  UI: {
    DEBOUNCE_DELAY: 300,
    TOAST_DURATION: 5000,
    LOADING_DELAY: 1000,
    MAX_TAGS: 10,
    MAX_TAG_LENGTH: 20
  },

  // Date Formats
  DATE_FORMATS: {
    DISPLAY: 'MMM dd, yyyy',
    API: 'yyyy-MM-dd',
    DATETIME: 'MMM dd, yyyy HH:mm',
    TIME: 'HH:mm'
  },

  // Error Messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Network error. Please check your internet connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied. You do not have permission to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    SERVER_ERROR: 'Server error. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
    INVALID_FILE_TYPE: 'Invalid file type. Only PDF and image files are allowed.',
    UPLOAD_FAILED: 'File upload failed. Please try again.',
    SEARCH_FAILED: 'Search failed. Please try again.',
    DOWNLOAD_FAILED: 'Download failed. Please try again.'
  },

  // Success Messages
  SUCCESS_MESSAGES: {
    LOGIN_SUCCESS: 'Login successful!',
    LOGOUT_SUCCESS: 'Logout successful!',
    UPLOAD_SUCCESS: 'File uploaded successfully!',
    SEARCH_SUCCESS: 'Search completed successfully!',
    DOWNLOAD_SUCCESS: 'Download started successfully!',
    USER_CREATED: 'User created successfully!',
    TAG_ADDED: 'Tag added successfully!',
    TAG_REMOVED: 'Tag removed successfully!'
  },

  // Loading Messages
  LOADING_MESSAGES: {
    UPLOADING: 'Uploading file...',
    SEARCHING: 'Searching documents...',
    DOWNLOADING: 'Downloading file...',
    PROCESSING: 'Processing...',
    LOADING: 'Loading...'
  }
};

export const FILE_ICONS = {
  PDF: 'picture_as_pdf',
  IMAGE: 'image',
  DOCUMENT: 'insert_drive_file',
  FOLDER: 'folder',
  ARCHIVE: 'archive'
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
  FR: 'fr',
  DE: 'de'
};
