import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Todo from './components/Todo';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './App.css';
import Logout from './components/Logout';

function App() {
  const [user, setUser] = useState(false);

  return (
    <div>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={`/${user ? 'logout' : 'login'}`}
          element={user ? <Logout setUser={setUser} /> : <Login setUser={setUser} />}
        />
        <Route path="/signup" element={<Signup setUser = {setUser} />} />
        <Route path="/todo" element={<Todo user={user} />} />
        {/* ... other routes */}
      </Routes>
    </div>
  );
}

export default App;
