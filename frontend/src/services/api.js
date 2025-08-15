
// src/services/api.js - Frontend API Integration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to create headers
const createHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...createHeaders(options.includeAuth),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// ===== AUTHENTICATION API =====
export const authAPI = {
  register: async (userData) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  setAuthData: (token, user) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// ===== PRODUCTS API =====
export const productsAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    
    return apiCall(endpoint);
  },

  getById: async (productId) => {
    return apiCall(`/products/${productId}`);
  },

  search: async (searchTerm) => {
    return apiCall(`/products?search=${encodeURIComponent(searchTerm)}`);
  },

  getByCategory: async (category, subcategory = '') => {
    let endpoint = `/products?category=${category}`;
    if (subcategory) {
      endpoint += `&subcategory=${subcategory}`;
    }
    return apiCall(endpoint);
  }
};

// ===== CART API =====
export const cartAPI = {
  get: async () => {
    return apiCall('/cart', { includeAuth: true });
  },

  add: async (productId, quantity = 1) => {
    return apiCall('/cart/add', {
      method: 'POST',
      includeAuth: true,
      body: JSON.stringify({ productId, quantity }),
    });
  },

  remove: async (productId) => {
    return apiCall(`/cart/remove/${productId}`, {
      method: 'DELETE',
      includeAuth: true,
    });
  },

  update: async (productId, quantity) => {
    return apiCall('/cart/update', {
      method: 'PUT',
      includeAuth: true,
      body: JSON.stringify({ productId, quantity }),
    });
  },

  clear: async () => {
    return apiCall('/cart/clear', {
      method: 'DELETE',
      includeAuth: true,
    });
  }
};

// ===== ORDERS API =====
export const ordersAPI = {
  create: async (orderData) => {
    return apiCall('/orders', {
      method: 'POST',
      includeAuth: true,
      body: JSON.stringify(orderData),
    });
  },

  getAll: async () => {
    return apiCall('/orders', { includeAuth: true });
  },

  getById: async (orderId) => {
    return apiCall(`/orders/${orderId}`, { includeAuth: true });
  }
};

// ===== RECOMMENDATIONS API =====
export const recommendationsAPI = {
  getByFaceShape: async (faceShape, preferences = {}) => {
    return apiCall('/recommendations', {
      method: 'POST',
      includeAuth: true,
      body: JSON.stringify({ faceShape, ...preferences }),
    });
  },

  getUserRecommendations: async () => {
    return apiCall('/recommendations/user', { includeAuth: true });
  }
};

// ===== CHATBOT API =====
export const chatbotAPI = {
  sendMessage: async (message, userId = null) => {
    return apiCall('/chatbot', {
      method: 'POST',
      body: JSON.stringify({ message, userId }),
    });
  }
};

// ===== HEALTH CHECK =====
export const healthAPI = {
  check: async () => {
    return apiCall('/health');
  }
};

// Export default API service
const apiService = {
  auth: authAPI,
  products: productsAPI,
  cart: cartAPI,
  orders: ordersAPI,
  recommendations: recommendationsAPI,
  chatbot: chatbotAPI,
  health: healthAPI,
};

export default apiService;