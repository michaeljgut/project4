import React, { Component } from 'react';
import axios from 'axios';

class SearchUnit extends Component {
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

  render(){
    return <h1>Search Unit</h1>;
  }
}

export default SearchUnit;
