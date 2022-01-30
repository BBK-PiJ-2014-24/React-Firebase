import React, {useState} from 'react';
import { useSignUp } from '../../hooks/useSignUp';
import './SignUp.css'

function SignUp() {


  const {signup, isPending, error} = useSignUp()
  
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Submit to firebase authorization
  // ================================
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName) // call to the function in the hook
  }

  return (
  <form className='signup-form' onSubmit={handleSubmit}>
    <h2>Sign-Up</h2>
    <label>
      <span>Name:</span>
      <input type='text' 
             name={displayName}
             onChange={(e)=> setDisplayName(e.target.value)}
      />
    </label>
    <label>
      <span>Email:</span>
      <input type='email' 
             name={email}
             onChange={(e)=> setEmail(e.target.value)}
      />
    </label>
    <label>
      <span>Password:</span>
      <input type='password'
             name={password}
             onChange={(e) => setPassword(e.target.value)}     
       />
    </label>
    {!isPending && <button className='btn'>Sign Up!</button>}
    {isPending && <button className='btn' disabled>Loading...</button>}
    {error && <p>Error: {error}</p>}
  </form>
  );
}

export default SignUp;
