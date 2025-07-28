import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import SeatSelection from './components/SeatSelection';
import SearchUpdateSchedule from './components/SearchUpdateSchedule';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScheduleProvider } from './components/ScheduleContext';
import Signup from './components/Signup';

function App() {   
  return (
    <ScheduleProvider>
    <Router>
      <Routes>
      <Route path="/login" element={<Login/>} />
       <Route path="*" element={<><Navbar/><Home/></>} />
      {/* <Route path="/a " element={<><Navbar/><Home/></>} /> */}
      <Route path="/schedule" element={<><Navbar/><SeatSelection /></>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path='/we' element={<SearchUpdateSchedule/>}/>
      </Routes>
    </Router>
    </ScheduleProvider>
  )
}

export default App
