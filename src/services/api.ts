
interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  timeout: number;
}

// Mock implementation for connecting to Django backend
export class ApiService {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  async get(endpoint: string) {
    try {
      console.log(`GET ${this.config.baseUrl}${endpoint}`);
      // In a real implementation, this would make an actual API call
      // For now, we'll just return mock data
      return this.mockResponse(endpoint);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async post(endpoint: string, data: any) {
    try {
      console.log(`POST ${this.config.baseUrl}${endpoint}`, data);
      // In a real implementation, this would make an actual API call
      return { success: true, id: Date.now() };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async put(endpoint: string, data: any) {
    try {
      console.log(`PUT ${this.config.baseUrl}${endpoint}`, data);
      // In a real implementation, this would make an actual API call
      return { success: true };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async delete(endpoint: string) {
    try {
      console.log(`DELETE ${this.config.baseUrl}${endpoint}`);
      // In a real implementation, this would make an actual API call
      return { success: true };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Mock responses for demonstration
  private mockResponse(endpoint: string) {
    if (endpoint.includes('products')) {
      return {
        results: [
          { id: 1, name: 'Product 1', price: 19.99 },
          { id: 2, name: 'Product 2', price: 29.99 }
        ]
      };
    }
    
    if (endpoint.includes('users')) {
      return {
        results: [
          { id: 1, name: 'User 1', email: 'user1@example.com' },
          { id: 2, name: 'User 2', email: 'user2@example.com' }
        ]
      };
    }
    
    return { results: [] };
  }
}

// Create and export a default instance
export const api = new ApiService({
  baseUrl: 'http://localhost:8000/api/',
  apiKey: 'demo-key',
  timeout: 30000
});

export default api;
