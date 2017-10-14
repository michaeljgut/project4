import React, { Component } from 'react';
import './App.css';
import SearchUnit from './components/SearchUnit';
import Nav from './components/Nav';
class App extends Component {

  constructor() {
    super();
    this.state = {
      searchUnitCount: 0
    }
    this.addSearchUnit = this.addSearchUnit.bind(this);
    this.removeSearchUnit = this.removeSearchUnit.bind(this);
  }

  addSearchUnit() {
    this.setState(prevState => ({
      searchUnitCount: prevState.searchUnitCount + 1
    }));
  }

  removeSearchUnit() {
    if (this.state.searchUnitCount > 0)
      this.setState(prevState => ({
        searchUnitCount: prevState.searchUnitCount - 1
      }));
  }

  searchUnits() {
    let returnArray = [];
    for (let i=0; i<this.state.searchUnitCount; i++)
      returnArray[i] = (<div><SearchUnit user_id={this.props.match.params.user_id}/></div>);
    return returnArray;
  }

  render() {
    return (
      <div className="App">
        <h2>NY Times Article Search Application</h2>
        <Nav user_id={this.props.match.params.user_id}/>
        <div className="search1">
          <SearchUnit user_id={this.props.match.params.user_id} unit_no="1" />
          <SearchUnit user_id={this.props.match.params.user_id} unit_no="2" />
        </div>
        <div className="search2">
          <SearchUnit user_id={this.props.match.params.user_id} unit_no="3" />
          <SearchUnit user_id={this.props.match.params.user_id} unit_no="4" />
        </div>
        {this.searchUnits()}
        <button onClick={this.addSearchUnit}>Add Another Search Unit</button>
        <button onClick={this.removeSearchUnit}>Remove A Search Unit</button>
      </div>
    );
  }
}

export default App;
