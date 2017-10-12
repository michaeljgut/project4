import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
// import Auth from 'j-toker';
//var Auth = require('j-toker');
// Auth.configure({apiUrl: 'http://localhost:3000/'});
import Auth from 'j-toker';

class SavedArticles extends Component {

  constructor(props){
    super(props);
    this.state ={
        user_id: '',
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        fireRedirect: false
    };
  }

  render(){
    let path = '/articles/user/' + this.state.user_id;
    return (
      <div className="auth-page">
          <h1 className="auth-header">Saved Articles</h1>
          <form onSubmit={(e) => this.handleFormSubmit(e)}>
              <input name="name" type="text" placeholder="Name" required autoFocus onChange={this.handleInputChange}/>
              <input name="email" type="text" placeholder="Email" required onChange={this.handleInputChange}/>
              <input name="password" type="password" placeholder="Password" required onChange={this.handleInputChange}/>
              <input name="passwordConfirmation" type="password" placeholder="Password Confirmation" required onChange={this.handleInputChange}/>
              <input className='submit' type="submit" value="SIGN UP" />
          </form>
          <a className="link" href="/login">Login</a>
          {this.state.fireRedirect
              ? <Redirect push to={path} />
              : ''}
      </div>
    )
  }
}


export default SavedArticles;
