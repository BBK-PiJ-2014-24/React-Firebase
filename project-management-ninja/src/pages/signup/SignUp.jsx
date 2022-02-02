import React, {useState} from 'react';
import { useSignUp } from '../../hooks/useSignUp';
import './SignUp.css'

function SignUp() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)

  // variables from hook
  const {signup, isPending, error} = useSignUp()

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(email, password, displayName, thumbnail);
    signup(email, password, displayName, thumbnail)

  }


  const handleFileChange = (e) => {
    setThumbnail(null)
    let selectedFile  = e.target.files[0]
    // Defence Checks
    if(!selectedFile){
      setThumbnailError('Please Select a File')
      return
    }
    if(!selectedFile.type.includes('image')){
      setThumbnailError('File Must Be an Image')
      return
    }
    if(!selectedFile.size > 100000){
      setThumbnailError('Image Size must be less than 100kb')
      return
    }

    setThumbnail(selectedFile)
    setThumbnailError(null)
    console.log('Thumbnail Updated');
  }


  return ( 
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
        <label htmlFor='email'><span>Email:</span></label>
        <input id='email' 
               name={email}
               type='email' 
               onChange={(e)=> setEmail(e.target.value)}
               required
              />
        <label htmlFor='password'><span>Password:</span></label>
        <input id='password' 
              name={password}
              type='password' 
              onChange={(e)=> setPassword(e.target.value)}
              required
        />
        <label htmlFor='display-name'><span>Display Name:</span></label>
        <input id='display-name' 
              name={displayName}
              type='text' 
              onChange={(e)=> setDisplayName(e.target.value)}
        />
        <label htmlFor='thumbnail'><span>Profile Thumbnail:</span></label>
        <input id='thumbnail' 
              name={thumbnail}
              type='file' 
              onChange={handleFileChange}
        />
        {thumbnailError &&
          <div className='error'>Error: {thumbnailError}</div>
        }
        {!isPending ? 
          <button className='btn'>Sign Up</button>
          :
          <button className='btn' disabled>Loading...</button>
        }
        {error && 
          <div className='error'>{error}</div>
        }
    </form>
  )
}

export default SignUp;
