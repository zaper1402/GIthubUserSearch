// src/App.js

import React from 'react';
import UserSearch from './UserSearch';
import './App.css';
import './assets//github_banner.jpg';

function App() {
  return (
    <div className="App">
       <img src='https://rijsat.com/wp-content/uploads/2021/07/github.png' alt="Github"  class="circular-image-header"/>
      <h1>Github User Search</h1>
      <UserSearch />
    </div>
  );
}

export default App;
