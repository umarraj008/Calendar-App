import React from 'react'
import "../EventsList/EventsList.css";
import Event from '../Event/Event';

function SearchResults(props) {

  // Filter events by search text
  const searchFilteredEvents = props.events.filter((event) => 
    String(event.title).toLowerCase() == String(props.searchText).toLowerCase());

  // Sort events by dates
  const sortedEvents = searchFilteredEvents.sort((a, b) => {
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

  return (
    <div className='events-list-container'>
      {groupedEventsKeys.map((monthsEvents, monthIndex) => {
        // Display events in that month
        return (
          <>
            <h3 key={monthsEvents} className='month-title'><span>{monthsEvents}</span></h3>
            {groupedEventsValues[monthIndex].map((event, eventIndex) => {
              eventsItemCount++;
              return (<Event key={event.id} data={event} deleteEvent={props.deleteEvent} />)
            })}
          </>
        )
      })}
      {eventsItemCount <= 0 && <h3 className='no-events-text'>No Events...</h3>}
    </div>
  )
}

export default SearchResults