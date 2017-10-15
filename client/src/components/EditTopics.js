import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookies from 'cookies-js';
import Nav from './Nav';


class EditTopics extends Component {
    constructor() {
      super();
      this.state = {
        topics: [],
        headers: {},
        searchUnitCount: 0,
        dataLoaded: false
      }
    }

componentDidMount() {
   let headers = {
     'access-token': cookies.get('access-token'),
     'client': cookies.get('client'),
     'token-type': cookies.get('token-type'),
     'uid': cookies.get('uid'),
     'expiry': cookies.get('expiry')
   };
   this.setState({headers: headers});
   console.log('headers = *',headers);
    let path = `/topics?user_id=${cookies.get('user_id')}`;
    axios
      .get(path,
     { headers: headers })
      .then(res => {
        console.log('--------------->', res)
        let tempArray = res.data.slice();
        console.log(tempArray[0]);
        console.log(tempArray[1]);
        this.setState({topics: tempArray,
                       dataLoaded: true});
        // this.setState({
        //   newId: res.data.data.id,
        //   fireRedirect: true
        // });
      })
      .catch(err => console.log('in error',err));
}

  topicsMap(array){
    return array.map((topic, index) => {
      console.log('topic = ',topic);
      if (topic.query_type === 1) {
        return (
              <p>
                <Link to={`/edit/${topic.id}/topic/${topic.name}`}>{topic.name}</Link>
                <button onClick={this.deleteTopic(topic.id)}>Delete</button>
              </p>
        )
      } else {
        return (
              <p>{topic.name}<button>Delete</button></p>
        )
      }
    })
  }

  deleteTopic(id) {
    axios
      .delete(`/topics/${id}`,
           { headers: this.state.headers })
      .then(res => {
        this.render();
      })
      .catch(err => console.log(err));

  }


  renderTopics(){
    if (this.state.dataLoaded){
      console.log('user_id = ',this.props.match.params.user_id);
      let pathTopics = '/topics/edit/' + this.props.match.params.user_id;
      let pathSearch = '/search/user/' + this.props.match.params.user_id;
      return (
        <div>
          <h4>Click To Edit Topic</h4>
          {this.topicsMap(this.state.topics)}
        </div>
      )
    }
  }

  render(){
    return(
      <div className='edit-topics-header'>
          <h2>Edit Topics</h2>
          <Nav user_id={this.props.match.params.user_id}/>
          <div className='topics-page'>
            {this.renderTopics()}
          </div>
      </div>
    )
  }
}


export default EditTopics;
