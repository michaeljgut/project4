import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
// import Auth from 'j-toker';
//var Auth = require('j-toker');
// Auth.configure({apiUrl: 'http://localhost:3000/'});
import Auth from 'j-toker';
import Nav from './Nav';

class Register extends Component {

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
    if (this.state.password.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }
    if (this.state.password !== this.state.passwordConfirmation) {
      alert('Password does not equal confirmation!');
      return;
    }


    // Auth.configure({apiUrl: 'http://localhost:3000'})
    // console.log(Auth);
    // debugger
    // // Auth.emailSignUp({
    //   name: this.state.name,
    //   email: this.state.email,
    //   password: this.state.password,
    //   password_confirmation: this.state.password_confirmation
    // })
    //   .then( data => {
    //     console.log('inside handleSubmit promise')
    //   })
    //   .catch( err => {
    //     console.log(err)
    //   });
//     const fb = new FormData()
//     fb.append('name', this.state.name)
//     fb.append('email', this.state.email)
//     fb.append('password', this.state.password)
//     fb.append('password_confirmation', this.state.passwordConfirmation)
//     fb.append('confirm_success_url', 'http://localhost:3000/confirm_success')
//     console.log('state = ',this.state);
     let fb = {
//              "name": this.state.name,
              "email": this.state.email,
              "password": this.state.password,
//              "password_confirmation": this.state.passwordConfirmation,
              "confirm_success_url": 'www.google.com'
//              "confirm_success_url": 'http://localhost:3000/confirm_success'
    }
    console.log('fb = ',fb);
    axios('/auth', {
      method: 'POST',
      header: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      data: fb
    })
    .then(res => {
      console.log(res)
      this.setState({
        user_id: res.data.data.id
      })
    })
    // .then(json => {
    //   console.log(json,'<-----')
    //   console.log(document.cookie)
    // })
    .catch(err => console.log(err));
//             axios('/auth', {
//                 method: 'POST',
//                 data: {
// //                    name: this.state.name,
//                     email: this.state.email,
// //                    username: this.state.username,
//                     password: this.state.password
//                 }
//             })
//             .then(res => {
//               console.log('in register',res.data);
//               this.setState({
//                 user_id: res.data.user.id,
//                 fireRedirect: true,
//               });
//             })
//    .catch(err => console.log('in error',err));
    e.target.reset();
  }

  render(){
    let path = '/search/user/' + this.state.user_id;
    return (
      <div className="auth-page">
        <h2 className="auth-header">Register to save articles!</h2>
        <Nav user_id={this.props.match.params.user_id}/>
        <br />
        <div className="register-block">
          <div className="register-form-block">
            <form onSubmit={(e) => this.handleFormSubmit(e)}>
              <input name="name" type="text" placeholder="Name" required autoFocus onChange={this.handleInputChange}/>
              <input name="email" type="text" placeholder="Email" required onChange={this.handleInputChange}/>
              <input name="password" type="password" placeholder="Password" required onChange={this.handleInputChange}/>
              <input name="passwordConfirmation" type="password" placeholder="Password Confirmation" required onChange={this.handleInputChange}/>
              <input className='submit' type="submit" value="SIGN UP" />
            </form>
          </div>
        </div>
        {this.state.fireRedirect
          ? <Redirect push to={path} />
          : ''}
      </div>
    )
  }
}


export default Register;
