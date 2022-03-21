import React from 'react'
import './App.css'
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import Gamebar from './Gamebar';
import { useDispatch,useSelector } from 'react-redux';
import { selectUser } from "./features/userSlice";
import { useEffect } from 'react';
import { auth } from './firebase';
import { login, logout } from './features/userSlice'; 
import Home from './webpages/Home';
import Search from './webpages/Search';
import { BrowserRouter, Routes, Route}
    from 'react-router-dom';


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    })
  },[dispatch])

  return (
    <div>
      {user ? (
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/Search' element={<Search/>} />
          </Routes>
        </BrowserRouter>
      ):(
        <Login/>
      )}
    </div>
  );
}

export default App;