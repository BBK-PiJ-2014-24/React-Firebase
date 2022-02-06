import React from 'react';
import {Link} from 'react-router-dom'
import Avatar from '../avatar/Avatar'
import useAuthContext from '../../hooks/useAuthContext'
import DashboardIcon from '../../assets/dashboard_icon.svg'
import AddIcon from '../../assets/add_icon.svg'
import './Sidebar.css'


function Sidebar() {

  const {user} = useAuthContext()

  return ( 
    <div className='sidebar'>
        <div className="side-content">
            <div className='user'>
                <Avatar src={user.photoURL} />
                <p>Hello {user.displayName}</p>
            </div>
        </div>
        <nav className='links'>
        <ul>
            <li>
                <Link to='/dashboard'>
                    <img src={DashboardIcon} alt='dashboard icon'/>
                    <span>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link to='/create'>
                    <img src={AddIcon} alt='add project icon'/>
                    <span>New Project</span>
                </Link>
            </li>
        </ul>

        </nav>


    </div>
    )
}

export default Sidebar;

