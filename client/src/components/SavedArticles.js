import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
// import Auth from 'j-toker';
//var Auth = require('j-toker');
// Auth.configure({apiUrl: 'http://localhost:3000/'});
import Auth from 'j-toker';
import Nav from './Nav';

class SavedArticles extends Component {

  constructor(props){
    super(props);
    this.state ={
      articles: []
    };
  }

  componentDidMount() {
    let path = '/articles/' + this.props.match.params.user_id;
    axios
      .get(path, {
        user_id: this.props.match.params.user_id,
      })
      .then(res => {
        console.log('--------------->', this.state)
        let tempArray = res.data.slice();
        console.log(tempArray[0]);
        this.setState({articles: tempArray});
        // this.setState({
        //   newId: res.data.data.id,
        //   fireRedirect: true
        // });
      })
      .catch(err => console.log('in error',err));
  }

  listArticles() {
    return this.state.articles.map(item => {
      return <li><a href={item.url}>{item.title}</a>- {item.publication_date}</li>
    })
  }

  render(){
    return (
      <div className="auth-page">
        <Nav user_id={this.props.match.params.user_id}/>
        <h1 className="auth-header">Saved Articles</h1>
        {this.listArticles()}
      </div>
    )
  }
}


export default SavedArticles;
