import "./Event.css"
import { useState, useEffect } from 'react';
import OptionsContextMenu from '../OptionsContextMenu/OptionsContextMenu';

function Event(props) {
  const [data, setData] = useState(props.data);
  const [toggleOptionsContextMenu, setToggleOptionsContextMenu] = useState(false);

  // Convert date to Day + Date String
  const date = new Date(data.date);
  const eventDateString = date.toLocaleString("default", {weekday: "short"}) + " " +  date.getDate();
  const isDateToday = date.toDateString() == new Date().toDateString();

  // Options button click
  const toggleOptionsMenu = () => {
    setToggleOptionsContextMenu((prev) => !prev);
  }
 
  // Close options menu
  const closeOptionsMenu = () => {
    setToggleOptionsContextMenu(false);
  }

  // Disable options context menu when click outside button
  useEffect(() => {
    
    // Check if not clicking button
    const clickOutside = (event)  => {
      if (event.target.closest(".options-button") == null && event.target.closest(".edit-context-menu-container") == null) {
        setToggleOptionsContextMenu(false);
      }
    };

    // Click event listener
    document.addEventListener("mousedown", clickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    }
  }, []);

  return (
    <div id={"event_" + data.id} className={(data.important) ? "important event-item-container" : "event-item-container"}>
      {toggleOptionsContextMenu && <OptionsContextMenu id={data.id} onEditClick={props.editEvent} onDeleteClick={props.deleteEvent} closeOptionsMenu={closeOptionsMenu} />}

      <div className="option-button-container">
        <button className="options-button" onClick={toggleOptionsMenu}>Options{(toggleOptionsContextMenu) ? <span className="material-symbols-outlined">keyboard_arrow_up</span> : <span className="material-symbols-outlined">keyboard_arrow_down</span>}</button>
      </div>

      <div className='info-container'>
        <h3 className="title">{data.title}</h3>
        <p className="description">{data.description}</p>
      </div>

      <div className="time-location-container">
        <p className="time"><span className="material-symbols-outlined">schedule</span>{data.startTime + " - " + data.endTime}</p>
        <p className="location"><span className="material-symbols-outlined">location_on</span>{data.location}</p>
      </div>

      <div className='date-container'>
        <p className={(isDateToday) ? "date date-today" : "date"}>{eventDateString}</p>
      </div>
    </div>
  )
}

export default Event