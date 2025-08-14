import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Loading from './Loading';

const CustomerHistory = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const userInfo = localStorage.getItem("token");
  const decode = jwtDecode(userInfo);


  useEffect(() => {
    setShowLoading(true);
    const id = decode.user_id;
    axios.get(`https://bus-reservation-system-in-aspnet-production.up.railway.app/Reservation/get-reservations/${id}`, { withCredentials: true })
      .then(res => {
        setReservations(res.data.reservation)
        setShowLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
  }, [])

  if (showLoading) {
  return <Loading />;
}

  return (
    <div>
    <div className="min-w-full h-screen bg-white mt-[12vh]">
      <div>
        <p className="text-2xl w-full text-black border-b pb-1 pl-5 mb-5">{decode.name}</p>
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
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Departure Time</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Seats</th>
                </tr>
              </thead>
              <tbody >
                {
                  reservations.map(reservation => (<tr className="border border-black text-left bg-white shadow">
                    <td className="px-4 py-2 border-r border-gray-400">{reservation.reservation_id}</td>
                    <td className="px-4 py-2 border-r border-gray-400">
                      {reservation.schedule.routes.from_city} - {reservation.schedule.routes.to_city}</td>
                    <td className="px-4 py-2 border-r border-gray-400">
                      {new Date(reservation.reservation_date).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short', // or 'long'
                        year: 'numeric'
                      })}</td>
                    <td className="px-4 py-2 border-r border-gray-400">
                      {new Date(reservation.schedule.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </td>
                    <td className="px-4 py-2 border-r border-gray-400">{reservation.total_price}</td>
                    <td className="px-4 py-2 ">{reservation.reservationsDetail.length}</td>
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
     {showLoading &&(
            <Loading/>
          )}
    </div>
  );
}

export default CustomerHistory;