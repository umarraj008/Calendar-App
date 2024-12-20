import React, { useState } from 'react'
import "./EventsListControls.css"

function EventListControls(props) {
  const [dateSelectorValue, setDateSelectorValue] = useState(props.selectedDate);
  const [searchBar, setSearchBar] = useState("");

  // Update date selector element
  const updateDateSelectorValue = (event) => {
    setDateSelectorValue(event.target.value);
    props.updateSelectedDate(event.target.value);
  }

  // Search events bar
  const searchEvents = (event) => {
    event.preventDefault();
    
    // Pass search bar to callback
    props.searchEvents(searchBar);

    // Clear search bar
    setSearchBar("");
  }

  // Search bar updater
  const updateSearchBar = (event) => {
    setSearchBar(event.target.value);
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

        {(!props.searching) ?
          <>
            <div className="date-select-container">
              <button className="left-button" onClick={decrementSelectedDate}><span className="material-symbols-outlined">chevron_left</span></button>

              <input type="month" id="date-selector" name='date-selector' onChange={updateDateSelectorValue} value={dateSelectorValue}/>
              <button className="right-button" onClick={incrementSelectedDate}><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
            
            <div className="search-events-container">
              <form onSubmit={searchEvents}>
                <input type='search' name="searchBar" onChange={updateSearchBar} placeholder='Search Events...' value={searchBar} />
                <button type='submit'><span className="material-symbols-outlined">search</span></button>
              </form>
            </div>
          
            <button className='add-events-button' onClick={props.addEventButtonClick}><span className="material-symbols-outlined">calendar_add_on</span> Add Event</button>
          </>
          :
          <div className='search-results-container'>
            <h3 className='search-results-text'>Search Results Containing: {props.searchText}</h3>
            <button className="clear-search-button" onClick={props.clearSearch}><span className="material-symbols-outlined">clear</span></button>
          </div>
        }
    </div>
  )
}

export default EventListControls