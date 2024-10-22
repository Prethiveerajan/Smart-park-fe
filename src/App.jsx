import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import VideoUpload from './components/VideoUpload';
import ParkingStatus from './components/ParkingStatus';
import VideoSelection from './components/VideoSelection';
import SidebarDrawer from './components/SidebarDrawer';
import Navbar from './components/Navbar';
import User from './components/User';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('emailData'));

  return (
    <>
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn && <SidebarDrawer />} {/* Show sidebar only if logged in */}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/upload" element={isLoggedIn ? <VideoUpload /> : <Navigate to="/login" />} />
        <Route path="/status" element={isLoggedIn ? <ParkingStatus /> : <Navigate to="/login" />} />
        <Route path="/select-video" element={isLoggedIn ? <VideoSelection /> : <Navigate to="/login" />} />
        <Route path="/user" element={isLoggedIn ? <User /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </>
  );
}

export default App;
