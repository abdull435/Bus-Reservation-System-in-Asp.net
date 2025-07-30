import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewSchedules = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5212/Schedule/get-schedules')
      .then(response => {
      setSchedules(response.data.schedules);
      })
      .catch(error => {
        console.error('Error fetching buses:', error);
      });
  },[])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">View schedules</h1>
        <div className='w-full overflow-x-auto'>
        <table className="min-w-full bg-white border border-gray-300 rounded shadow">
          <thead className="bg-blue-600 text-white text-center">
            <tr className="">
              <th className='px-4 py-2'>Schedule Id</th>
              <th className='px-4 py-2'>Bus Id</th>
              <th className='px-4 py-2'>Route Id</th>
              <th className='px-4 py-2'>Departure Time</th>
              <th className='px-4 py-2'>Arrival Times</th>
              <th className='px-4 py-2'>Date</th>
              <th className='px-4 py-2'>Price</th>
            </tr>
          </thead>
          <tbody>
            {
                schedules.map(s=>(
                    <tr key={s.schedule_id} className="border-t text-center">
                <td className="px-4 py-2">{s.schedule_id}</td>
                <td className="px-4 py-2">{s.bus_id}</td>
                <td className="px-4 py-2">{s.route_id}</td>
                <td className="px-4 py-2">{new Date(s.departure_time).toLocaleTimeString()}</td>
                <td className="px-4 py-2">{new Date(s.arrival_time).toLocaleTimeString()}</td>
                <td className="px-4 py-2">{new Date(s.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{s.price}</td>
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
