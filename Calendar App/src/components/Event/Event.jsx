import React from 'react'
import "./Event.css"
import { useState } from 'react';

function Event(props) {
  const [data, setData] = useState(props.data);

  return (
    <div id={"event_" + props.id} className='event-container'>
        <p>{data.title}</p>
        <p>{data.description}</p>
        <p>{data.location}</p>
    </div>
  )
}

export default Event