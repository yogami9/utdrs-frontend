import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaChartLine, 
  FaExclamationTriangle, 
  FaList, 
  FaPlay 
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold">UTDRS</h2>
      </div>
      <nav className="mt-5">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => 
            `flex items-center px-4 py-3 hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <FaChartLine className="mr-3" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/alerts" 
          className={({ isActive }) => 
            `flex items-center px-4 py-3 hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <FaExclamationTriangle className="mr-3" />
          <span>Alerts</span>
        </NavLink>
        
        <NavLink 
          to="/events" 
          className={({ isActive }) => 
            `flex items-center px-4 py-3 hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <FaList className="mr-3" />
          <span>Events</span>
        </NavLink>
        
        <NavLink 
          to="/simulation" 
          className={({ isActive }) => 
            `flex items-center px-4 py-3 hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <FaPlay className="mr-3" />
          <span>Simulation</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
