import React, { useState } from 'react';
import axios from 'axios';

const AddRoute = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fromCity || !toCity) {
      alert('Please fill out both cities');
      return;
    }

    if (fromCity === toCity) {
      alert('Departure and Arrival both are not same')
      return
    }

    axios
      .post('https://bus-reservation-system-in-aspnet-production.up.railway.app/Route/add-route', { from_city: fromCity, to_city: toCity }, { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          alert('Route added successfully');
        } else {
          alert('Error adding route');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          alert('This route already exists.');
        } else {
          console.error('Error adding route:', error);
          alert('Failed to add route');
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full rounded-xl shadow-md p-6 mt-[10vh]">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Add Route</h1>
        <form className="space-y-4 text-white">
          <div>
            <label className="block text-sm font-bold mb-2">From City</label>
            <input
              type="text"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">To City</label>
            <input
              type="text"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 cursor-pointer"
          >
            Add Route
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoute;
