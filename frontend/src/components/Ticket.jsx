import { use, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Ticket = () => {

    const navigate = useNavigate();
    const [showLoading, setShowLoading] = useState(true);
    const [ticket, setTicket] = useState([]);
    const userInfo = localStorage.getItem("token");
    const [activeTab, setActiveTab] = useState("upcoming");

    useEffect(() => {

        if (!userInfo) {
            navigate("/home");
            return;
        }
        const decoded = jwtDecode(userInfo);
        setShowLoading(true);

        axios.get(`https://bus-reservation-system-in-aspnet-production.up.railway.app/Reservation/Get-Ticket/${decoded.user_id}/${activeTab}`)
            .then(res => {
                setTicket(res.data.ticket)
                setShowLoading(false);
            })
            .catch((err) => {
                setShowLoading(false);
                alert(err.response?.data?.message || "Something went wrong. Please try again.");
            });


    }, [activeTab]);

    if (showLoading) {
        return <Loading />;
    }

    return (
        <div className="w-full h-[80vh] flex justify-center mt-[8vh] ">
            <div className="w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded-2xl">
                <label className="block font-light text-2xl border-b pb-3 mb-2 text-center text-gray-800">
                    Ticket Info
                </label>
                <div className="flex justify-around md:justify-center md:space-x-2 item-center">
                    <button onClick={() => setActiveTab('upcoming')}
                        className={`${activeTab === "upcoming" ? 'bg-lime-700 ' : 'bg-lime-600'} hover:bg-lime-700 text-white p-2 rounded-md cursor-pointer`}>Upcoming</button>
                    <button onClick={() => setActiveTab('past')}
                        className={`${activeTab === "past" ? 'bg-lime-700' : 'bg-lime-600'} hover:bg-lime-700 text-white p-2 rounded-md cursor-pointer`}>Past Tickets</button>
                    <button onClick={() => setActiveTab('cancel')}
                        className={`${activeTab === "cancel" ? 'bg-lime-700' : ' bg-lime-600'} hover:bg-lime-700 text-white p-2 rounded-md cursor-pointer`}>Cancel Tickets</button>
                </div>
                {ticket.length === 0 ? (
                    <p className="text-center text-gray-600">No Ticket found.</p>
                ) : (
                    <div className="text-center space-y-10 max-h-[75vh] overflow-y-auto pt-2 pr-2">
                        {ticket.map((t) => (
                            <div
                                key={t.reservation_id}
                                className="p-5 border border-gray-300 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition"
                            >
                                <p className="text-gray-700">
                                    <span className="font-semibold">Ticket ID:</span> {t.reservation_id}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Name:</span> {t.name}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Route:</span> {t.schedule.routes.from_city} - {t.schedule.routes.to_city}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Departure Time:</span>{" "}
                                    {new Date(t.schedule.departure_time).toLocaleString('en-US', {
                                        day: '2-digit',
                                        month: 'short',  // "Jan", "Feb"... use "long" for full month name
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true     // 12-hour format with AM/PM
                                    })}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Booking Time:</span>{" "}
                                    {new Date(t.reservation_date).toLocaleString('en-US', {
                                        day: '2-digit',
                                        month: 'short',  // "Jan", "Feb"... use "long" for full month name
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true     // 12-hour format with AM/PM
                                    })}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Seat No:</span>{" "}
                                    {t.reservationsDetail.map((s) => s.seat_number).join(", ")}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Total Price:</span> {t.price}
                                </p>

                                <button
                                    className="bg-lime-600 w-full mt-5 py-2.5 rounded-lg text-white cursor-pointer hover:bg-lime-700 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        ))}
                    </div>)}
            </div>
        </div>
    );

}

export default Ticket;