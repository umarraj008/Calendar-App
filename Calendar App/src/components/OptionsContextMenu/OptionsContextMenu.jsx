import React from 'react'
import "./OptionsContextMenu.css"

function OptionsContextMenu(props) {
  
  // Edit event button click
  const editEvent = () => {
    // Close context menu
    props.closeOptionsMenu();
    
    // Delete event callback
    props.onEditClick(props.id);
  }

  // Delete button click
  const deleteEvent = () => {
    // Close context menu
    props.closeOptionsMenu();
    
    // Delete event callback
    props.onDeleteClick(props.id);
  }

  return (
    <div className='edit-context-menu-container'>
      <button className='edit-event-button' onClick={editEvent}><span className="material-symbols-outlined">edit_calendar</span>Edit Event</button>
      <button className='delete-event-button' onClick={deleteEvent}><span className="material-symbols-outlined">delete</span>Delete Event</button>
    </div>
  )
}

export default OptionsContextMenu