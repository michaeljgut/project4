import React, { Component } from 'react';
import axios from 'axios'
import TopArticles from './TopArticles';

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
    // this.getAPIData = this.getAPIData.bind(this);
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
    this.getAPIData();
  }

  componentDidMount() {
    // this.getAPITopData();
  }

  getAPIData() {
    let apiKey = 'api-key=' + process.env.REACT_APP_ARTICLES_API_KEY
    let getQuery = '';
    let articleArray = [];
    if (this.state.query === '') {
      getQuery = 'http://api.nytimes.com/svc/topstories/v2/' +
        this.state.topic + '.json?' + apiKey;
    } else {
      getQuery = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + this.state.query +
        '&' + apiKey;
    }
    console.log('getQuery = ', getQuery);
    // let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    axios.get(getQuery)
      .then(res => {
        console.log('--------------->', this.state)
        console.log('res = ',res)
        if (this.state.query === '') {
          articleArray = res.data.results.map((item,index) => {
            return <TopArticles article={item} />;
          });
        } else {
          let resultArray = res.data.response.docs.filter(item =>
            item.document_type === 'article' || item.document_type === 'blogpost');
          articleArray = resultArray.map((item,index) => {
            return (<li className="article" key={item.pub_date}>
                      <a href={item.web_url}>{item.headline.main}</a>
                      <span> - {item.pub_date.substr(0,10)}</span>
                    </li>
                    )
          });
          this.setState({query: ''});
        }
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
      <div className="search-unit">
        <h3>Search News Stories</h3>
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
