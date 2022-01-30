import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import NavBar from './components/NavBar'
import useAuthContext from './hooks/useAuthContext'
import './App.css';

function App() {

  // Check Authorization Check with Firebase is done before exposing nav links and routes 
  const {isAuthReady, user} = useAuthContext()

  return (
    <div className="App">
    {isAuthReady && 
    <>
    <NavBar />
      <Routes>
        <Route path='/' element ={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/signup' element ={!user ? <SignUp /> : <Navigate to='/' />}/>
        <Route path='/login' element ={!user ? <Login /> : <Navigate to='/' /> }/>
      </Routes>
    </>}
    </div>
  );
}

export default App;
