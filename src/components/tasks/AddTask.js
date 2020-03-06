// components/tasks/AddTask.js

import React, { useState } from 'react';
import axios from 'axios';

const AddTask = props => {
 
  const [ formState, updateFormState] = useState ({
      title:"",
      description: ""
  })
  
  const [ isShowing,toggleIsShowing ] = useState (false) 

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const body =Object.assign({projectID:props.theProject._id}, formState)
   
    axios.post("http://localhost:5000/api/tasks", body)
    .then( () => {
          // after submitting the form, retrieve project one more time so the new task is displayed as well 
          //              |
        props.getTheProject();
        updateFormState({title: "", description: ""})
    })
    .catch( error => console.log(error) )
  }

  const handleChange = (event) => {  
    const { name, value } = event.target;
    updateFormState(Object.assign({}, formState, {[name]: value}))
  }

  const toggleForm = () => {
      toggleIsShowing(!isShowing)
  }

  const showAddTaskForm = () => {
    if(isShowing){
        return(
            <div>
                  <h3>Add Task</h3>
                  <form onSubmit={handleFormSubmit}>
                  <label>Title:</label>
                  <input type="text" name="title" value={formState.title} onChange={ e => handleChange(e)}/>
                  <label>Description:</label>
                  <textarea name="description" value={formState.description} onChange={ e => handleChange(e)} />
                  
                  <input type="submit" value="Submit" />
                  </form>
            </div>
          )
    }
  }

    return(
      <div>
            <hr />
            <button onClick={() => toggleForm()}> Add task </button>
            { showAddTaskForm() }
      </div>
    )
  }


export default AddTask;