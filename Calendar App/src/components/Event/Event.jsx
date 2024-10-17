import React from 'react'
import "./Event.css"
import { useState } from 'react';

function Event(props) {
  const [data, setData] = useState(props.data);

  // Convert date to Day + Date String
  const days = ["Sun", "Mon", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(data.date);
  const eventDateString = days[date.getDay()] + " " +  date.getDate();

  return (
    <div id={"event_" + data.id} className={(data.important) ? "event-item-container important" : "event-item-container"}>
      <div className='date-container'>
        <p className="date">{eventDateString}</p>
      </div>

      <div className="time-location-container">
        <p className="time"><span className="material-symbols-outlined">schedule</span>{data.startTime + " - " + data.endTime}</p>
        <p className="location"><span className="material-symbols-outlined">location_on</span>{data.location} | 12:20 - 24:40</p>
      </div>
      
      <div className='info-container'>
        <h3 className="title">{data.title}</h3>
        <p className="description">{data.description}</p>
      </div>

      <div className="edit-button-container">
        <button><span className="material-symbols-outlined">edit</span>Edit</button>
      </div>
    </div>
  )
}

export default Event