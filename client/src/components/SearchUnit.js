import React, { Component } from 'react';
import axios from 'axios'

class SearchUnit extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      topic: 'home',
      articles_loaded: false,
      articles: [],
      more_articles: false,
    };
    this.getAPIArticleData = this.getAPIArticleData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({more_articles: !this.state.more_articles})
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.query === '') {
      this.getAPITopData();
    } else {
      this.getAPIArticleData();
//      this.setState({query: ''});
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
          return (<li className="article" key={item.pub_date}>
                    <a href={item.web_url}>{item.headline.main}</a>
                    <span> - {item.pub_date.substr(0,10)}</span>
                  </li>
                  )
        });
        this.setState({
          articles_loaded: true,
          articles: articleArray,
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
          return (<li className="article" key={item.published_date}>
                    <a href={item.url}>{item.title}</a>
                    <span> - {item.published_date.substr(0,10)}</span>
                  </li>
                  )
        });
        this.setState({
          articles_loaded: true,
          articles: articleArray,
          displayArticles: true,
        });
      })
      .catch(err => console.log(err));
  }

  button() {
    let buttonText = '';
    if (this.state.articles_loaded) {
      if (this.state.more_articles)
        buttonText = 'Less Articles';
      else
        buttonText = 'More Articles';
      return <button className='more-articles-icon' onClick={this.handleClick}>{buttonText}</button>;
    } else
      return '';
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
                <option value="arts">Arts</option>
                <option value="automobiles">Automobiles</option>
                <option value="books">Books</option>
                <option value="business">Business</option>
                <option value="fashion">Fashion</option>
                <option value="food">Food</option>
                <option value="health">Health</option>
                <option value="insider">Insider</option>
                <option value="magazine">Magazine</option>
                <option value="movies">Movies</option>
                <option value="national">National</option>
                <option value="nyregion">New York Region</option>
                <option value="obituaries">Obituaries</option>
                <option value="opinion">Opinion</option>
                <option value="politics">Politics</option>
                <option value="realestate">Real Estate</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="sundayreview">Sunday Review</option>
                <option value="technology">Technology</option>
                <option value="theater">Theater</option>
                <option value="tmagazine">New York Times Magazine</option>
                <option value="travel">Travel</option>
                <option value="upshot">Upshot</option>
                <option value="world">World</option>
              </select>
            </label>
              <input className='submit' type="submit" value="SUBMIT" />
          </form>
          {this.button()}
          <p>{this.state.articles.slice(0,this.state.more_articles ? 10 : 3)}</p>
        </div>
      </div>
      )
  }
}

export default SearchUnit;
