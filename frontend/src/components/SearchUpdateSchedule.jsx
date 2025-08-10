import { useEffect, useState } from "react";
import axios from "axios";
import UpdateSchedule from "./UpdateSchedule";
import SeeAllSchedules from "./SeeAllSchedules";



const SearchUpdateSchedule = () => {

    const [cities, setCities] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [showSchedules, setShowSchedules] = useState(false);

    const [selectedSchedules, setSelectedSchedule] = useState([]);
    const [showUpdateSchedule, setShowUpdateSchedule] = useState(false);
    

    useEffect(() => {
    
    axios.get('https://bus-reservation-system-in-aspnet-production.up.railway.app/get-cities')
      .then(res => {
        if (res.data.success) {
          setCities(res.data.routes);
        }
      })
      .catch(err => console.error('Error fetching cities:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from && to && date) {
      setShowSchedules(true);
    } else {
      alert("Please fill all fields.");
    }
  };

    return (
        <>
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full rounded-xl text-white shadow-md p-6 mt-[10vh]">
                <h1 className="text-2xl font-bold text-center mb-6">Update Schedule</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block  text-sm font-bold mb-2">Travel From</label>
                        <input
                            list="fromOptions"
                            name="from" required
                            onChange={(e) => setFrom(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
                        />
                        <datalist id="fromOptions">
                            {cities.map((city, index) => (
                                <option key={index} value={city} />
                            ))}
                        </datalist>
                    </div>

                    <div>
                        <label className="block  text-sm font-bold mb-2">
                            Travel To
                        </label>
                        <input list="toOptions" name="to" required
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
                        />
                        <datalist id="toOptions">
                            {cities.map((city, index) => (
                                <option key={index} value={city} />
                            ))}
                        </datalist>
                    </div>

                    <div>
                        <label className="block  text-sm font-bold mb-2">
                            Departure Date
                        </label>
                        <input type="date" id="date" name="date" required
                            onChange={(e) => setDate(e.target.value)}
                            // min={today}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
                    >
                        Find Schedule
                    </button>
                </form>
            </div>
        </div>

        {showSchedules && (
        <div className="w-full max-w-2xl mt-8 px-4 item-center justify-center flex flex-col">
          <SeeAllSchedules from={from} to={to} date={date} updateForm={(schedule)=>{setSelectedSchedule(schedule)
            setShowUpdateSchedule(true);
            setShowSchedules(false);
          }} />
        </div>
      )}

      {showUpdateSchedule &&
      (<UpdateSchedule selectedSchedule={selectedSchedules} />)

    }

      </>
    );
}
export default SearchUpdateSchedule;