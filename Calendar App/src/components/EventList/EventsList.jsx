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
    new EventData(
      "event_0",
      "Title",
      "Descriptiona aaaaaaaaaa aaaaaaa aaaaaaaaaaa aaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaa aaaaa aaaaa aaaaaa aaaaaaaaaaaa aaaaaa aaaaaa aaaaaaaaa aaaaa aaaaaaaaaaaa aaaa aaaaaa aaaaaaa aaaaaaa aaaaaaaa aaaaaaa aaaa aaaaaaaa aaaa aaaaaaaaa aaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaaaaaaa aaaaaa aaa aaaaa aaaaaaa aaaaa aaaaaaaa aaaaa aaaaaaaa aaaaa aaaaa aaaaaaaa aaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaa aaaaaa aaaaaa aaaaaa aaaaaaa aaaaaaaaa aaaaaaaa aaaaaaa aaaaaa aaaaaaa aaaaa aaaa",
      "Location",
      "2024-06-24",
      "2024-06-24",
      "14:30",
      "15:00",
      false,
      "white",
      false
    ),
    new EventData(
      "event_1",
      "Title",
      "Description",
      "Location",
      "2024-06-24",
      "2024-06-27",
      "13:25",
      "18:45",
      false,
      "white",
      true
    ),
    new EventData(
      "event_2",
      "Title",
      "Description",
      "Location",
      "2024-07-11",
      "2024-07-11",
      "hh:mm",
      "hh:mm",
      true,
      "white",
      false
    ),
  ]);

  // Event functions
  const addEvent = (title, description, location) => {
    const newEvent = new EventData("event_" + events.length, title, description, location, "2024-01-01", "2024-02-02", "00:00", "01:10", false, "white", false);

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
        <div>
          <h2>June 2024</h2>
          <hr />
        </div>
        {events.map((event, index) => (
          <Event key={event.id} data={events[index]} />
        ))}
      </div>
    </div>
  )
}

export default EventsList