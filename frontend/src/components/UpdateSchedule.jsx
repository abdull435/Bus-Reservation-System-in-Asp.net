import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateSchedule = ({ selectedSchedule }) => {

  const scheduleId = selectedSchedule.schedule_id;
  const from = selectedSchedule.routes.from_city;
  const to = selectedSchedule.routes.to_city;

  const [busId, setBusId] = useState('');
  const [routeId, setRouteId] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');


  const [bus, setBus] = useState('');
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios.get('https://bus-reservation-system-in-aspnet-production.up.railway.app/Bus_Route', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        setBuses(response.data.bus);
        setRoutes(response.data.route);
        const matchedBus = response.data.bus.find(b => b.bus_id === selectedSchedule.bus_id);
        setBus(matchedBus.bus_name);

      })
      .catch(error => {
        console.error('Error fetching buses:', error);
      });

  }, []);

  const handleSubmit = () => {
    // e.preventDefault();

    if (departureTime === arrivalTime) {
      alert('Departure and arrival both are not same');
      return;
    }
    if (departureTime > arrivalTime) {
      alert('Departure time is not greater then arrival');
      return;
    }
    if (!busId || !routeId || !departureTime || !arrivalTime || !date) {
      alert('Please fill out all fields');
      return;
    }

    const d_time = new Date(`${date}T${departureTime}`).toISOString();
    const a_time = new Date(`${date}T${arrivalTime}`).toISOString();

    const scheduleData = {
      bus_id: busId,
      route_id: routeId,
      departure_time: d_time,
      arrival_time: a_time,
      date: date,
      price: price,
    };

    axios.put(`https://bus-reservation-system-in-aspnet-production.up.railway.app/Schedule/update-schedule/${scheduleId}`, scheduleData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }, { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          alert("Schedule Updated");
        }

      })
      .catch((error) => {
        console.error('Error adding schedule:', error);
        alert('Failed to add schedule');
      });
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <h1 className="text-2xl font-bold text-center text-white mb-6">Selected Schedule</h1>
      <div className='w-full overflow-x-auto'>
      <table className="min-w-full  border border-gray-300 rounded shadow ">
        <thead className="bg-lime-600 text-white text-center">
          <tr className="">
            <th className='px-4 py-2'>Schedule Id</th>
            <th className='px-4 py-2'>Bus</th>
            <th className="px-4 py-2">Route</th>
            <th className="px-4 py-2">Departure Time</th>
            <th className="px-4 py-2">Arrival Time</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr key={selectedSchedule.schedule_id} className="border-t text-center">
            <td className="px-4 py-2">{selectedSchedule.schedule_id}</td>
            <td className="px-4 py-2">{bus}</td>
            <td className="px-4 py-2">{from} to {to}</td>
            <td className="px-4 py-2">
              {new Date(selectedSchedule.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
            </td>
            <td className="px-4 py-2">
              {new Date(selectedSchedule.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
            </td>
            <td className="px-4 py-2">
              {new Date(selectedSchedule.date).toLocaleDateString()}
            </td>
            <td className="px-4 py-2">{selectedSchedule.price}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div className="max-w-md w-full rounded-xl shadow-md p-6 mt-[5vh]">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Update Schedule</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Select Bus</label>
            <select
              value={busId}
              onChange={(e) => setBusId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
            >
              <option className='bg-black' value="">Select Bus</option>
              {buses.map((buse) => (
                <option className='bg-black' key={buse.bus_id} value={buse.bus_id}>
                  {buse.bus_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Select Route</label>
            <select
              value={routeId}
              onChange={(e) => setRouteId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
            >
              <option className='bg-black' value="">Select Route</option>
              {routes.map((route) => (
                <option className='bg-black' key={route.route_id} value={route.route_id}>
                  {route.from_city} to {route.to_city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Date</label>
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Departure Time</label>
            <input
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Arrival Time</label>
            <input
              type="time"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Ticket Price</label>
            <input
              type="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
            />
          </div>

          <button
            type='button'
            onClick={handleSubmit}
            className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
          >
            Add Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSchedule;
