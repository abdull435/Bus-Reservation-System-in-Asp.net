import React, { useEffect, useState } from 'react';
import { useSchedule } from './ScheduleContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Schedule = ({ from, to, date }) => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const { setSelectedSchedule, setDeparture, setArrival } = useSchedule();
  setDeparture(from);
  setArrival(to);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!from || !to || !date) return;

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
    

    axios.get('https://bus-reservation-system-in-aspnet-production.up.railway.app', { withCredentials: true })
      .then(res => {
        if(res.data.loggedIn){
          setSelectedSchedule(schedule);
          navigate('/schedule');
        }
    else{
      alert("logged in first");
    }
      });
  };

  if (loading) return <p className="text-center mt-4">Loading schedules...</p>;

  return (
    <div className="mt-6">
      {schedules.length === 0 ? (
        <p className="text-center text-gray-600">No schedules found for the selected route and date.</p>
      ) : (
        <div className="space-y-4">
          {schedules.map(schedule => (
            <div key={schedule.schedule_id} className="border p-4 rounded shadow">
              <p><strong>Bus ID:</strong> {schedule.schedule_id}</p>
              <p><strong>Departure:</strong> {new Date(schedule.departure_time).toLocaleTimeString()}</p>
              <p><strong>Arrival:</strong> {new Date(schedule.arrival_time).toLocaleTimeString()}</p>
              <p><strong>Date:</strong> {new Date(schedule.date).toLocaleDateString()}</p>
              <p><strong>Price:</strong> {schedule.price}</p>
              {/* You can add a button here to view seats */}
              <button onClick={() => handleViewSeats(schedule)} className="mt-10 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              >View Seats</button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Schedule;