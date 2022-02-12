import React from 'react';
import {useNavigate} from 'react-router-dom'
import Avatar from '../../components/avatar/Avatar';
import useAuthContext from '../../hooks/useAuthContext'
import {useFirestoreDB} from '../../hooks/useFirestoreDB'
import './Project.css'

export default function ProjectSummary({project}) {

    const {user} = useAuthContext()
    const {deleteDocument} = useFirestoreDB('projects')
    const navigate = useNavigate()
    

    console.log('project', project);    
    const handleClick = (e)=> {
        deleteDocument(project.id)
        navigate('/dashboard')
    }

  return (
  <div>
    <div className="project-summary">
        <h2 className='page-title'>{project.name}</h2>
        {/* <p>Project Created  By: {project.createdBy.displayName}</p> */}
        <p className='due-date'>
            Project Due By: {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">
            {project.details}
        </p>
        <h4>Project is Assigned to:</h4>
        <div className="assigned-users">
            {project.assignedUsersList.map((user)=>(
                <div key={user.id}>
                    <Avatar src={user.photoURL} />
                </div>
            ))}
        </div>
    </div>
        {user.uid === project.createdBy.id &&  (
            <button className='btn'
                    onClick={handleClick}>
                    Mark as Complete
            </button>
        )}
  </div>
  )
}
