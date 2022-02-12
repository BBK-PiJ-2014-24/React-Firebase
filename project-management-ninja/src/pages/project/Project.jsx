import React from 'react';
import {useParams} from 'react-router-dom'
import {useDocument} from '../../hooks/useDocument'
import ProjectSummary from './ProjectSummary';
import ProjectComments from './ProjectComments';
import './Project.css'

function Project() {

  const {id} = useParams() // get the url params

  const {error, document} = useDocument('projects', id) // db call to get document

  if(error) {
    return <div className='error'>{error}</div>
  }

  if(!document) {
    return <div className='loading'>Loading...</div>
  }


  return (
    <div className='project-details'>
      <ProjectSummary project={document}/>
      <ProjectComments project={document}/>
    </div>
  )
}

export default Project;
