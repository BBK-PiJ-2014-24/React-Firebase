import React, {useState} from 'react';
import useLogin from '../../hooks/useLogin'
import './Login.css'

function Login() {

  // context hook
  const {login, isPending, error} = useLogin()

  // State Variables
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password);
    login(email, password)
  }

  return(
  <form className='login-form' onSubmit={handleSubmit}>
    <h2>Login</h2>
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
    {!isPending && <button className='btn'>Login</button>}
    {isPending && <button className='btn' disabled>Loading...</button>}
    {error && <p>{error}</p>}
  </form>
  );
}

export default Login;

