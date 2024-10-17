import React from 'react'
import "./Event.css"
import { useState } from 'react';

function Event(props) {
  const [data, setData] = useState(props.data);

  // Extract day from dates
  const days = ["Sun", "Mon", "Wed", "Thu", "Fri", "Sat"];
  var startDate = new Date(data.startDate);
  var endDate = new Date(data.endDate);

  startDate = days[startDate.getDay()];  
  endDate = days[endDate.getDay()];

  // Extract date from dates
  const startDateDay = startDate + " " +  data.startDate.split("-")[2];
  const endDateDay = endDate + " " +  data.endDate.split("-")[2];

  // // Extract month from dates
  // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // const startDateMonth = months[data.startDate.split("-")[1]];
  // const endDateMonth = months[data.endDate.split("-")[1]];

  return (
    <div id={"event_" + props.id} className={(data.important) ? "event-container important" : "event-container"}>
      <div className='date-container'>
        <p className="date">{(data.startDate == data.endDate || data.allDay) ? startDateDay : startDateDay + "\n - \n" + endDateDay}</p>
      </div>
      
      <div className='info-container'>
        <h3 className="title">{data.title}</h3>
        <p className="description">{data.description}</p>
        <p className="location"><span className="material-symbols-outlined">pin_drop</span>{data.location} | 12:20 - 24:40</p>
      </div>
      
      {/* <div className='time-container'>
        <p className="time">{(!data.allDay) ? data.startTime + " - " + data.endTime : "All Day"}</p>
      </div> */}

      {/* <div className='controls-container'>
        <button className='action-button'><span className="material-symbols-outlined">edit</span>Edit</button>
        <button className='action-button'><span className="material-symbols-outlined">delete</span>Delete</button>
      </div> */}
    </div>
  )
}

export default Event