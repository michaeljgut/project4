import React, { Component } from 'react';
import './App.css';
import SearchUnit from './components/SearchUnit';

class App extends Component {

  constructor() {
    super();
    this.state = {
      searchUnitCount: 0
    }
    this.addSearchUnit = this.addSearchUnit.bind(this);
  }

  addSearchUnit() {
    this.setState(prevState => ({
      searchUnitCount: prevState.searchUnitCount + 1
    }));
  }

  searchUnits() {
    let returnString = '';
    for (let i=0; i<this.state.searchUnitCount; i++)
      returnString += '<div><SearchUnit/></div>';
    return {returnString};
  }

  render() {
    return (
      <div className="App">
        <h1>NY Times Article Search Application</h1>
        <div className="search1">
          <SearchUnit/>
        </div>
        {this.searchUnits()}
        <button onClick={this.addSearchUnit}>Add Another Search Unit</button>
      </div>
    );
  }
}

export default App;
