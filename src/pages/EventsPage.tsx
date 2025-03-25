import React from 'react';
import { useQuery } from 'react-query';
import { eventsService } from '../services/api';

const EventsPage: React.FC = () => {
  const { data, isLoading, error } = useQuery('events', eventsService.getEvents);
  
  if (isLoading) {
    return <div>Loading events...</div>;
  }
  
  if (error) {
    return <div>Error loading events</div>;
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Security Events</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Refresh
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-3 border-b bg-gray-50 flex">
          <div className="w-1/6 font-medium">Time</div>
          <div className="w-1/6 font-medium">Event Type</div>
          <div className="w-1/6 font-medium">Source</div>
          <div className="w-1/6 font-medium">User/Host</div>
          <div className="w-2/6 font-medium">Details</div>
          <div className="w-1/12 font-medium">Actions</div>
        </div>
        
        <div className="divide-y">
          {/* Sample events - would normally come from the API */}
          <div className="px-4 py-3 flex">
            <div className="w-1/6">2023-09-20 14:32:12</div>
            <div className="w-1/6">Authentication</div>
            <div className="w-1/6">SSO Portal</div>
            <div className="w-1/6">user42</div>
            <div className="w-2/6">Successful login from IP 192.168.1.42</div>
            <div className="w-1/12">
              <button className="text-blue-600 hover:text-blue-800">View</button>
            </div>
          </div>
          
          <div className="px-4 py-3 flex">
            <div className="w-1/6">2023-09-20 14:30:55</div>
            <div className="w-1/6">File Access</div>
            <div className="w-1/6">File Server</div>
            <div className="w-1/6">user37</div>
            <div className="w-2/6">Accessed sensitive financial records</div>
            <div className="w-1/12">
              <button className="text-blue-600 hover:text-blue-800">View</button>
            </div>
          </div>
          
          <div className="px-4 py-3 flex">
            <div className="w-1/6">2023-09-20 14:28:03</div>
            <div className="w-1/6">Network</div>
            <div className="w-1/6">Firewall</div>
            <div className="w-1/6">host-73</div>
            <div className="w-2/6">Connection to unusual external IP 203.0.113.42</div>
            <div className="w-1/12">
              <button className="text-blue-600 hover:text-blue-800">View</button>
            </div>
          </div>
          
          <div className="px-4 py-3 flex">
            <div className="w-1/6">2023-09-20 14:25:17</div>
            <div className="w-1/6">Process</div>
            <div className="w-1/6">Endpoint</div>
            <div className="w-1/6">host-42</div>
            <div className="w-2/6">Process powershell.exe started with encoded command</div>
            <div className="w-1/12">
              <button className="text-blue-600 hover:text-blue-800">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
