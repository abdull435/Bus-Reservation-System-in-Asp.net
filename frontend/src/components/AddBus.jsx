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
      .post('http://192.168.0.116:5212/addBus', { bus_name: busName, total_seats: totalSeats, bus_type: busType },{withCredentials: true})
      .then((response) => {
        if (response.data.success) {
          alert('Bus added successfully');
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
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 mt-[10vh]">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Add Bus</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Bus Name</label>
            <input
              type="text"
              value={busName}
              onChange={(e) => setBusName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Total Seats</label>
            <input
              type="number"
              max={40}
              value={totalSeats}
              onChange={(e) => setTotalSeats(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Bus Type</label>
            <input
              type="text"
              value={busType}
              onChange={(e) => setBusType(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
          >
            Add Bus
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBus;
