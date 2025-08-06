import React, { useEffect, useState } from 'react';
import { useSchedule } from './ScheduleContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Schedule = ({ from, to, date }) => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const { setSelectedSchedule, setDeparture, setArrival } = useSchedule();
  setDeparture(from);
  setArrival(to);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!from || !to || !date) {
      navigate("/home");
      return};

    setLoading(true);

    axios.post('https://bus-reservation-system-in-aspnet-production.up.railway.app/GetSchedules', {
      from_city: from,
      to_city: to,
      date,
    }, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          setSchedules(res.data.schedules);
        } else {
          setSchedules([]);
        }
      })
      .catch(err => {
        console.error('Error fetching schedules:', err);
        setSchedules([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [from, to, date]);

  const handleViewSeats = (schedule) => {
    const data = localStorage.getItem("token");
    if (data) {

      setSelectedSchedule(schedule);
      navigate('/schedule');
    }
    else {
      alert("logged in first");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading schedules...</p>;

  return (

    <div className="mt-10 mb-6">
      {schedules.length == 0 ? (
        <p className="text-center text-gray-600">No schedules found for the selected route and date.</p>
      ) : (
        <div>
        <p className="text-2xl  text-black border-b pb-4 mb-4"><span className='text-orange-400'>Select Date:</span> {date}</p>
        <div className="p-4 bg-gray-200 md:overflow-hidden overflow-x-scroll">
          <table className=" min-w-full rounded border-separate border-spacing-y-2 ">
            <thead className="bg-white text-left">
              <tr className='shadow' >
                <th className="px-4 py-3">Route</th>
                <th className="px-4 py-3">Departure Time</th>
                <th className="px-4 py-3">Arrival Time</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody >
              {[...Array(9)].flatMap((_, i) =>
              schedules.map(schedule => (<tr key={schedule.schedule_id} className="border border-black text-left bg-white shadow">
                <td className="px-4 py-2 border-r border-gray-400"><strong>{from}</strong> to <strong>{to}</strong></td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {new Date(schedule.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {new Date(schedule.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {new Date(schedule.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">{schedule.price}</td>
                <td className='px-4 '>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded" onClick={() => handleViewSeats(schedule)}>
                    Book Seat
                  </button>
                </td>
              </tr>

              ))
           ) }
            </tbody>
          </table>
        </div>
        </div>
      )}

    </div>
  );
};

export default Schedule;
