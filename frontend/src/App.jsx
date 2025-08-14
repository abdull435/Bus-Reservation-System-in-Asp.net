import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import SeatSelection from './components/SeatSelection';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScheduleProvider } from './components/ScheduleContext';
import Signup from './components/Signup';
import CustomerHistory from './components/CustomerHistory';

function App() {   
  return (
    <ScheduleProvider>
    <Router>
      <Routes>
      <Route path="/login" element={<Login/>} />
       <Route path="*" element={<><Navbar/><Home/><Footer/></>} />
      <Route path="/schedule" element={<><Navbar/><SeatSelection /><Footer/></>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path='/SeeReservations' element={<><Navbar/><CustomerHistory/></>}/>
      </Routes>
    </Router>
    </ScheduleProvider>
  )
}

export default App
