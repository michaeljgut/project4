import React, { Component } from 'react';
import './App.css';
import SearchUnit from './components/SearchUnit';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>NY Times Article Search Application</h1>
        <div className="search1">
          <SearchUnit/>
        </div>
        <div className="search2">
          <SearchUnit/>
        </div>
        <div className="search3">
          <SearchUnit/>
        </div>
        <div className="search4">
          <SearchUnit/>
        </div>
      </div>
    );
  }
}

export default App;
