import React, { useState } from 'react';
import axios from 'axios';

const AddBus = () => {
  const [busName, setBusName] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [busType, setBusType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!busName || !totalSeats || !busType) {
      alert('Please fill out all fields');
      return;
    }

    axios
      .post('https://bus-reservation-system-in-aspnet-production.up.railway.app/Bus/add-bus', { bus_name: busName, total_seats: totalSeats, bus_type: busType },{withCredentials: true})
      .then((response) => {
        if (response.data.success) {
          alert('Bus added successfully');
          setBusName('');
          setTotalSeats('');
          setBusType('');
        } else {
          alert('Error adding bus');
        }
      })
      .catch((error) => {
        console.error('Error adding bus:', error);
        alert('Failed to add bus');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full rounded-xl shadow-md p-6 mt-[10vh]">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Add Bus</h1>
        <form className="space-y-4 text-white">
          <div>
            <label className="block text-sm font-bold mb-2">Bus Name</label>
            <input
              type="text"
              value={busName}
              onChange={(e) => setBusName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Total Seats</label>
            <input
              type="number"
              max={40}
              value={totalSeats}
              onChange={(e) => setTotalSeats(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Bus Type</label>
            <input
              type="text"
              value={busType}
              onChange={(e) => setBusType(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 cursor-pointer"
          >
            Add Bus
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBus;
