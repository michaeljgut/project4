import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Auth from 'j-toker'
//var Auth = require('j-toker');
Auth.configure({apiUrl: '/'});

class Login extends Component {

  constructor(props){
    super(props);
    this.state ={
        user_id: '',
        email: '',
        password: '',
        fireRedirect: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit(e){
    e.preventDefault();
    axios('/auth/sign_in', {
        method: 'POST',
        data: {
            email: this.state.email,
            password: this.state.password,
        },
    })
    .then(res => {
      console.log('res.data.data = ',res.data.data);
      this.setState({
          user_id: res.data.data.id,
          fireRedirect: true,
      });
    })
    .catch(err => console.log('in error',err));
    e.target.reset();
  }


  render(){
    let path = '/search/user/' + this.state.user_id;
      console.log('path = ',path);
      return (
          <div className="auth-page">

              <h1 className="auth-header">Sign In To Save Articles!</h1>

              <form onSubmit={(e) => this.handleFormSubmit(e)}>
                  <input name="email" type="text" placeholder="email" required autoFocus onChange={this.handleInputChange}/>
                  <input name="password" type="password" placeholder="password" required onChange={this.handleInputChange}/>
                  <input className="submit" type="submit" value="LOGIN" />
              </form>
              <a className="link" href="/register">Register</a>

              {this.state.fireRedirect
                  ? <Redirect push to={path} />
                    : ''}
          </div>
      )
  }
}

export default Login;
