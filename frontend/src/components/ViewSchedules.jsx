import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewSchedules = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(()=>{
    axios.get('https://bus-reservation-system-in-aspnet-production.up.railway.app/Schedule/get-schedules',{headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }})
      .then(response => {
      setSchedules(response.data.schedules);
      })
      .catch(error => {
        console.error('Error fetching buses:', error);
      });
  },[])

  return (
    <div className="min-h-screen flex flex-col items-center ">
        <h1 className="text-2xl font-bold text-center text-white mb-6">View schedules</h1>
        <div className='w-full overflow-x-auto'>
        <table className="min-w-full border border-gray-300 rounded shadow">
          <thead className="bg-lime-600 text-white text-center">
            <tr className="">
              <th className='px-4 py-2 border'>Schedule Id</th>
              <th className='px-4 py-2 border'>Bus Id</th>
              <th className='px-4 py-2 border'>Route Id</th>
              <th className='px-4 py-2 border'>Departure Time</th>
              <th className='px-4 py-2 border'>Arrival Times</th>
              <th className='px-4 py-2 border'>Date</th>
              <th className='px-4 py-2 border'>Price</th>
            </tr>
          </thead>
          <tbody>
            {
                schedules.map(s=>(
                    <tr key={s.schedule_id} className="border-t text-center">
                <td className="px-4 py-2 border ">{s.schedule_id}</td>
                <td className="px-4 py-2 border ">{s.bus_id}</td>
                <td className="px-4 py-2 border ">{s.route_id}</td>
                <td className="px-4 py-2 border ">{new Date(s.departure_time).toLocaleTimeString()}</td>
                <td className="px-4 py-2 border ">{new Date(s.arrival_time).toLocaleTimeString()}</td>
                <td className="px-4 py-2 border ">{new Date(s.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 border ">{s.price}</td>
              </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSchedules;
