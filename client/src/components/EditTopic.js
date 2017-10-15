import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Nav from './Nav';


class TopicEditForm extends Component {
  constructor() {
    super();
    this.state = {
        newId: 0,
        name: this.props.match.params.topic,
        definition: '',
        date_modified: new Date(),
        fireRedirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.deleteTopic = this.deleteTopic.bind(this);
    this.cancelTopic = this.cancelTopic.bind(this);
  }

  componentDidMount() {
  }

  handleInputChange(e) {
    e.preventDefault();
    console.log('in handleInputChange');
    console.log(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      definition: e.target.value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    axios
      .put(`/topics/${this.props.match.params.topic_id}`, {
        name: this.state.name,
      })
      .then(res => {
        this.setState({
          fireRedirect: true,
        });
      })
      .catch(err => console.log(err));
    e.target.reset();
  }

  cancelFlashcard() {
    this.setState({
      fireRedirect: true
   });
  }

  render() {
    let path = `/topics/edit/{this.props.match.params.user_id}`
    console.log('path in topiceditform = ',path);
    return (
      <div className="edit">
        <form onSubmit={this.handleFormSubmit}>
            <input className='term-placeholder'
              type="text"
              placeholder="term"
              name="term"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          <input className='submit' type="submit" value="SUBMIT" />
        </form>
        <button onClick={this.deleteTopic}>DELETE</button>
        <button onClick={this.cancelTopic}>CANCEL</button>
        {this.state.fireRedirect
          ? <Redirect push to={path} />
          : ''}
      </div>
    );
  }
}

export default TopicEditForm;
