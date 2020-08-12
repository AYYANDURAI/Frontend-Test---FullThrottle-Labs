import React from 'react';
import './App.css';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Users from './Users';

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <div className="header">
          <PeopleAltIcon fontSize="large" className="users-icon" />
          <h1 className="title">Users Information</h1>
        </div>
        <Users />
      </div>
    </div>
  );
}

export default App;
