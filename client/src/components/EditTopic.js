import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class FlashcardEditForm extends Component {
  constructor() {
    super();
    this.state = {
        newId: 0,
        term: '',
        definition: '',
        date_modified: new Date(),
        fireRedirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.deleteFlashcard = this.deleteFlashcard.bind(this);
    this.cancelFlashcard = this.cancelFlashcard.bind(this);
  }

  componentDidMount() {
    axios.get(`/flashcard/${this.props.match.params.id}`)
      .then((res) => {
        const flashcard = res.data;
        this.setState({
          newId: flashcard.data.id,
          term: flashcard.data.term,
          definition: flashcard.data.definition
        })
      }).catch(err => console.log(err));
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
      .put(`/flashcard/${this.props.match.params.id}`, {
        term: this.state.term,
        definition: this.state.definition,
        date_modified: this.state.date_modified
      })
      .then(res => {
        this.setState({
          newId: res.data.id,
          fireRedirect: true,
        });
      })
      .catch(err => console.log(err));
    e.target.reset();
  }

  deleteFlashcard() {
    axios
      .delete(`/flashcard/${this.state.newId}`)
      .then(res => {
        this.setState({
          term: '',
          definition: '',
          fireRedirect: true,
        });
      })
      .catch(err => console.log(err));

  }

  cancelFlashcard() {
    this.setState({
      fireRedirect: true
   });
  }

  render() {
    let path = '/subjects/' + this.props.match.params.subject_id + '/user/' + this.props.match.params.user_id
    console.log('path in flashcardeditform = ',path);
    return (
      <div className="edit">
        <form onSubmit={this.handleFormSubmit}>
            <input className='term-placeholder'
              type="text"
              placeholder="term"
              name="term"
              value={this.state.term}
              onChange={this.handleInputChange}
            />
          <label>
            Definition
            <textarea id="comment" name="definition" cols="40" rows="15"
              placeholder="Definition"
              value={this.state.definition}
              onChange={this.handleInputChange}
              autoFocus>
            </textarea>
          </label>
          <input className='submit' type="submit" value="SUBMIT" />
        </form>
        <button onClick={this.deleteFlashcard}>DELETE</button>
        <button onClick={this.cancelFlashcard}>CANCEL</button>
        {this.state.fireRedirect
          ? <Redirect push to={path} />
          : ''}
      </div>
    );
  }
}

export default FlashcardEditForm;
