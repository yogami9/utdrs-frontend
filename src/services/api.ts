import axios from 'axios';

const API_GATEWAY_URL = 'https://utdrs-api-gateway.onrender.com';
const DATA_SIMULATOR_URL = 'https://utdrs-data-simulator.onrender.com';
const CORE_ENGINE_URL = 'https://utdrs-core-engine.onrender.com';

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

// Specific additional utility methods
export const utilityService = {
  getSystemStatus: async () => {
    const apiGatewayStatus = await checkServiceHealth(API_GATEWAY_URL);
    const dataSimulatorStatus = await checkServiceHealth(DATA_SIMULATOR_URL);
    const coreEngineStatus = await checkServiceHealth(CORE_ENGINE_URL);
    
    return {
      apiGateway: apiGatewayStatus,
      dataSimulator: dataSimulatorStatus,
      coreEngine: coreEngineStatus
    };
  }
};

// Helper function to check service health
async function checkServiceHealth(url: string): Promise<{ status: string }> {
  try {
    const response = await axios.get(`${url}/health`);
    return { status: response.data.status === 'ok' ? 'online' : 'offline' };
  } catch (error) {
    return { status: 'offline' };
  }
}