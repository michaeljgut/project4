import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
// import Auth from 'j-toker';
//var Auth = require('j-toker');
// Auth.configure({apiUrl: 'http://localhost:3000/'});
import Auth from 'j-toker';

class TopArticles extends Component {

  constructor(props){
    super(props);
  };

  handleClick(e) {
    e.preventDefault();
    axios
      .post('/', {
        subject_id: this.props.match.params.subject_id,
        user_id: this.props.match.params.user_id,
        term: this.state.term,
        definition: this.state.definition,
      })
      .then(res => {
        console.log('--------------->', this.state)
        console.log(res);
        this.setState({
          newId: res.data.data.id,
          fireRedirect: true
        });
      })
      .catch(err => console.log(err));
    e.target.reset();
  }

  render(){
    return (
      <div className="auth-page">
        <li className="article" key={this.props.article.published_date}>
                  <a href={this.props.article.url}>{this.props.article.title}</a>
                  <span> - {this.props.article.published_date.substr(0,10)}</span>
                  <button onClick={this.handleClick}>Save</button>
        </li>
      </div>
    )
  }
}


export default TopArticles;
