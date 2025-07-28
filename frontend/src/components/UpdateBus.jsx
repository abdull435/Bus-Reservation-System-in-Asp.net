import {useState, useEffect, React} from "react";
import axios from "axios";

const UpdateBus = () => {

    const [busId, setBusId] = useState('');
    const [busName, setBusName] = useState('');
    const [totalSeats, setTotalSeats] = useState('');
    const [busType, setBusType] = useState('');
    const [buses, setBuses]= useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5212/Bus_Route')
      .then(response => {
        setBuses(response.data.bus);
      })
      .catch(error => {
        console.error('Error fetching buses:', error);
      });
    },[])

    useEffect(()=>{
        var bus=buses.find(m=> m.bus_id===Number(busId));
        if(bus){
        setBusName(bus.bus_name);
        setTotalSeats(bus.total_seats);
        setBusType(bus.bus_type);}
    }),[busId]

    return(
        <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 mt-[10vh]">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Update Bus</h1>
        <form className="space-y-4">
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Bus</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md"  value={busId} onChange={(e)=>setBusId(e.target.value)}>
            <option disabled value="">Select Bus</option>
            {
                buses.map((b)=>
                    <option value={b.bus_id}>{b.bus_name}</option>
                )
            }
            </select>
        </div>

        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Bus Name</label>
            <input
              type="text"
              value={busName}
              onChange={(e) => setBusName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Total Seats</label>
            <input
              type="number"
              max={40}
              value={totalSeats}
              onChange={(e) => setTotalSeats(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Bus Type</label>
            <input
              type="text"
              value={busType}
              onChange={(e) => setBusType(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        <button
            type='button'
            // onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
          >
            Delete Bus
          </button>
        </form>
        </div>
        </div>
    );
};

export default UpdateBus;