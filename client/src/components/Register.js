import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {

        constructor(props){
            super(props);
            this.state ={
                user_id: '',
                name: '',
                email: '',
                username: '',
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
            const fb = new FormData()
            fb.append('name', this.state.name)
            fb.append('email', this.state.email)
            fb.append('password', this.state.password)
            fb.append('password_confirmation', this.state.passwordConfirmation)
            fb.append('confirm_success_url', 'http://localhost:3000/confirm_success')
            fetch('/auth', {
              method: 'POST',
              header: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: fb
            })
            .then(res => res.json())
            .then(json => {
              console.log(json)
              console.log(document.cookie)
            })
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
            .catch(err => console.log('in error',err));
          e.target.reset();
         }

        render(){
            let path = '/articles/user/' + this.state.user_id;
            return (
                <div className="auth-page">
                    <h1 className="auth-header">Register to save articles!</h1>
                    <form onSubmit={(e) => this.handleFormSubmit(e)}>
                        <input name="name" type="text" placeholder="Name" required autoFocus onChange={this.handleInputChange}/>
                        <input name="email" type="text" placeholder="Email" required onChange={this.handleInputChange}/>
                        <input name="username" type="text" placeholder="Username" required onChange={this.handleInputChange}/>
                        <input name="password" type="password" placeholder="Password" required onChange={this.handleInputChange}/>
                        <input name="password_confirmation" type="password" placeholder="Password Confirmation" required onChange={this.handleInputChange}/>
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


    export default Register;
