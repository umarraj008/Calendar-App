import React, { useState } from 'react'
import "./AddEventDialog.css"

function AddEventDialog(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const closeDialog = () => {
    // close dialog
    document.getElementById("addEventsDialog").close();

    // Clear all form input
    setTitle("");
    setDescription("");
    setLocation("");
  }

  // Form input update functions
  const updateTitle = (event) => { setTitle((prev) => event.target.value); }
  const updateLocation = (event) => { setLocation((prev) => event.target.value); }
  const updateDescription = (event) => { setDescription((prev) => event.target.value); }

  // submit form data function 
  const submitData = (event) => {
    event.preventDefault();
    props.addEvent(
      event.target.title.value,
      event.target.description.value,
      event.target.location.value
    );

    closeDialog();
  }

  return (
    <dialog id="addEventsDialog">
        <h2>Add New Event</h2>
        <form onSubmit={submitData}>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" onChange={updateTitle} value={title} />
          
          <label htmlFor="location">Location</label>
          <input id="location" name="location" type="text" onChange={updateLocation} value={location} />
          
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" type="text" onChange={updateDescription} value={description} />
          
          <button type="submit">Add</button>
          <button onClick={closeDialog}>Cancel</button>
        </form>
      </dialog>
  )
}

export default AddEventDialog