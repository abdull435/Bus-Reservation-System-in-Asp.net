import { useEffect, useState } from "react";
import axios from "axios";

const SeeAllSchedules = ({ from, to, date, updateForm }) => {

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!from || !to || !date) return;

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

  const handleUpdate = (schedule) => {
    console.log(schedule.bus_id)
    updateForm(schedule)
  }


  if (loading) return <p className="text-center mt-4">Loading schedules...</p>;

  return (
    <div className="mt-6">
      {schedules.length === 0 ? (
        <p className="text-center text-gray-600">No schedules found for the selected route and date.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full  border border-gray-300 rounded shadow">
            <thead className="bg-lime-600 text-white text-left">
              <tr className="">
                <th className="px-4 py-2">Route</th>
                <th className="px-4 py-2">Departure</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.schedule_id} className="border-t">
                  <td className="px-4 py-2">{from} to {to}</td>
                  <td className="px-4 py-2">
                    {schedule.departure_time
                      ? new Date(`1970-01-01T${schedule.departure_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                      : ""}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(schedule.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">Rs. {schedule.price}</td>
                  <td className="px-4 py-2">
                    <button className="bg-lime-600 hover:bg-lime-700 text-white px-3 py-1 rounded" onClick={() => handleUpdate(schedule)}>
                      Edit Schedule
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );


};

export default SeeAllSchedules;