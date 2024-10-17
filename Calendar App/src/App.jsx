import React, { useState } from 'react'
import './App.css'
import EventsListControls from './components/EventsListControls/EventsListControls'
import EventsList from './components/EventsList/EventsList'
import { EventObject } from "./EventObject";

function App() {
  const [events, setEvents] = useState(
    [
      new EventObject(
        "Title",
        "Descriptiona aaaaaaaaaa aaaaaaa aaaaaaaaaaa aaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaa aaaaa aaaaa aaaaaa aaaaaaaaaaaa aaaaaa aaaaaa aaaaaaaaa aaaaa aaaaaaaaaaaa aaaa aaaaaa aaaaaaa aaaaaaa aaaaaaaa aaaaaaa aaaa aaaaaaaa aaaa aaaaaaaaa aaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaaaaaaa aaaaaa aaa aaaaa aaaaaaa aaaaa aaaaaaaa aaaaa aaaaaaaa aaaaa aaaaa aaaaaaaa aaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaa aaaaaa aaaaaa aaaaaa aaaaaaa aaaaaaaaa aaaaaaaa aaaaaaa aaaaaa aaaaaaa aaaaa aaaa",
        "Online",
        "2024-06-24",
        "14:30",
        "15:00",
        false,
      ),
      new EventObject(
        "Title",
        "Description",
        "Birmingham",
        "2024-06-24",
        "13:25",
        "14:00",
        false,
      ),
      new EventObject(
        "Title",
        "Description",
        "London",
        "2024-07-11",
        "hh:mm",
        "hh:mm",
        true,
      ),
      new EventObject(
        "Title",
        "Description",
        "London",
        "2024-08-22",
        "09:30",
        "04:50",
        false,
      ),
    ]
  );

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0,7));

  const updateSelectedDate = (date) => {
    setSelectedDate(date);
  }

  const searchEvents = () => {

  }

  const addEvent = (event) => {
    setEvents((prev) => ([...prev, event]));
  }

  return (
    <>
      <div className="title-container">
        <h1 className='title'>Calendar App</h1>
      </div>
      <EventsListControls 
        selectedDate={selectedDate} 
        updateSelectedDate={updateSelectedDate} 
        searchEvents={searchEvents} 
        addEvent={addEvent} 
      />
      <EventsList events={events} selectedDate={selectedDate} />
    </>
  )
}

export default App
