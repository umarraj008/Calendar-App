import React, { useEffect, useState } from 'react'
import "./AddEventDialog.css"

function AddEventDialog(props) {
  // Get the current date
  const dateNow = new Date();
  const timeNow = dateNow.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

  // State variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(dateNow.toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState(timeNow);
  const [endTime, setEndTime] = useState(timeNow);
  const [important, setImportant] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close dialog and reset data
  const closeDialog = () => {
    let currentDateNow = new Date();
    let currentTimeNow = dateNow.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

    // Clear all form input
    setTitle("");
    setDescription("");
    setLocation("");
    setDate(currentDateNow);
    setStartTime(currentTimeNow);
    setEndTime(currentTimeNow);
    setImportant("");

    // Close dialog
    props.closeDialog();
  }

  // Form input update functions
  const updateTitle = (event) => { setTitle((prev) => event.target.value); }
  const updateLocation = (event) => { setLocation((prev) => event.target.value); }
  const updateDescription = (event) => { setDescription((prev) => event.target.value); }
  const updateDate = (event) => { setDate((prev) => event.target.value); }
  const updateStartTime = (event) => { setStartTime((prev) => event.target.value); setEndTime((prev) => event.target.value);}
  const updateEndTime = (event) => { setEndTime((prev) => event.target.value); }
  const updateImportant = (event) => { setImportant((prev) => event.target.checked); }

  // submit form data function 
  const submitData = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  }
  
  // Use effect hook to submit data synchronously
  useEffect(() => {
    if (isSubmitted) {
      // Check form data
      // title needs to have text length greater than 0
      if (title.length == 0) {
        props.errorMessage("Please Enter a Title For This Event.");
        setIsSubmitted(false);
        return;
      }
      
      // End time needs to be more than start time
      if (endTime < startTime) {
        props.errorMessage("End Time Must Be Greater Than Start Time.");
        setIsSubmitted(false);
        return;
      }
    
      // No errors -> Pass data to callback 
      props.addNewEvent({
        title: title,
        description: description,
        date: date,
        startTime: startTime,
        endTime: endTime,
        location: location,
        important: important,
      });
    
      // Close dialog after submitting data
      closeDialog();

      // Clear submit
      setIsSubmitted(false);
    }
  });

  return (
    <div className='add-event-dialog-container'>
      <div className='modal-container'>
          <h2 className='title'>Add New Event</h2>
          
          <form onSubmit={submitData}>
            <div className="left-section">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" placeholder='Title' type="text" onChange={updateTitle} value={title} />
              
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" placeholder='Description' type="text" onChange={updateDescription} value={description} />
            </div>

            <div className="right-section">
              <label htmlFor="date">Date</label>
              <input id="date" name="date" type="date" onChange={updateDate} value={date} />  
              
              <label htmlFor="startTime">Start Time</label>
              <input id="startTime" name="startTime" type="time" onChange={updateStartTime} value={startTime} />  
              
              <label htmlFor="endTime">End Time</label>
              <input id="endTime" name="endTime" type="time" onChange={updateEndTime} value={endTime} />  
              
              <label htmlFor="location">Location</label>
              <input id="location" name="location" placeholder='Location' type="text" onChange={updateLocation} value={location} />  
              
              <div className="checkbox-container">
                <input id="important" name="important" type="checkbox" onChange={updateImportant} value={important} /> 
                <label id="checkboxLabel" htmlFor="important">Important</label>
              </div>
              
              <div className="buttons-container">
                <button type="submit">Add</button>
                <button onClick={closeDialog}>Cancel</button>
              </div>
            </div>
            
          </form>
        </div>
      </div>
  )
}

export default AddEventDialog