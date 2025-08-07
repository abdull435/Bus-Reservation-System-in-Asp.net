import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, data } from 'react-router-dom';
import { useSchedule } from './ScheduleContext';
import GenderDialog from './GenderDialog';
import Booking from './Booking';


const SeatSelection = () => {
  const navigate = useNavigate();
  const { selectedSchedule, departure, arrival } = useSchedule();

  const [seatColors, setSeatColors] = useState(Array(40).fill('bg-white'));
  const [reservedIndexes, setReservedIndexes] = useState([]);

  const [selectedSeatIndex, setSelectedSeatIndex] = useState(null);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [tempReserv, setTempReserv] = useState([]);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const [userId, setUserID] = useState(decode.user_id);
  const [name, setName] = useState(decode.name);
  const [cinic, setCinic] = useState(decode.cinic);
  const [email, setEmail] = useState(decode.email);
  const [mobile, setMobile] = useState(decode.mobile);
  const [reservBtn, setReservBtn] = useState(false);
  const [bookingDetail, setBookingDetail] = useState(null);

  const [showDialog, setShowDialog] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    if (selectedSchedule) {
      axios.post(`https://bus-reservation-system-in-aspnet-production.up.railway.app/GetSeats?schedule_id=${selectedSchedule.schedule_id}`, null, { withCredentials: true })
        .then(res => {
          if (res.data.success) {
            const newColors = [...seatColors];
            const reserved = [];
            res.data.reservedSeats.forEach(seat => {
              const index = seat.seat_number - 1;
              newColors[index] = seat.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500';
              reserved.push(index);
            });

            setSeatColors(newColors);
            setReservedIndexes(reserved);
            setPrice(selectedSchedule.price);
          }
        })
        .catch(err => console.error('Error fetching reserved seats:', err));
    }
    const leftTemp = [];
    const rightTemp = [];

    for (let i = 0; i < 40; i++) {
      const col = i % 4;
      if (col === 0 || col === 1) leftTemp.push(i);
      if (col === 2 || col === 3) rightTemp.push(i);
    }
    setLeft(leftTemp);
    setRight(rightTemp);

  }, [selectedSchedule]);

  const handleSeatClick = (index) => {
    if (reservedIndexes.includes(index)) return; // Block reserved seats
    setSelectedSeatIndex(index);
    setShowDialog(true);
  };

  useEffect(() => {
    if (showDialog || showBooking) {
      document.body.style.overflow = 'hidden'; // disable scroll
    } else {
      document.body.style.overflow = 'auto'; // re-enable scroll
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showDialog, showBooking]);

  const handleGender = (gender) => {
    setSeatColors((prev) => {
      const updated = [...prev];
      if (gender === 'male') {
        updated[selectedSeatIndex] = 'bg-blue-500'
      }
      else if (gender === 'female') {
        updated[selectedSeatIndex] = 'bg-pink-500'
      }
      else if (gender === 'cancel') {
        updated[selectedSeatIndex] = 'bg-white'
        tempReserv
      }
      return updated;
    });

    if (!tempReserv.includes(selectedSeatIndex)) {
      setTempReserv((prev) => [...prev, selectedSeatIndex]);
      setSelectedSeatIndex(null);
    }
    setShowDialog(false);
  };

  useEffect(() => {
    setTotalPrice(price * tempReserv.length);
  }, [tempReserv, price]);

  const makeReservation = () => {
    if (reservBtn) {
      return;
    }
    setReservBtn(true);
    const reservation = {
      schedule_id: selectedSchedule.schedule_id,
      user_id: userId, name, cinic, email, mobile, reservation_date: new Date(), total_price: totalPrice,
      reservationDetail: tempReserv.map(index => ({
        seat_number: index + 1,
        gender: seatColors[index] === 'bg-blue-500' ? 'male' : 'female'
      }))
    }
    
    axios.post(`https://bus-reservation-system-in-aspnet-production.up.railway.app/Reservation`, reservation, { withCredentials: true })
      .then(res => {
        alert(res.data.reservation_id);
        const ticket = {
          ticketId: res.data.reservation_id,
          departure, arrival, name,  seats: tempReserv.length, totalPrice,
          date: selectedSchedule.date,
          departure_time: selectedSchedule.arrival_time,
          arrival_time: selectedSchedule.departure_time
        }
        alert("a");
        setBookingDetail(ticket);
        setShowBooking(true);
        alert("b");
        setReservBtn(false);
      })
      .catch(err => {
        console.error('Error fetching reserved seats:', err);
        setReservBtn(false);
      }
      );
  }
  if (selectedSchedule === null) {
    navigate('/home');
    return;
  }


  return (
    <div className="flex flex-col w-full  overflow-hidden">
      <div className="flex w-full justify-center mt-[20vh] mb-[10vh]">
        <div className='flex flex-col gap-4 w-[90%] justify-between md:flex-row '>
          <div className='flex flex-col w-90 h-screen md:h-[110vh] bg-gray-200 p-10 rounded-md'>
            <div>
              <h4 className='font-inherit font-light text-xl border-b-1 p-2'>Passenger Info</h4>
            </div>
            <div className='flex flex-col h-[50%] justify-between mt-10 '>
              <input className='bg-white h-10 p-2' onChange={(e) => setName(e.target.value)} type="text" value={name} placeholder='Name' />
              <input className='bg-white h-10 p-2' onChange={(e) => setCinic(e.target.value)} type="text" value={cinic} placeholder='Cinic' />
              <input className='bg-white h-10 p-2' onChange={(e) => setEmail(e.target.value)} type="text" value={email} placeholder='Email' />
              <input className='bg-white h-10 p-2' onChange={(e) => setMobile(e.target.value)} type="text" value={mobile} placeholder='Mobile No' />
            </div>
          </div>
          <div className='flex flex-col w-90 h-screen md:h-[110vh] items-center p-10 bg-gray-200 rounded-md'>
            <h4 className='font-inherit font-light text-xl border-b-1 p-2'>Select Departure Seats</h4>
            <div className='grid grid-cols-2 gap-10 mt-10 '>
              <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                {left.map((index) => (
                  <button
                    key={index}
                    onClick={() => handleSeatClick(index)}
                    className={`w-10 h-10 ${seatColors[index]} text-black rounded-sm ${reservedIndexes.includes(index) ? 'cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    disabled={reservedIndexes.includes(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                {right.map((index) => (
                  <button
                    key={index}
                    onClick={() => handleSeatClick(index)}
                    className={`w-10 h-10 ${seatColors[index]} text-black rounded-sm ${reservedIndexes.includes(index) ? 'cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    disabled={reservedIndexes.includes(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className='flex flex-col w-90 p-10 items-center h-screen md:h-[110vh] bg-gray-200 rounded-md'>
            <div>
              <h4 className='font-light text-xl border-b-1 p-2'>Ticket Info</h4>
            </div>
            <div className='flex flex-col h-[80%] justify-between mt-10 '>
              <div className="flex">
                <label className=" font-normal text-lg w-[50%] p-2">Route:</label>
                <label className="text-lg font-normal w-[50%] p-2">
                  {departure} - {arrival}
                </label>
              </div>

              <div className="flex">
                <label className=" font-normal text-lg w-[50%] p-2">Departure Date:</label>
                <label className=" font-normal text-lg w-[50%] p-2">
                  {new Date(selectedSchedule.date).toLocaleDateString()}
                </label>
              </div>

              <div className="flex">
                <label className="font-normal text-lg w-[50%] p-2">Departure Time:</label>
                <label className="text-lg font-normal w-[50%] p-2">
                  {new Date(selectedSchedule.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </label>
              </div>

              <div className="flex">
                <label className="text-lg font-normal w-[50%] p-2">Seats:</label>
                <label className="text-lg font-normal w-[50%] p-2">
                  {tempReserv.length}
                </label>
              </div>

              <div className="flex border-b-1 pb-5">
                <label className="text-lg font-normal w-[50%] p-2">Ticket Fare:</label>
                <label className="text-lg font-normal w-[50%] p-2">
                  <b>{selectedSchedule.price}</b>/Rs
                </label>
              </div>

              <div className="flex mt-5">
                <label className="text-lg font-normal w-[50%] p-2">Total Fare:</label>
                <label className="text-lg font-normal w-[50%] p-2">
                  {totalPrice}
                </label>
              </div>

              <div>
                <button onClick={() => makeReservation()} className="bg-green-600 hover:bg-green-700 transition duration-300 rounded p-1  text-white cursor-pointer text-lg font-normal color-white w-[100%] mt-10">Confirm</button>
              </div>
            </div>

          </div>
        </div>

        {showDialog && (
          <GenderDialog
            seatNumber={selectedSeatIndex + 1}
            onSelectGender={handleGender}
            onClose={() => setShowDialog(false)}
          />
        )}
      </div>
      {showBooking && (
        <Booking
          bookingDetail={bookingDetail}
          close={() => setShowBooking(false)}
        />
      )}
    </div>
  );
};

export default SeatSelection;
