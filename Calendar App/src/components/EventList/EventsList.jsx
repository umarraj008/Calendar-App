import React, { useState } from 'react'
import "./EventList.css"
import Event from '../Event/Event'
import AddEventDialog from '../AddEventDialog/AddEventDialog';

const EventData = class {
  constructor(
    id, title, description, location, 
    startDate, endDate, startTime, endTime, 
    allDay, color, important) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.location = location;
      this.startDate = startDate;
      this.endDate = endDate;
      this.startTime = startTime;
      this.endTime = endTime;
      this.allDay = allDay;
      this.color = color;
      this.important = important;
  }
}

function EventsList() {
  const [events, setEvents] = useState([
    new EventData("0", "Test Event", "Description of the event")
  ]);

  // Event functions
  const addEvent = (title, description, location) => {
    const newEvent = new EventData("0", title, description, location);

    setEvents((prev) => ([...prev, newEvent]));
  }

  // open dialog funciton
  const openDialog = () => {
    document.getElementById("addEventsDialog").showModal();
  }

  return (
    <div className='container'>
      <div className='title-and-button-container'>
        <h2>Events</h2>
        <button onClick={openDialog}>Add Event</button>
      </div>
      <AddEventDialog addEvent={addEvent}/>
      <div className='events-container'>
        {events.map((event, index) => (
          <Event key={event.id} data={events[index]} />
        ))}
      </div>
    </div>
  )
}

export default EventsList