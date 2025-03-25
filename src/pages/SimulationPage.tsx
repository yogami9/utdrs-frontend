import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { simulationService } from '../services/api';

const SimulationPage: React.FC = () => {
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const queryClient = useQueryClient();
  
  // Get available scenarios
  const { 
    data: scenarios, 
    isLoading: scenariosLoading 
  } = useQuery('scenarios', simulationService.getScenarios);
  
  // Get simulation status
  const { 
    data: simulationStatus, 
    isLoading: statusLoading 
  } = useQuery(
    'simulationStatus', 
    simulationService.getSimulationStatus,
    { refetchInterval: 5000 }  // Refresh every 5 seconds
  );
  
  // Start simulation mutation
  const startMutation = useMutation(
    (scenarios: string[]) => simulationService.startSimulation(scenarios),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('simulationStatus');
        setSelectedScenarios([]);
      }
    }
  );
  
  // Stop simulation mutation
  const stopMutation = useMutation(
    () => simulationService.stopSimulation(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('simulationStatus');
      }
    }
  );
  
  const handleCheckboxChange = (scenarioId: string) => {
    setSelectedScenarios(prev => {
      if (prev.includes(scenarioId)) {
        return prev.filter(id => id !== scenarioId);
      } else {
        return [...prev, scenarioId];
      }
    });
  };
  
  const handleStartSimulation = () => {
    if (selectedScenarios.length > 0) {
      startMutation.mutate(selectedScenarios);
    }
  };
  
  const isLoading = scenariosLoading || statusLoading;
  const isSimulationRunning = simulationStatus?.running_count > 0;
  
  if (isLoading) {
    return <div>Loading simulation data...</div>;
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Simulation Control</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleStartSimulation}
            disabled={selectedScenarios.length === 0 || isSimulationRunning || startMutation.isLoading}
            className={`px-4 py-2 rounded ${
              selectedScenarios.length === 0 || isSimulationRunning
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {startMutation.isLoading ? 'Starting...' : 'Start Simulation'}
          </button>
          
          <button
            onClick={() => stopMutation.mutate()}
            disabled={!isSimulationRunning || stopMutation.isLoading}
            className={`px-4 py-2 rounded ${
              !isSimulationRunning
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {stopMutation.isLoading ? 'Stopping...' : 'Stop Simulation'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Simulation Status</h2>
          
          {isSimulationRunning ? (
            <div className="p-4 bg-green-100 text-green-800 rounded-lg mb-4">
              <div className="font-semibold">Simulation Active</div>
              <div className="mt-2">Running scenarios: {simulationStatus.running_count}</div>
            </div>
          ) : (
            <div className="p-4 bg-gray-100 rounded-lg mb-4">
              <div className="font-semibold">No Active Simulations</div>
              <div className="mt-2">Select scenarios to start a new simulation.</div>
            </div>
          )}
          
          {simulationStatus?.running?.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Active Scenarios:</h3>
              <ul className="list-disc list-inside">
                {simulationStatus.running.map((sim: any) => (
                  <li key={sim.id}>
                    {sim.scenarios.join(', ')} (Started: {new Date(sim.start_time).toLocaleString()})
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {simulationStatus?.recently_completed?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Recently Completed:</h3>
              <ul className="list-disc list-inside">
                {simulationStatus.recently_completed.map((sim: any) => (
                  <li key={sim.id}>
                    {sim.scenarios.join(', ')} (Completed: {new Date(sim.end_time).toLocaleString()})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Available Scenarios</h2>
          
          <div className="space-y-3">
            {scenarios?.map((scenario: any) => (
              <div key={scenario.id} className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id={scenario.id}
                  checked={selectedScenarios.includes(scenario.id)}
                  onChange={() => handleCheckboxChange(scenario.id)}
                  disabled={isSimulationRunning}
                  className="mt-1"
                />
                <div>
                  <label htmlFor={scenario.id} className="font-medium">
                    {scenario.name}
                  </label>
                  <p className="text-sm text-gray-600">{scenario.description}</p>
                  <div className="flex space-x-2 mt-1">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      {scenario.complexity} complexity
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      {scenario.estimated_duration}s duration
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;
