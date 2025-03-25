import axios from 'axios';

const API_GATEWAY_URL = 'https://utdrs-api-gateway.onrender.com';
const DATA_SIMULATOR_URL = 'https://utdrs-data-simulator.onrender.com';
const CORE_ENGINE_URL = 'https://utdrs-core-engine.onrender.com';
const RESPONSE_SERVICE_URL = 'https://response-service.onrender.com';

// Create axios instances for each service
export const apiGateway = axios.create({
  baseURL: API_GATEWAY_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const dataSimulator = axios.create({
  baseURL: DATA_SIMULATOR_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const coreEngine = axios.create({
  baseURL: CORE_ENGINE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const responseService = axios.create({
  baseURL: RESPONSE_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication interceptor to API Gateway
apiGateway.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration and authentication errors
apiGateway.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token on 401 responses
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Authentication service
export const authService = {
  login: async (username: string, password: string) => {
    try {
      // Create URLSearchParams for proper form encoding
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/login`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      return response.data;
    } catch (error: any) {
      // Improved error handling with detailed logging
      console.error('Login failed:', error.response?.status, error.response?.data);
      
      // Format a better error message
      let errorMessage = 'Authentication failed';
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Invalid username or password';
        } else if (error.response.data?.detail) {
          errorMessage = error.response.data.detail;
        }
      } else if (!error.response) {
        errorMessage = 'Unable to connect to server';
      }
      
      const enhancedError = new Error(errorMessage);
      throw enhancedError;
    }
  },
  
  getProfile: async () => {
    try {
      const response = await apiGateway.get('/api/v1/auth/me');
      return response.data;
    } catch (error: any) {
      console.error('Profile request failed:', error.response?.status, error.response?.data);
      throw error;
    }
  },
  
  // Helper method to check API health
  checkApiHealth: async () => {
    try {
      const response = await axios.get(`${API_GATEWAY_URL}/api/v1/health`);
      return { available: true, data: response.data };
    } catch (error) {
      return { available: false, error: error };
    }
  }
};

// Alerts service
export const alertsService = {
  getAlerts: async () => {
    const response = await apiGateway.get('/api/v1/alerts');
    return response.data;
  },
  
  getAlert: async (id: string) => {
    const response = await apiGateway.get(`/api/v1/alerts/${id}`);
    return response.data;
  },
};

// Events service
export const eventsService = {
  getEvents: async () => {
    const response = await apiGateway.get('/api/v1/events');
    return response.data;
  },
  
  getEvent: async (id: string) => {
    const response = await apiGateway.get(`/api/v1/events/${id}`);
    return response.data;
  },
};

// Simulation service
export const simulationService = {
  getScenarios: async () => {
    const response = await dataSimulator.get('/api/v1/scenarios');
    return response.data;
  },
  
  startSimulation: async (scenarios: string[]) => {
    const response = await dataSimulator.post('/api/v1/simulations/start', {
      scenarios,
      intensity: 'medium',
    });
    return response.data;
  },
  
  stopSimulation: async () => {
    const response = await dataSimulator.post('/api/v1/simulations/stop');
    return response.data;
  },
  
  getSimulationStatus: async () => {
    const response = await dataSimulator.get('/api/v1/simulations/status');
    return response.data;
  },
};