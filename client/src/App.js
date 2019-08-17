import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home/Home';
import About from './components/pages/About/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import EntryState from './context/entry/EntryState';
import AuthState from './context/auth/AuthState';

import './App.css';

const App = () => {
  return (
    <AuthState>
      <EntryState>
        <Router>
          <Fragment>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </EntryState>
    </AuthState>
  );
};

export default App;
