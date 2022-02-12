import React from 'react';
import  {Link} from 'react-router-dom'
import Avatar from '../avatar/Avatar'
import './ProjectList.css'

function ProjectList({projects}) {
  return (
  <div className='project-list'>
    {projects.length === 0 ? 
        <p>No Current Projects</p>
        :
        projects.map(project => (
            <Link to={`/projects/${project.id}`} key={project.id}>
                <h4>{project.name}</h4>
                <p>Due By: {project.dueDate.toDate().toDateString()}</p>
                <div className="assigned-to">
                    <ul>
                        {project.assignedUsersList.map((user)=> (
                            <li key={user.photoURL}>
                                <Avatar src={user.photoURL}/>
                            </li>
                    ))}
                    </ul>
                </div>
            </Link>
        ))
    }
      
  </div>
  )
}

export default ProjectList;
