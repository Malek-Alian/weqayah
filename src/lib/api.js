import axios from 'axios';
import i18n from '../i18n';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000, // 10 seconds
});

// Request interceptor to add auth token and language header
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add language header
    const currentLanguage = i18n.language || 'en';
    config.headers.lang = currentLanguage === 'ar' ? 'ar' : 'en';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      // Redirect to login if not already there
      if (window.location.pathname !== '/signin') {
        window.location.href = '/signin';
      }
    }

    // Handle network errors
    if (!error.response) {
      error.message = 'Network error. Please check your connection.';
    }

    return Promise.reject(error);
  }
);

/**
 * General API call function
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @param {string} url - API endpoint
 * @param {object} data - Request body (for POST, PUT, PATCH)
 * @param {object} config - Additional axios config (headers, params, etc.)
 * @returns {Promise} Axios response
 */
export const apiCall = async (method, url, data = null, config = {}) => {
  try {
    const response = await api.request({
      method,
      url,
      data,
      ...config,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * GET request
 * @param {string} url - API endpoint
 * @param {object} params - Query parameters
 * @param {object} config - Additional axios config
 * @returns {Promise} Axios response
 */
export const get = async (url, params = {}, config = {}) => {
  return apiCall('GET', url, null, { params, ...config });
};

/**
 * POST request
 * @param {string} url - API endpoint
 * @param {object} data - Request body
 * @param {object} config - Additional axios config
 * @returns {Promise} Axios response
 */
export const post = async (url, data = {}, config = {}) => {
  return apiCall('POST', url, data, config);
};

/**
 * PUT request
 * @param {string} url - API endpoint
 * @param {object} data - Request body
 * @param {object} config - Additional axios config
 * @returns {Promise} Axios response
 */
export const put = async (url, data = {}, config = {}) => {
  return apiCall('PUT', url, data, config);
};

/**
 * PATCH request
 * @param {string} url - API endpoint
 * @param {object} data - Request body
 * @param {object} config - Additional axios config
 * @returns {Promise} Axios response
 */
export const patch = async (url, data = {}, config = {}) => {
  return apiCall('PATCH', url, data, config);
};

/**
 * DELETE request
 * @param {string} url - API endpoint
 * @param {object} config - Additional axios config
 * @returns {Promise} Axios response
 */
export const del = async (url, config = {}) => {
  return apiCall('DELETE', url, null, config);
};

/**
 * Upload file(s) using POST
 * @param {string} url - API endpoint
 * @param {FormData} formData - FormData with files
 * @param {object} config - Additional axios config (onUploadProgress, etc.)
 * @returns {Promise} Axios response
 */
export const upload = async (url, formData, config = {}) => {
  return apiCall('POST', url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  });
};

/**
 * Upload file(s) using PUT
 * @param {string} url - API endpoint
 * @param {FormData} formData - FormData with files
 * @param {object} config - Additional axios config (onUploadProgress, etc.)
 * @returns {Promise} Axios response
 */
export const putUpload = async (url, formData, config = {}) => {
  return apiCall('PUT', url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  });
};

// Export the axios instance for advanced usage
export default api;
