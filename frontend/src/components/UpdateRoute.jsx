import { useState, useEffect } from "react";
import axios from "axios";

const UpdateRoute = () => {
    const [routeId, setRouteId] = useState('');
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5212/Bus_Route')
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
        }),[routeId]


    return(
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 mt-[10vh]">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Update Route</h1>
        <form className="space-y-4">
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Route</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md"  value={routeId} onChange={(e)=>setRouteId(e.target.value)}>
            <option disabled value="">Select Route</option>
            {
                routes.map((r)=>
                    <option value={r.route_id}>{r.from_city} - {r.to_city}</option>
                )
            }
            </select>
        </div>

        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">From City</label>
            <input
              type="text"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">To City</label>
            <input
              type="text"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

        <button
            type='button'
            // onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
          >
            Update Route
          </button>
        </form>
        </div>
        </div>
    );


};

export default UpdateRoute;