import React, { Component } from 'react';
import axios from 'axios';

class SearchUnit extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      topic: '',
      definition: [],
      fireRedirect: false,
    };
    this.getAPIData = this.getAPIData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  componentDidMount() {
//    this.getAPIData();
  }

  getAPIData(e) {
    e.preventDefault();
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
    return (
      <div className="get-articles">
        <h1>NY Times Article Search</h1>;
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            placeholder="Query"
            name="query"
            value={this.state.query}
            onChange={this.handleInputChange}
            autoFocus
          />
          <label>
            Pick a NY Times Subject Areakey: "value",
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </label>
            <input className='submit' type="submit" value="SUBMIT" />
        </form>
        <button onClick={this.cancelFlashcard}>Cancel</button>
        {this.state.fireRedirect
          ? <Redirect push to={pathSubject} />
          : ''}
      </div>
      )
  }
}

export default SearchUnit;
