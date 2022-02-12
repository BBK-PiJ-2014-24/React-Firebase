import React, {useState} from 'react';
import useAuthContext from '../../hooks/useAuthContext'
import {useCollection}  from '../../hooks/useCollection'
import ProjectList from '../../components/projectList/ProjectList';
import ProjectFilter from './ProjectFilter'
import './Dashboard.css'

function Dashboard() {
  const {user} = useAuthContext()
  const [currentFilter, setCurrentFilter] = useState('a')
  const {documents, error} = useCollection('projects')

  const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
  }

  const filteredProjects = documents ? 
  documents.filter((doc) => {
      switch(currentFilter){
        case 'all':
          return true
        case 'mine':
          let assignedToMe = false
          doc.assignedUsersList.forEach((u)=> {
              if(user.uid === u.id){
                assignedToMe = true
              }
            })
        return assignedToMe
        case 'development':
        case 'design':
        case 'sales':
        case 'marketing':
            console.log(doc.category, currentFilter)
            return doc.category === currentFilter
        default:
          return false
      }
  })
  :
  null

  

  return (
  <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {document && <ProjectFilter currentFilter={currentFilter} 
                                  changeFilter={changeFilter}
                                  />}
      {filteredProjects && <ProjectList projects={filteredProjects} />}
  </div>
  )
}


export default Dashboard;
