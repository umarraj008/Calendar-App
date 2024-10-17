import React, { useState } from 'react'
import "./EventsList.css"
import Event from '../Event/Event'
import AddEventDialog from '../AddEventDialog/AddEventDialog';

function EventsList(props) {

  // Sort events by date
  const sortedEvents = props.events.sort((a, b) => {
    let dateA = new Date(a.date + " " + a.startTime);
    let dateB = new Date(b.date + " " + b.startTime);
    
    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    }

    return 0;
  });

  // Months
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Group events by month
  const groupedEvents = Object.groupBy(sortedEvents, ({date}) => {
    let eventDate = new Date(date);
    let year = eventDate.getFullYear();
    let month = months[eventDate.getMonth()];
    return month + " " + year;
  });

  // Events months array
  const groupedEventsKeys = Object.keys(groupedEvents);
  
  // Events grouped by months array
  const groupedEventsValues = Object.values(groupedEvents);

  return (
    <div className='events-list-container'>
      {groupedEventsKeys.map((monthsEvents, monthIndex) => {
        return (
          <>
            <h3 key={monthsEvents} className='month-title'>{monthsEvents}</h3>
            {groupedEventsValues[monthIndex].map((event, eventIndex) => (
              <Event key={event.id} data={event} />            
            ))}
          </>
        )
      })}
    </div>
  )
}

export default EventsList