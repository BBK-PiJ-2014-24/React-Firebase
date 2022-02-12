import React, {useState} from 'react';
import Avatar from '../../components/avatar/Avatar';
import {timestamp} from '../../firebase/config'
import useAuthContext from '../../hooks/useAuthContext'
import {useFirestoreDB} from '../../hooks/useFirestoreDB'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


function ProjectComments({project}) {

    const {updateDocument, response} = useFirestoreDB('projects')
    const [newComment, setNewComment] = useState('')
    const {user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }
        console.log('new comment', commentToAdd);

        await  updateDocument(project.id, 
                              {comment: [...project.comment, commentToAdd]}
                              )

        if(!response.error) {
          setNewComment('')
        }
                              
    }

  return (
  <div className='project-comments' onSubmit={handleSubmit}>

   <h4>Project Comments</h4>
   <ul>
     {project.comment.length > 0 && project.comment.map((comm) => (
       <li key={comm.id}>
         <div className="comment-author">
           <Avatar src={comm.photoURL} />
           <p>{comm.displayName}</p>
         </div>
         <div className="comment-date">
           <p>{formatDistanceToNow(comm.createdAt.toDate(), {addSuffix: true})}</p>
         </div> 
         <div className="comment-content">
           <p>{comm.content}</p>
         </div>
       </li>
     ))}
   </ul>
   <form className='add-comment'>
    <label htmlFor="comment"><span>Add New Comment</span></label>
    <textarea id='comment'
              name={newComment}
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              required
            /> 
    <button className="btn">Add Comment</button>
   </form>

  </div>
  )
}

export default ProjectComments;
