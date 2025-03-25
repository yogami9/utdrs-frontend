import React from 'react';
import { useQuery } from 'react-query';
import { alertsService } from '../services/api';

const AlertsPage: React.FC = () => {
  const { data, isLoading, error } = useQuery('alerts', alertsService.getAlerts);
  
  if (isLoading) {
    return <div>Loading alerts...</div>;
  }
  
  if (error) {
    return <div>Error loading alerts</div>;
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Security Alerts</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Refresh Alerts
        </button>
      </div>
      
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-3 border-b bg-gray-50 flex">
          <div className="w-1/6 font-medium">Severity</div>
          <div className="w-1/6 font-medium">Type</div>
          <div className="w-1/6 font-medium">Source</div>
          <div className="w-2/6 font-medium">Description</div>
          <div className="w-1/6 font-medium">Time</div>
          <div className="w-1/12 font-medium">Status</div>
          <div className="w-1/12 font-medium">Actions</div>
        </div>
        
        <div className="divide-y">
          {/* Sample alerts - would normally come from the API */}
          <div className="px-4 py-3 flex items-center">
            <div className="w-1/6">
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Critical</span>
            </div>
            <div className="w-1/6">Ransomware</div>
            <div className="w-1/6">Endpoint</div>
            <div className="w-2/6">Suspicious encryption activity detected on host-42</div>
            <div className="w-1/6">3 min ago</div>
            <div className="w-1/12">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">New</span>
            </div>
            <div className="w-1/12">
              <button className="text-blue-600 hover:text-blue-800">View</button>
            </div>
          </div>
          
          <div className="px-4 py-3 flex items-center">
            <div className="w-1/6">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">High</span>
            </div>
            <div className="w-1/6">Phishing</div>
            <div className="w-1/6">Email</div>
            <div className="w-2/6">Phishing email detected with suspicious attachment</div>
            <div className="w-1/6">25 min ago</div>
            <div className="w-1/12">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">In Progress</span>
            </div>
            <div className="w-1/12">
              <button className="text-blue-600 hover:text-blue-800">View</button>
            </div>
          </div>
          
          <div className="px-4 py-3 flex items-center">
            <div className="w-1/6">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Medium</span>
            </div>
            <div className="w-1/6">Brute Force</div>
            <div className="w-1/6">Authentication</div>
            <div className="w-2/6">Multiple failed login attempts from IP 203.0.113.42</div>
            <div className="w-1/6">2 hours ago</div>
            <div className="w-1/12">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Resolved</span>
            </div>
            <div className="w-1/12">
              <button className="text-blue-600 hover:text-blue-800">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
