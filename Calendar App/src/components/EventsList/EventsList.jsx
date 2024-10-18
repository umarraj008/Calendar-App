import React, { useState } from 'react'
import "./EventsList.css"
import Event from '../Event/Event'

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

  // Months array
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

  // Counts how many events are currently displayed
  var eventsItemCount = 0;

  // Current selected date
  const selectedDate = new Date(props.selectedDate);

  // Selected date to month string
  const selectedDateString = selectedDate.toLocaleDateString("default", {month: 'long', year: "numeric"});

  // Dates compare function
  const compareDatesByMonthYear = (date1, date2) => {
    let year1 = date1.getFullYear();
    let month1 = date1.getMonth();
    let year2 = date2.getFullYear();
    let month2 = date2.getMonth();

    if (year1 < year2 || (year1 === year2 && month1 < month2)) {
      return true;
    }
    return false;
  }

  return (
    <div className='events-list-container'>
      {groupedEventsKeys.map((monthsEvents, monthIndex) => {
        
        // Filter months for selected date 
        let monthsEventDate = new Date(monthsEvents);
        if (compareDatesByMonthYear(monthsEventDate, selectedDate)) return;
        
        // Display events in that month
        return (
          <>
            <h3 key={monthsEvents} className='month-title'><span>{monthsEvents}</span></h3>
            {groupedEventsValues[monthIndex].map((event, eventIndex) => {
              eventsItemCount++;
              return (<Event key={event.id} data={event} editEvent={props.editEvent} deleteEvent={props.deleteEvent} />)
            })}
          </>
        )
      })}
      {eventsItemCount <= 0 && <h3 className='no-events-text'>{"No Events in " + selectedDateString + " or after..."}</h3>}
    </div>
  )
}

export default EventsList