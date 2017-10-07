import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      definition: [],
      fireRedirect: false,
    };
    this.getAPIData = this.getAPIData.bind(this);
  }

  componentDidMount() {
    this.getAPIData();
  }

  getAPIData() {
//    e.preventDefault();
    console.log(process.env);
    let getQuery = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' +
      process.env.REACT_APP_ARTICLES_API_KEY
    axios
      .get(getQuery)
      .then(res => {
        console.log('--------------->', this.state)
        console.log('res.data.response.docs = ',res.data.response.docs);
        let articleArray = res.data.response.docs.map((item,index) => {
          return (<li>
                    <a href={item.web_url} key={index}>{item.snippet}</a>
                  </li>
                  )
        });
        this.setState({
          definition: articleArray,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Article data: {this.state.definition}</p>
      </div>
    );
  }
}

export default App;
