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
import UpdateUser from './components/UpdateUser';
import VerifyUser from './components/VerifyUser';
import Ticket from './components/Ticket';

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
      <Route path='/update-user' element={<><Navbar/><UpdateUser/></>}/>
      <Route path='/verify-user' element={<><VerifyUser/></>}/>
      <Route path='/get-tickets' element={<><Navbar/><Ticket/></>}/>
      </Routes>
    </Router>
    </ScheduleProvider>
  )
}

export default App
