import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Loading from './Loading';

const CustomerHistory = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [decode, setDecode] = useState(null);
  const userInfo = localStorage.getItem("token");

  useEffect(() => {
    if (!userInfo) {
      navigate("/home");
      return;
    }
    const decoded = jwtDecode(userInfo);
    setDecode(decoded);
    setShowLoading(true);
    axios.get(`https://bus-reservation-system-in-aspnet-production.up.railway.app/Reservation/get-reservations/${decoded.user_id}`, { withCredentials: true })
      .then(res => {
        setReservations(res.data.reservation)
        setShowLoading(false);
      })
      .catch(error => {
        setShowLoading(false);
        alert(error.response?.data?.message || "Something went wrong. Please try again.");
      })

  }, [])

  if (showLoading) {
    return <Loading />;
  }

  return (
      <div className="min-w-full h-screen bg-white mt-[12vh]">
        <div>
          <p className="text-2xl w-full text-black border-b pb-1 pl-5 mb-5">{decode?.name}</p>
          <div className="p-4 bg-gray-200 ">
            {reservations.length == 0 ? (
              <p className="text-center text-gray-600">No Reservation found.</p>
            ) : (<div className="text-center">
              <label className="text-lg font-bold" >Your Reservations</label>
              <div className="w-full overflow-x-auto">
                <table className=" min-w-full rounded border-separate border-spacing-y-2 ">
                  <thead className="bg-white text-left">
                    <tr className='shadow' >
                      <th className="px-4 py-3">Id</th>
                      <th className="px-4 py-3">Route</th>
                      <th className="px-4 py-3">Booking Time</th>
                      <th className="px-4 py-3">Departure Time</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Seats</th>
                      <th className="px-4 py-3">Total</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                      reservations.map(reservation => (<tr className="border border-black text-left bg-white shadow">
                        <td className="px-4 py-2 border-r border-gray-400">{reservation.reservation_id}</td>
                        <td className="px-4 py-2 border-r border-gray-400">
                          {reservation.schedule.routes.from_city} - {reservation.schedule.routes.to_city}</td>
                        <td className="px-4 py-2 border-r border-gray-400">
                          {new Date(reservation.reservation_date).toLocaleString('en-US', {
                            day: '2-digit',
                            month: 'short',  // "Jan", "Feb"... use "long" for full month name
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true     // 12-hour format with AM/PM
                          })}</td>
                        <td className="px-4 py-2 border-r border-gray-400">
                          {new Date(reservation.schedule.departure_time).toLocaleString('en-US', {
                            day: '2-digit',
                            month: 'short',  // "Jan", "Feb"... use "long" for full month name
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true     // 12-hour format with AM/PM
                          })}
                        </td>
                        <td className="px-4 py-2 border-r border-gray-400">{reservation.price}</td>
                        <td className="px-4 py-2 border-r border-gray-400">{reservation.total_seats}</td>
                        <td className="px-4 py-2">{reservation.total_price}</td>
                      </tr>

                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>)}
          </div>
        </div>
      </div>
  );
}

export default CustomerHistory;