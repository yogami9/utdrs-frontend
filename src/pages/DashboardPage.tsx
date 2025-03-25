import React from 'react';
import { useQuery } from 'react-query';
import { alertsService, eventsService, simulationService } from '../services/api';

const DashboardPage: React.FC = () => {
  const { data: alertsData, isLoading: alertsLoading } = useQuery('alerts', alertsService.getAlerts);
  const { data: eventsData, isLoading: eventsLoading } = useQuery('events', eventsService.getEvents);
  const { data: simulationData, isLoading: simulationLoading } = useQuery(
    'simulationStatus',
    simulationService.getSimulationStatus
  );
  
  const isLoading = alertsLoading || eventsLoading || simulationLoading;
  
  if (isLoading) {
    return <div>Loading dashboard data...</div>;
  }
  
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Security Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium mb-2">Alerts</h2>
          <div className="text-3xl font-bold text-red-600">
            {alertsData ? 'Sample Data' : '0'}
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium mb-2">Events</h2>
          <div className="text-3xl font-bold text-blue-600">
            {eventsData ? 'Sample Data' : '0'}
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium mb-2">Simulations</h2>
          <div className="text-3xl font-bold text-green-600">
            {simulationData && simulationData.running_count > 0 ? 'Active' : 'Inactive'}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Recent Alerts</h2>
          <div className="border rounded">
            <div className="px-4 py-2 border-b bg-gray-50 flex">
              <div className="w-1/4 font-medium">Type</div>
              <div className="w-1/4 font-medium">Severity</div>
              <div className="w-2/4 font-medium">Description</div>
            </div>
            <div className="divide-y">
              <div className="px-4 py-2 flex">
                <div className="w-1/4">Phishing</div>
                <div className="w-1/4">
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Critical</span>
                </div>
                <div className="w-2/4">Suspicious email detected with malicious attachment</div>
              </div>
              <div className="px-4 py-2 flex">
                <div className="w-1/4">Auth</div>
                <div className="w-1/4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">High</span>
                </div>
                <div className="w-2/4">Multiple failed login attempts from unusual location</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>API Gateway</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Core Engine</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Response Service</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Data Simulator</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
