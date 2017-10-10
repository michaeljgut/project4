import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import App from '../App';
import Flexbox from 'flexbox-react';
//import Logout from './Logout.js'


// var

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      shown: '',
    };
  }

  toggle() {
    this.setState({
      shown: !this.state.shown
    });
  }

  render() {
    var shown = {
      display: this.state.shown ? "block" : "none"
    };

    var hidden = {
      display: this.state.shown ? "none" : "block"
    }

    return (
      <div>
            <div onClick={this.toggle.bind(this)}>
                <div className='nav'>
                        <div className="hamburger-nav-icon"></div>
                        <div className="hamburger-nav-icon"></div>
                        <div className="hamburger-nav-icon"></div>
                </div>

            </div>

        <div className='nav-icon' style={ shown }>
                    <div className='nav-list'>
                        <a href = '/login' className='nav-link'>Login/Logout</a>
                        <a href = '/register' className='nav-link'>Register</a>
                        <a href='/articles' className='nav-link'>Saved Articles</a>


                    </div>

                </div>
        <h2 style={ hidden }></h2>
      </div>
    )
  }
}

export default Nav;
