import React, { Component } from 'react';
import axios from 'axios'

class SearchUnit extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      topic: '',
      articles: [],
    };
    this.getAPIArticleData = this.getAPIArticleData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.query === '') {
      this.getAPITopData();
    } else {
      this.getAPIArticleData();
      this.setState({query: ''});
    }
  }

  componentDidMount() {
    // this.getAPITopData();
  }

  getAPIArticleData() {
    // let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let getQuery = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + this.state.query +
      '&api-key=' + process.env.REACT_APP_ARTICLES_API_KEY;
    axios.get(getQuery)
      .then(res => {
        console.log('--------------->', this.state)
        console.log('res = ',res)
        console.log('res.data.response.docs = ',res.data.response.docs);
        let resultArray = res.data.response.docs.filter(item =>
          item.document_type === 'article' || item.document_type === 'blogpost');
        let articleArray = resultArray.map((item,index) => {
          return (<li key={item.created_date}>
                    <a href={item.web_url}>{item.headline.main}</a>
                  </li>
                  )
        });
        this.setState({
          articles: articleArray.slice(0,3),
          displayArticles: true,
        });
      })
      .catch(err => console.log(err));
  }

  getAPITopData() {
    let getQuery2 = 'http://api.nytimes.com/svc/topstories/v2/' +
      this.state.topic + '.json?api-key=' + process.env.REACT_APP_ARTICLES_API_KEY
    axios.get(getQuery2)
      .then(res => {
        console.log('--------------->', this.state)
        console.log('res = ',res)
        console.log('res.data.results = ',res.data.results);
        let articleArray = res.data.results.map((item,index) => {
          return (<li className="article" key={item.created_date}>
                    <a href={item.url}>{item.title}</a>
                  </li>
                  )
        });
        this.setState({
          articles: articleArray.slice(0,3),
          displayArticles: true,
        });
      })
      .catch(err => console.log(err));
  }

  render(){
    return (
      <div>
        <h2>Search News Stories</h2>
        <div className="get-articles">
          <form onSubmit={this.handleSubmit}>
            <label>
              Enter a query:
            </label>
            <input
              type="text"
              placeholder="Query"
              name="query"
              value={this.state.query}
              onChange={this.handleChange}
              autoFocus
            />
            <br>
            </br>
            <label>
              Or select a NY Times Topic:,
              <select name="topic" value={this.state.topic} onChange={this.handleChange}>
                <option value="home">Home</option>
                <option value="technology">Technology</option>
                <option value="politics">Politics</option>
                <option value="health">Health</option>
              </select>
            </label>
              <input className='submit' type="submit" value="SUBMIT" />
          </form>
          <p>{this.state.articles}</p>
        </div>
      </div>
      )
  }
}

export default SearchUnit;
