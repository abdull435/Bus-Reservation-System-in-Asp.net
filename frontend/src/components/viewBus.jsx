import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBus = () => {
  const [buses, setBuses] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5212/Bus_Route')
      .then(response => {
      setBuses(response.data.bus);
      })
      .catch(error => {
        console.error('Error fetching buses:', error);
      });
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 mt-[10vh]">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">View Buses</h1>
        <table className="min-w-full bg-white border border-gray-300 rounded shadow">
          <thead className="bg-blue-600 text-white text-center">
            <tr className="">
              <th className='px-4 py-2'>Bus ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Total Seats</th>
              <th className="px-4 py-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {
                buses.map(b=>(
                    <tr key={buses.bus_id} className="border-t text-center">
                <td className="px-4 py-2">{b.bus_id}</td>
                <td className="px-4 py-2">{b.bus_name}</td>
                <td className="px-4 py-2">{b.total_seats}</td>
                <td className="px-4 py-2">{b.bus_type}</td>
              </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBus;
