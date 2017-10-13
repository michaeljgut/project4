import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
// import Auth from 'j-toker';
//var Auth = require('j-toker');
// Auth.configure({apiUrl: 'http://localhost:3000/'});
import Auth from 'j-toker';
import cookies from 'cookies-js';

class DeleteArticle extends Component {

  constructor(props){
    super(props);
    this.button = this.button.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  button() {
    let buttonText = 'UnSave';
    return <button className='unsave-articles-icon' onClick={this.handleClick}>{buttonText}</button>;
  }

  handleClick(e) {
    e.preventDefault();
     let headers = {
       'access-token': cookies.get('access-token'),
       'client': cookies.get('client'),
       'token-type': cookies.get('token-type'),
       'uid': cookies.get('uid'),
       'expiry': cookies.get('expiry')
     };
    axios
//      .delete(`/articles?id=${this.props.item.id}/${this.props.item.id}`,      { headers: headers })
      .delete(`/articles/${this.props.item.id}`,      { headers: headers })
      .then(res => {
        console.log('--------------->', this.state)
        console.log(res);
        // this.setState({
        //   newId: res.data.data.id,
        //   fireRedirect: true
        // });
        this.props.deleteOnClick();
      })
      .catch(err => console.log(err));
//    e.target.reset();
  }


  render(){
    return (
      <div className="auth-page">
        <li><a href={this.props.item.url}>{this.props.item.title}</a>- {this.props.item.publication_date}{this.button()}</li>
      </div>
    )
  }
}


export default DeleteArticle;
