import React from 'react';
import {Link} from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
import useAuthContext from '../../hooks/useAuthContext'
import Temple from '../../assets/temple.svg'
import { projectFirestore } from '../../firebase/config';
import './Navbar.css'

function Navbar() {

  // Context variables
  const {user} = useAuthContext()

  // hook variables
  const {logout, isPending} = useLogout()

  return <div className='navbar'>
      <ul>
          <li className='logo'>
              <img src={Temple} alt='logo'/>
              <span>ProjectManagement</span>
          </li>
          {!user ? 
            <>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/signup'>Sign Up</Link>
            </li>
            </>
            :
            <li>
            {!isPending ?
                <button className="btn" onClick={logout}>Logout</button>
                :
                <button className="btn" disabled>Logging out...</button>
            }
            </li>
          }
      </ul>
  </div>;
}

export default Navbar;
