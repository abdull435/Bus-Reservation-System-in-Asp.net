import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBus = () => {
  const [buses, setBuses] = useState([]);

  useEffect(()=>{
    axios.get('https://bus-reservation-system-in-aspnet-production.up.railway.app/Bus_Route',{headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }})
      .then(response => {
      setBuses(response.data.bus);
      })
      .catch(error => {
        console.error('Error fetching buses:', error);
      });
  },[])

  return (
    <div className="min-h-screen flex flex-col items-center ">
        <h1 className="text-2xl font-bold text-center text-white mb-6">View Buses</h1>
        <div className='w-full overflow-x-auto'>
        <table className="min-w-full">
          <thead >
            <tr className="bg-lime-600 text-white text-center border border-black">
              <th className='px-4 py-2 border'>Bus ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Total Seats</th>
              <th className="px-4 py-2 border">Type</th>
            </tr>
          </thead>
          <tbody>
            {
                buses.map(b=>(
                    <tr key={buses.bus_id} className="border text-center">
                <td className="px-4 py-2 border">{b.bus_id}</td>
                <td className="px-4 py-2 border">{b.bus_name}</td>
                <td className="px-4 py-2 border">{b.total_seats}</td>
                <td className="px-4 py-2 border">{b.bus_type}</td>
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
