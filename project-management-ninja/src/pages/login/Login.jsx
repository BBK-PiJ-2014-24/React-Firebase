import React, {useState} from 'react';
import useLogin from '../../hooks/useLogin'

import './Login.css'


function Login() {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Login</h2>
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
        {thumbnailError &&
          <div className='error'>Error: {thumbnailError}</div>
        }
        {!isPending ? 
          <button className='btn'>Login</button>
          :
          <button className='btn' disabled>Logging...</button>
        }
        {error && 
          <div className='error'>{error}</div>
        }
    </form>
  )
}

export default Login;
