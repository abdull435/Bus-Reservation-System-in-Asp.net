import { createContext, useContext, useState } from 'react';

// Create context
export const ScheduleContext = createContext();

// Create provider
export const ScheduleProvider = ({ children }) => {
  const [departure, setDeparture]= useState(null);
  const [arrival, setArrival]= useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  return (
    <ScheduleContext.Provider value={{ selectedSchedule, setSelectedSchedule, departure, setDeparture, arrival, setArrival }}>
      {children}
    </ScheduleContext.Provider>
  );
};

// Custom hook for convenience
export const useSchedule = () => useContext(ScheduleContext);
