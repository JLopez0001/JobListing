import './App.css'
import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/Nav/Nav.jsx';
import Landing from './pages/Landing/Landing.jsx';
import Register from './pages/Auth/Register/Register.jsx';
import Login from './pages/Auth/Login/Login.jsx';
import Applied from './pages/JobsApplied/Applied.jsx';
import SearchResults from './pages/SearchResults/SearchResults.jsx'
import { verify } from './services/users.js';

function App() {

  const [user,setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await verify();
      response ? setUser(response) : setUser(null)
    };

    fetchUser()
  },[]);

  return (
    <>
      <NavBar user={user} setUser={setUser}/>
      <Routes> 
        <Route path='/listing' element={ <Landing />}/>
        <Route path='/register' element={ <Register setUser={setUser} /> }/>
        <Route path='/' element={ <Login setUser={setUser} /> }/>
        <Route path='/jobs-applied' element={ <Applied />} />
        <Route path='/search' element={ <SearchResults />} />
      </Routes> 

    </>
  )
}

export default App
