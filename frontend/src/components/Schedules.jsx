import React, { useEffect, useState } from 'react';
import { useSchedule } from './ScheduleContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Schedule = ({ from, to, date }) => {
  const navigate = useNavigate();
  const { setSelectedSchedule, setDeparture, setArrival } = useSchedule();
  setDeparture(from);
  setArrival(to);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!from || !to || !date) {
      navigate("/home");
      return
    };

    setLoading(true);

    axios.post('http://localhost:5212/GetSchedules', {
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
          <p className="text-2xl  text-black border-b pb-4 mb-4"><span className='text-orange-400'>Selected Date:</span> {date}</p>
          <div className="hidden md:block p-4 bg-gray-200 md:overflow-hidden overflow-x-scroll">
            <table className=" min-w-full rounded border-separate border-spacing-y-2 ">
              <thead className="bg-white text-left">
                <tr className='shadow' >
                  <th className="px-4 py-3">Route</th>
                  <th className="px-4 py-3">Departure Time</th>
                  <th className="px-4 py-3">Bus Type</th>
                  <th className="px-4 py-3">Available Seats</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody >
                {
                  schedules.map(schedule => (<tr key={schedule.schedule_id} className="border border-black text-left bg-white shadow">
                   {/* { alert(JSON.stringify(schedule))} */}
                    <td className="px-4 py-2 border-r border-gray-400"><strong>{from}</strong> to <strong>{to}</strong></td>
                    <td className="px-4 py-2 border-r border-gray-400">
                      {new Date(schedule.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </td>
                    <td className="px-4 py-2 border-r border-gray-400">{schedule.bus.bus_type}</td>
                    <td className="px-4 py-2 border-r border-gray-400">{schedule.available_seats}</td>
                    <td className="px-4 py-2 border-r border-gray-400">{schedule.price}</td>
                    <td className='px-4 '>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded" onClick={() => handleViewSeats(schedule)}>
                        Book Seat
                      </button>
                    </td>
                  </tr>

                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="block p-2 md:hidden space-y-4">
            {schedules.map(schedule => (
              <div key={schedule.schedule_id} className="bg-white p-4 rounded shadow border">
                <p><strong>Route:</strong> {from} to {to}</p>
                <p><strong>Departure:</strong> {new Date(schedule.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                <p><strong>Bus Type:</strong>{schedule.bus.bus_type}</p>
                <p><strong>Available Seats:</strong>{schedule.available_seats}</p>
                <p><strong>Price:</strong> {schedule.price}</p>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 mt-2 rounded" onClick={() => handleViewSeats(schedule)}>
                        Book Seat
                      </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Schedule;
