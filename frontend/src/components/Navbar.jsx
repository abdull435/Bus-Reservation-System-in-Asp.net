import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // move here
    if (token) {
      try {
        setIsLoggedin(true);
      } catch (err) {
        setIsLoggedin(false);
      }
    } else {
      setIsLoggedin(false);
    }

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedin(false);
    setShowSetting(false);
    navigate('/home');
  };

  return (
    <div className="flex justify-end">
      <nav className="bg-black/80 md:bg-black/60 shadow-md fixed top-0 w-full min-h-[8-vh] md:min-h-[8-vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 text-white">
            <img className=" w-15  h-auto" src="./Images/bus-logo.png" />
            <div className="hidden md:block space-x-6">
              <Link to="/home" className="hover:text-green-500 transition-all durantion-300">Home</Link>
              <Link to="" className="hover:text-green-500 transition-all durantion-300">Terminal</Link>
              <Link to="" className="hover:text-green-500 transition-all durantion-300">Services</Link>
              <Link to="" className="hover:text-green-500 transition-all durantion-300">About Us</Link>
            </div>

            <div className="md:hidden">
              <img src={mobileNav?'./Images/delete.png':'./Images/stack.png'} onClick={()=>setMobileNav(!mobileNav)} 
                className="w-[35px] h-[35px]"/>
            </div>

            <div className="hidden md:block">
              {isLoggedin ?
                (<div className="">
                  <img src={showSetting?'./Images/delete.png':'./Images/stack.png'} onClick={() => setShowSetting(!showSetting)}
                    className="w-[40px] h-[40px] cursor-pointer"
                  />
                </div>)
                :
                <Link to="/login"
                  className="bg-lime-600 text-white font-semibold px-4 py-2 rounded transition duration-300 hover:bg-lime-700"
                >Login</Link>
              }
            </div>
          </div>
        </div>
        {mobileNav && (<div className="flex md:hidden text-white flex-col text-center space-y-2 ">
          <Link to="/home" className="hover:text-green-500 transition-all durantion-300 p-1 border-b">Home</Link>
          <Link to="/terminals" className="hover:text-green-500 transition-all durantion-300 p-1 border-b">Terminal</Link>
          <Link to="/services" className="hover:text-green-500 transition-all durantion-300 p-1 border-b">Services</Link>
          <Link to="/about" className="hover:text-green-500 transition-all durantion-300 p-1 border-b">About Us</Link>
          {isLoggedin ?
            <div className="flex flex-col">
              <Link to="/get-tickets" onClick={() => setMobileNav(!mobileNav)}
                className="hover:text-green-500 transition-all durantion-300 p-1 border-b"
              >See Tickets</Link>
              <Link to="/update-user" onClick={() => setMobileNav(!mobileNav)}
                className="hover:text-green-500 transition-all durantion-300 p-1 border-b"
              >Update User</Link>
              <button onClick={() => handleLogout()}
                className="hover:text-green-500 transition-all durantion-300 p-1 border-b"
              >Logout</button>
            </div>
            :
            <Link to="/login"
              className="hover:text-green-500 transition-all durantion-300 p-1 border-b"
            >Login</Link>}
        </div>)}
      </nav>

      {showSetting &&
        <div className="hidden md:flex fixed  flex-col text-center w-[15%] h-[30vh] rounded bg-black/60 text-white mt-[10vh] mr-[10vh] ">
          <Link onClick={() => setShowSetting(false)} to="/get-tickets" className="border-b p-2 hover:bg-lime-700 transition duration-300">See Tickets</Link>
          <Link onClick={() => setShowSetting(false)} to="/update-user" className="border-b p-2 hover:bg-lime-700 transition duration-300">Account Setting</Link>
          <button onClick={()=>handleLogout()} className="border-b p-2 hover:bg-lime-700 transition duration-300 cursor-pointer">Logout</button>
        </div>
      }
    </div>
  );
}
