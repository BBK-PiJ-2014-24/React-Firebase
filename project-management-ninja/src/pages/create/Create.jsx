import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import Select from 'react-select'
import {timestamp} from '../../firebase/config'
import {useFirestoreDB} from '../../hooks/useFirestoreDB'
import useAuthContext from '../../hooks/useAuthContext'
import {useCollection} from '../../hooks/useCollection'
import './Create.css'

// options for the dropdown
const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

function Create() {
  const {addDocument, response} = useFirestoreDB('projects')
  const navigate = useNavigate()
  
  // Pull down the User List from the DB and format for the react-select
  const {documents} = useCollection('users')
  const [users, setUsers] = useState([])
  useEffect(()=>{
    if(documents){
      const options = documents.map((user) => {
        return {value: user, label: user.displayName}
      })
      setUsers(options)
    }
  },[documents])

  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)
  const {user} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if(!category){
      setFormError('Select a Project Category')
      return
    }
    
    if(assignedUsers.length < 1){
      setFormError('Project Must Have at Least 1 User')
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    // preparing data for push to firestore DB
    const assignedUsersList = assignedUsers.map((u)=>{
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comment:[],
      createdBy,
      assignedUsersList
    }

    await addDocument(project) // add to firestore DB
    if(!response.error){
      navigate('/dashboard')
    }
  }

  return (
  <div className='create-form'>
    <h2 className='page-title'>Create a New Project</h2>
    <form onSubmit={handleSubmit}>
     <label htmlFor='projectName'><span>Project Name: </span></label>
     <input id='projectName'
            type='text'
            name={name}
            onChange={(e)=>setName(e.target.value)}
            required
            />
     <label htmlFor='projectDetails'><span>Project Details: </span></label>
     <textarea id='projectDetails'
            type='text'
            name={details}
            onChange={(e)=>setDetails(e.target.value)}
            required
            />
     <label htmlFor='projectDate'><span>Set Due Date</span></label>
     <input id='projectDate'
            type='date'
            name={dueDate}
            onChange={(e)=>setDueDate(e.target.value)}
            required
            />
     <label htmlFor='projectCategory'><span>Project Category: </span></label>
     <Select options={categories}
             onChange={(option) => setCategory(option)} />
     <label htmlFor='projectAssign'><span>Assign to:</span></label>
     <Select options={users} 
             onChange={(option) => setAssignedUsers(option)}
             isMulti
     />
     <button className="btn">Submit</button>
     {formError && <p className='error'>{formError}</p>}
    </form>
  </div>
  )
}

export default Create;
