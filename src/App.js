import React, { useState } from 'react';
import Navbar from './component/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from "./component/pages/Home";
import PlateReader from "./App/PlateReader";
import Footer from './component/Footer';
import ComplaintHistory from './component/ComplaintHistory';

function App() {
  const [user, setUser] = useState(null);

  const changeUser = (newUser) => {
    setUser(newUser);
  }

  const currentPath = window.location.pathname;

  return (
    <>
      <Router>
        {/* Conditionally render Navbar based on the current path */}
        {currentPath !== '/platereader' && (
          <Navbar user={user} changeUser={(newUser) => changeUser(newUser)} />
        )}

        <Switch>
          <Route path='/' exact><Home user={user} /></Route>
          <Route path='/platereader' exact><PlateReader /></Route>
          <Route path='/complaint' exact><ComplaintHistory /></Route>
          {/* Add other routes as needed */}
        </Switch>
        
        <Footer />
      </Router>
    </>
  );
}

export default App;
