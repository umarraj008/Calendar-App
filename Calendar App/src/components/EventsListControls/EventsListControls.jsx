import React, { useState } from 'react'
import "./EventsListControls.css"

function EventListControls(props) {
  const [dateSelectorValue, setDateSelectorValue] = useState(props.selectedDate);

  // Update date selector element
  const updateDateSelectorValue = (event) => {
    setDateSelectorValue(event.target.value);
    props.updateSelectedDate(event.target.value);
  }

  // Search events bar
  const searchEvents = () => {
    props.searchEvents();
  }

  // When right arrow button is pressed in date selector
  const incrementSelectedDate = () => {
    let date = new Date(dateSelectorValue);
    date.setMonth(date.getMonth() + 1);
    updateDateSelectorValue({target: {value: date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2,"0")}});
  }

  // When left arrow button is pressed in date selector
  const decrementSelectedDate = () => {
    let date = new Date(dateSelectorValue);
    date.setMonth(date.getMonth() - 1);
    updateDateSelectorValue({target: {value: date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2,"0")}});
  }
  
  return (
    <div className='events-list-controls-container'>
        <h2 className='title'>Events</h2>

        <div className="date-select-container">
          <button onClick={decrementSelectedDate}><span className="material-symbols-outlined">chevron_left</span></button>

          <input type="month" id="date-selector" name='date-selector' onChange={updateDateSelectorValue} value={dateSelectorValue}/>
          <button onClick={incrementSelectedDate}><span className="material-symbols-outlined">chevron_right</span></button>
        </div>
        
        <div className="search-events-container">
          <form onSubmit={searchEvents}>
            <input type='search' placeholder='Search Events...'></input>
            <button type='submit'><span className="material-symbols-outlined">search</span></button>
          </form>
        </div>
        
        <button className='add-events-button' onClick={props.addEventButtonClick}><span className="material-symbols-outlined">calendar_add_on</span> Add Event</button>
    </div>
  )
}

export default EventListControls