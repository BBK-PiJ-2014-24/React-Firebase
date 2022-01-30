import React from 'react';
import {Link} from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'
import useLogout from '../hooks/useLogout';
import './NavBar.css'


function NavBar() {
  
  // Invoke Context
  const {user } = useAuthContext()

  // function from useLogout Hook
  const {logout} = useLogout()

  return <nav className='navbar'>
     <ul>
      <li className='title'>myMoneyApp</li>
      {!user ? (
      <>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>Sign Up</Link></li>
      </>
      ) : (
      <>
        <li>User: {user.displayName}</li>  
        <li>
          <button className='btn' 
                  onClick={() => logout()}>Logout</button>
        </li>
      </>  
      )}
     </ul>
  </nav>;
}

export default NavBar;
