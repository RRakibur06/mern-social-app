import './App.css';
import {Home} from './components/pages/Home';
import {Profile} from './components/pages/Profile';
import {Login} from './components/pages/Login';
import {Register} from './components/pages/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Chat_ from './components/pages/Chat';
import Settings from './components/pages/Settings';

function App() {
  const {user} = useContext(AuthContext);
  return (
    <Router>
        <Routes>
          <Route  path="/" element={user ? <Home /> : <Register />} />
          <Route  path="/profile/:username" element={<Profile/>} />
          <Route  path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route  path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route  path="/chat" element={!user ? <Navigate to="/" /> : <Chat_ />} />
          <Route  path="/settings" element={!user ? <Navigate to="/" /> : <Settings />} />
        </Routes>
    </Router>
  );
}

export default App;
