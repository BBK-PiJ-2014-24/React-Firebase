import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/login/Login'
import Create from './pages/create/Create'
import Project from './pages/project/Project'
import SignUp from './pages/signup/SignUp'
import Dashboard from './pages/dashboard/Dashboard'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import OnlineUsers from './components/online-users/OnlineUsers'
import useAuthContext from './hooks/useAuthContext'
import './App.css'

function App() {
  
  const {user, isAuthReady} = useAuthContext()

  return (
    <div className="App">
    {isAuthReady && (
    <> 
    {user &&
      <Sidebar />
    }
      <div className='container'>
      <Navbar />
        <Routes>
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/create' element={user ? <Create /> : <Navigate to='/login'/>} />
          <Route path='/project' element={user ? <Project /> : <Navigate to='/login'/>} />
          <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />} />
          <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login'/>} />
        </Routes>
      </div>
    {user && <OnlineUsers />}
    </>
    )}
    </div>
  );
}

export default App
