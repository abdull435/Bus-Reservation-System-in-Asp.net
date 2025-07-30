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
      .post('http://localhost:5212/Route/add-route', { from_city: fromCity, to_city: toCity }, { withCredentials: true })
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
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 mt-[10vh]">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Add Route</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">From City</label>
            <input
              type="text"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">To City</label>
            <input
              type="text"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
          >
            Add Route
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoute;
