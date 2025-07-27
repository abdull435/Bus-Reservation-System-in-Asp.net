import React, { useState } from 'react';
import AddBus from './AddBus';
import AddRoute from './AddRoute';
import AddSchedule from './AddSchedule';

const AdminPanel = () => {
  const [activeComponent, setActiveComponent] = useState('');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'add-bus':
        return <AddBus />;
      case 'add-route':
        return <AddRoute />;
      case 'add-schedule':
        return <AddSchedule />;
      default:
        return <div className="text-center text-gray-600 mt-10">Please select an action above.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Admin Dashboard</h1>
      
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveComponent('add-bus')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Add Bus
        </button>
        <button
          onClick={() => setActiveComponent('add-route')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Add Route
        </button>
        <button
          onClick={() => setActiveComponent('add-schedule')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Add Schedule
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminPanel;
