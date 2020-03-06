// components/projects/ProjectDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useHistory } from 'react-router-dom';
import EditProject from './EditProject';
import AddTask from '../tasks/AddTask';

const ProjectDetails = props => {


  const history = useHistory();
  const { id } = useParams();

  useEffect(()=>{
      getSingleProject()
  }, []);

  const [ theProject, updateProject ] = useState({
      _id: '',
      title: '',
      description: '',
      tasks: []
  });

  const getSingleProject = () => {
      axios.get(`http://localhost:5000/api/projects/${id}`)
      .then( responseFromApi =>{
          updateProject(responseFromApi.data)
      })
      .catch((err)=>{
          console.log(err)
      })
  }
  const renderEditForm = () => {
    if(!theProject.title){
      getSingleProject();
    } else {                                                                                  
      return (<EditProject theProject={theProject} getTheProject={getSingleProject} {...props} />)
    }
  }

  const deleteProject = () => {
    axios.delete(`http://localhost:5000/api/projects/${id}`)
    .then( () =>{
        history.push('/projects'); // !!!         
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  const renderAddTaskForm = () => {
    if(!theProject.title){
        getSingleProject();
      } else {
        return <AddTask theProject={theProject} getTheProject={getSingleProject} />
      }
  }

  return(
    <div>
      <h1>{theProject.title}</h1>
      <p>{theProject.description}</p>
      {/* show the task heading only if there are tasks */}
      { theProject.tasks && theProject.tasks.length > 0 && <h3>Tasks </h3> }
      {/* map through the array of tasks and... */}
      { theProject.tasks && theProject.tasks.map((task, index) => {
          return(
              <div key={ index }>
              {/* ... make each task's title a link that goes to the task details page */}
                  <Link to={`/projects/${theProject._id}/tasks/${task._id}`}> 
                      { task.title }
                  </Link>
              </div>
          )
          
      }) }
      <div>{renderEditForm()} </div>
      <button onClick={() => deleteProject()}>Delete project</button> {/* <== !!! */}
      <br/>
      <div>{renderAddTaskForm()} </div>
      <br/><br/><br/><br/><br/>
      <Link to={'/projects'}>Back to projects</Link>
    </div>
  )
}

export default ProjectDetails;