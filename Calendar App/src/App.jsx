import React, { useState } from 'react'
import './App.css'
import { EventObject } from "./EventObject";
import EventsListControls from './components/EventsListControls/EventsListControls'
import EventsList from './components/EventsList/EventsList'
import AddEventDialog from './components/AddEventDialog/AddEventDialog';
import SearchResults from './components/SearchResults/SearchResults';
import EditEventDialog from './components/EditEventDialog/EditEventDialog';

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
        "2024-10-22",
        "09:30",
        "04:50",
        false,
      ),
    ]
  );
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0,7));
  const [addEventDialogToggle, setAddEventDialogToggle] = useState(false);
  const [editEventDialogToggle, setEditEventDialogToggle] = useState(false);
  const [eventBeingEdited, setEventBeingEdited] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currnetTheme, setCurrentTheme] = useState(document.getElementsByTagName("html")[0].getAttribute("data-theme"));

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
    setAddEventDialogToggle(true);
  }

  // Delete event
  const deleteEvent = (eventID) => {
    setEvents((prev) => prev.filter(event => event.id != eventID));
  }

  // Edit event
  const editEvent = (data) => {
    setEvents((prev) => prev.filter(event => {
      if (event.id == data.id) {
        event.title = data.title;  
        event.description = data.description;  
        event.location = data.location;  
        event.date = data.date;  
        event.startTime = data.startTime;  
        event.endTime = data.endTime;  
        event.important = data.important;  
      }
      return event;
    }));
  }

  // Open edit event dialog
  const openEditEventDialog = (eventID) => {
    setEditEventDialogToggle(true);
    setEventBeingEdited(events.filter(event => event.id == eventID)[0]);
  }

  // To close add event dialog modal
  const closeAddEventDialog = () => {
    setAddEventDialogToggle(false);
  }

  // To close edit event dialog modal
  const closeEditEventDialog = () => {
    setEditEventDialogToggle(false);
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

  // To change theme
  const toggleTheme = () => {
    let html = document.getElementsByTagName("html")[0];
    
    if (html.getAttribute("data-theme") == "light") {
      html.setAttribute("data-theme", "dark");
      setCurrentTheme("dark");
    } else if (html.getAttribute("data-theme") == "dark") {
      html.setAttribute("data-theme", "light");
      setCurrentTheme("light");
    }
  }

  return (
    <>
      {addEventDialogToggle && <AddEventDialog selectedDate={selectedDate} closeDialog={closeAddEventDialog} errorMessage={errorMessage} addNewEvent={addNewEvent}/> }
      {editEventDialogToggle && <EditEventDialog event={eventBeingEdited} closeDialog={closeEditEventDialog} errorMessage={errorMessage} editEvent={editEvent}/> }
      <div className="title-container">
        <h1 className='title'>Calendar App<span>By Umar Rajput</span></h1>
        <button className="theme-button" onClick={toggleTheme}>{(currnetTheme == "dark") ? 
          <>
            <span className="material-symbols-outlined">toggle_on</span>
            <p>Dark Mode</p> 
          </>
            : 
          <>
            <span className="material-symbols-outlined">toggle_off</span>
            <p>Light Mode</p>
          </>
        }</button>
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
        <SearchResults events={events} searchText={searchText} editEvent={openEditEventDialog} deleteEvent={deleteEvent} />
          :
        <EventsList events={events} selectedDate={selectedDate} editEvent={openEditEventDialog} deleteEvent={deleteEvent} />
      }
    </>
  )
}

export default App
