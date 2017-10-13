import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import App from '../App';
import Flexbox from 'flexbox-react';
//import Logout from './Logout.js'


// var

class Nav extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   shown: '',
    // };
  }

  // toggle() {
  //   this.setState({
  //     shown: !this.state.shown
  //   });
  // }

  render() {
    // var shown = {
    //   display: this.state.shown ? "block" : "none"
    // };

    // var hidden = {
    //   display: this.state.shown ? "none" : "block"
    // }

    let path = '/search/user/' + this.props.user_id;
    let savedPath = '/saved_articles/' + this.props.user_id;

    let content = '';
    if (Number(this.props.user_id) > 0)
      content = (
        <div className='nav-line'>
        <a href = {path} className='nav-link2'>Home</a>
        <a href = '/' className='nav-link2'>Logout</a>
        <a href = '/register' className='nav-link2'>Register</a>
        <a href = {savedPath} className='nav-link2'>Saved Articles</a>
        </div>
      )
    else
      content = (
        <div className='nav-line'>
          <a href = {path} className='nav-link2'>Home</a>
          <a href = '/login' className='nav-link2'>Login</a>
          <a href = '/register' className='nav-link2'>Register</a>
        </div>
      )
    return content;
  }
}

export default Nav;

        // <div onClick={this.toggle.bind(this)}>
        //   <div className='nav'>
        //     <div className="hamburger-nav-icon"></div>
        //     <div className="hamburger-nav-icon"></div>
        //     <div className="hamburger-nav-icon"></div>
        //   </div>
        // </div>
        // <div className='nav-icon' style={ shown }>
        //   <div className='nav-list'>
        //       <a href = '/login' className='nav-link'>Login/Logout</a>
        //       <a href = '/register' className='nav-link'>Register</a>
        //       <a href='/articles' className='nav-link'>Saved Articles</a>
        //   </div>
        // </div>
        // <h2 style={ hidden }></h2>
