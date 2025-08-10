import { useState, useEffect } from "react";
import axios from "axios";

const UpdateRoute = () => {
    const [routeId, setRouteId] = useState('');
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        axios.get('https://bus-reservation-system-in-aspnet-production.up.railway.app/Bus_Route')
            .then(response => {
                setRoutes(response.data.route);
            })
            .catch(error => {
                console.error('Error fetching buses:', error);
            });
    }, [])

    useEffect(()=>{
            var route=routes.find(r=> r.route_id===Number(routeId));
            if(route){
            setFromCity(route.from_city);
            setToCity(route.to_city);}
        },[routeId])


    const handleSubmit = (e) => {
    e.preventDefault();

    if (!fromCity || !toCity) {
      alert('Please fill out both cities');
      return;
    }

    if (fromCity === toCity) {
      alert('Departure and Arrival both are not same')
      return
    }

    axios
      .put(`https://bus-reservation-system-in-aspnet-production.up.railway.app/Route/update-route/${routeId}`, { from_city: fromCity, to_city: toCity }, { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          alert(response.data.message);
        } else {
          alert('Error adding route');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          alert('This route already exists.');
        } else {
          console.error('Error adding route:', error);
          alert('Failed to add route');
        }
      });
  };

  return(
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full rounded-xl shadow-md p-6 mt-[10vh]">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Update Route</h1>
        <form className="space-y-4">
        <div>
            <label className="block  text-sm font-bold mb-2">Select Route</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"  value={routeId} onChange={(e)=>setRouteId(e.target.value)}>
            <option disabled className="bg-black">Select Route</option>
            {
                routes.map((r)=>
                    <option className="bg-black" value={r.route_id}>{r.from_city} - {r.to_city}</option>
                )
            }
            </select>
        </div>

        <div>
            <label className="block text-sm font-bold mb-2">From City</label>
            <input
              type="text"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
            />
          </div>

          <div>
            <label className="block  text-sm font-bold mb-2">To City</label>
            <input
              type="text"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
            />
          </div>

        <button
            type='button'
            onClick={handleSubmit}
            className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
          >
            Update Route
          </button>
        </form>
        </div>
        </div>
    );
};

export default UpdateRoute;