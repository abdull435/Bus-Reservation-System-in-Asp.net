import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewRoutes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(()=>{
    axios.get('https://bus-reservation-system-in-aspnet-production.up.railway.app/Bus_Route')
      .then(response => {
      setRoutes(response.data.route);
      })
      .catch(error => {
        console.error('Error fetching buses:', error);
      });
  },[])

  return (
    <div className="min-h-screen flex flex-col items-center  ">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">View Routes</h1>
        <div className='w-full overflow-x-auto'>
        <table className="min-w-full bg-white border border-gray-300 rounded shadow">
          <thead className="bg-lime-600 text-white text-center">
            <tr className="">
              <th className='px-4 py-2 border border-black'>Route ID</th>
              <th className="px-4 py-2 border border-black">Departure City</th>
              <th className="px-4 py-2 border border-black">Total Seats</th>
            </tr>
          </thead>
          <tbody>
            {
                routes.map(r=>(
                    <tr key={r.route_id} className="border-t text-center">
                <td className="px-4 py-2 border border-black">{r.route_id}</td>
                <td className="px-4 py-2 border border-black">{r.from_city}</td>
                <td className="px-4 py-2 border border-black">{r.to_city}</td>
              </tr>
                ))
            }
          </tbody>
        </table>
        </div>
      </div>
  );
};

export default ViewRoutes;
