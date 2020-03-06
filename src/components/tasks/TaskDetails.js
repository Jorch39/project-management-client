// components/tasks/TaskDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const TaskDetails = props => {

  const [theTask, updateTheTask] = useState({})
  const {id, taskId} = useParams()

  useEffect(() => {
      getTheTask()
  }, [])

  const getTheTask = () => {
    axios.get(`http://localhost:5000/api/projects/${id}/tasks/${taskId}`)
    .then( responseFromApi =>{
      updateTheTask(responseFromApi.data)
    })
    .catch((err)=>{
        console.log(err)
    })
  }

    return(
      <div>
        <h1>{theTask.title}</h1>
        <p>{theTask.description}</p>
      </div>
    )
}

export default TaskDetails;