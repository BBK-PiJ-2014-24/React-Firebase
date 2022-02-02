import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/login/Login'
import Create from './pages/create/Create'
import Project from './pages/project/Project'
import SignUp from './pages/signup/SignUp'
import Dashboard from './pages/dashboard/Dashboard'
import Navbar from './components/navbar/Navbar'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'

function App() {
  return (
    <div className="App">
    <Sidebar />
      <div className='container'>
      <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/project' element={<Project />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
