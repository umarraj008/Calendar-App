import React, { useState } from 'react'
import './App.css'
import EventsListControls from './components/EventsListControls/EventsListControls'
import EventsList from './components/EventsList/EventsList'
import { EventObject } from "./EventObject";
import AddEventDialog from './components/AddEventDialog/AddEventDialog';
import SearchResults from './components/SearchResults/SearchResults';

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
  const [dialogToggle, setDialogToggle] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Update the current selected date
  const updateSelectedDate = (date) => {
    setSelectedDate(date);
  }

  // Ussed to search events
  const searchEvents = (searchText) => {
    setSearching(true);
    setSearchText(searchText);
  }

  // Clear search 
  const clearSearch = () => {
    setSearching(false);
    setSearchText("");
  }

  // Add Events button
  const addEventButtonClick = (event) => {
    setDialogToggle(true);
  }

  // Delete event
  const deleteEvent = (eventID) => {
    setEvents((prev) => prev.filter(event => event.id != eventID));
  }

  // To close add event dialog modal
  const closeDialog = () => {
    setDialogToggle(false);
  }

  // Create a new event object and add to list
  const addNewEvent = (data) => {
    let newEvent = new EventObject(data.title, data.description, data.location, data.date, data.startTime, data.endTime, data.important);
    setEvents((prev) => ([...prev, newEvent]));
  }

  // Error message function
  const errorMessage = (message) => {
    alert(message);
  }

  return (
    <>
      {dialogToggle && <AddEventDialog selectedDate={selectedDate} closeDialog={closeDialog} errorMessage={errorMessage} addNewEvent={addNewEvent}/> }
      <div className="title-container">
        <h1 className='title'>Calendar App<span>By Umar Rajput</span></h1>
      </div>
      <EventsListControls 
        selectedDate={selectedDate} 
        updateSelectedDate={updateSelectedDate} 
        searchEvents={searchEvents} 
        addEventButtonClick={addEventButtonClick}
        searching={searching} 
        searchText={searchText}
        clearSearch={clearSearch}
      />
      {(searching) ? 
        <SearchResults events={events} searchText={searchText} deleteEvent={deleteEvent} />
          :
        <EventsList events={events} selectedDate={selectedDate} deleteEvent={deleteEvent} />
      }
    </>
  )
}

export default App
