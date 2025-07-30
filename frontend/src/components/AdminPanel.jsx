import React, { useState } from 'react';
import ViewBus from './viewBus';
import ViewRoutes from './viewRoutes';
import ViewSchedules from './ViewSchedules';
import AddBus from './AddBus';
import AddRoute from './AddRoute';
import AddSchedule from './AddSchedule';
import UpdateBus from './UpdateBus';
import UpdateRoute from './UpdateRoute';
import UpdateSchedule from './SearchUpdateSchedule';

const AdminPanel = () => {
  const [activeComponent, setActiveComponent] = useState('');
  const [activeSection, setActiveSection] = useState('')

  const renderComponent = () => {
    switch (activeComponent) {
      case 'add-bus':
        return <AddBus />;
      case 'add-route':
        return <AddRoute />;
      case 'add-schedule':
        return <AddSchedule />;
      case 'update-bus':
        return <UpdateBus/>
      case 'update-route':
        return <UpdateRoute/>
      case 'update-schedule':
        return <UpdateSchedule/>
      case 'view-bus':
        return <ViewBus/>
      case 'view-route':
        return <ViewRoutes/>
      case 'view-schedule':
        return <ViewSchedules/>
      default:
        return <div className="text-center text-gray-600 mt-10">Please select an action above.</div>;
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Admin Dashboard</h1>
      <div className='flex justify-center space-x-4 mb-8'>
        <button onClick={() => setActiveSection(activeSection === "view" ? '' : "view")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer">
          View</button>
        <button onClick={() => setActiveSection(activeSection === "add" ? '' : "add")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer">
          Add</button>
        <button onClick={() => setActiveSection(activeSection === "update" ? '' : "update")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md cursor-pointer">
          Update</button>
        <button onClick={() => setActiveSection(activeSection === "delete" ? '' : "delete")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer">
          Delete</button>

      </div>

      {activeSection === "add" &&
        <div className={"flex justify-center space-x-4 mb-8"}>
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
      }

      {activeSection === "update" &&
        <div className={"flex justify-center space-x-4 mb-8 "}>
          <button
            onClick={() => setActiveComponent('update-bus')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Update Bus
          </button>
          <button
            onClick={() => setActiveComponent('update-route')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Update Route
          </button>
          <button
            onClick={() => setActiveComponent('update-schedule')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Update Schedule
          </button>

        </div>}

      {activeSection === "delete" &&
        <div className={"flex justify-center space-x-4 mb-8 "}>
          <button
            onClick={() => setActiveComponent('add-bus')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Delete Bus
          </button>
          <button
            onClick={() => setActiveComponent('add-route')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Delete Route
          </button>
          <button
            onClick={() => setActiveComponent('add-schedule')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Delete Schedule
          </button>

        </div>}

      {activeSection === "view" &&
        <div className={"flex justify-center space-x-4 mb-8 "}>
          <button
            onClick={() => setActiveComponent('view-bus')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            View Bus
          </button>
          <button
            onClick={() => setActiveComponent('view-route')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            View Route
          </button>
          <button
            onClick={() => setActiveComponent('view-schedule')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            View Schedule
          </button>

        </div>}

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminPanel;
