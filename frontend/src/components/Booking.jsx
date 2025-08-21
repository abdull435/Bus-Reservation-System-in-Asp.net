import { useNavigate } from "react-router-dom";
const Booking = ({ bookingDetail }) => {

    const navigate = useNavigate();

    if (!bookingDetail) return null;

    const goHome = () => {
        navigate("/home");
        return;
    }
    return (
        <div className="flex z-20 items-center justify-center bg-black/90 fixed w-full h-screen ">
            <div className='flex flex-col w-90 min-h-[80%] md:min-h-[50%]  m-10 bg-gray-200 p-5 rounded-md'>
                <div>
                    <h4 className='font-inherit font-light text-xl border-b-1 p-2 mb-5 text-center'>Ticket Info</h4>
                </div>
                <div className="space-y-3">
                    <p>Ticket ID: {bookingDetail.ticketId}</p>
                    <p>Route: {bookingDetail.departure} - {bookingDetail.arrival}</p>
                    <p>Name: {bookingDetail.name}</p>
                    <p>Date: {new Date(bookingDetail.date).toLocaleDateString()}</p>
                    <p>Seats: {bookingDetail.seats.map(s=>s.seat_number).join(", ")}</p>
                    <p>Departure Time:  {new Date(bookingDetail.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                    <p>Arrival Time: {new Date(bookingDetail.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                    <p>Price: {bookingDetail.totalPrice}</p>
                    <button className="bg-lime-600 w-[100%] mt-5 p-3 rounded text-white cursor-pointer hover:bg-lime-700 transition duration-300" 
                    onClick={goHome}>Close</button>
                </div>
            </div>
        </div>
    )
};

export default Booking;