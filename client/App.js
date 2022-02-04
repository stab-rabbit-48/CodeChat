import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './containers/Login';
import Register from './containers/Register';
import Chatroom from './containers/Chatroom';
import MessageBoard from './containers/MessageBoard';
import io from "socket.io-client";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      currentUserId: null,
      currentChatroom: null,
      token: null,
      loggedIn: true,
      chatrooms: [],
      favorites: ['David', 'Yuanji', 'Evan', 'Charlie', 'Miko', 'Nico', 'Nick', 'Vincent']
    };

    this.logIn = this.logIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount(){
    fetch('/home')
      .then(res => res.json())
      .then(data => {
        return this.setState({
          ...this.state,
          chatrooms: data
        });
      })
      .catch(err => console.log('App.componentDidMount: getChatrooms: ERROR: ', err));

  fetch('/api/users/grabUser')
  .then (res => res.json())
  .then (data => {
    return this.setState({
      ...this.state,
      currentUser: data.username,
      currentUserId: data.user_id
    });
  })

  }

  logIn() {
    this.setState({
      ...this.state,
      loggedIn: true
    })
  }

  signOut() {
    this.setState({
      ...this.state,
      loggedIn: false
    })
  }

  refresh() {
    fetch('/home', {mode: 'cors'})
      .then(res => res.json())
      .then(data => {
        return this.setState({
          ...this.state,
          chatrooms: data
        });
      })
      .catch(err => console.log('App.js METHOD refresh ERROR: ', err));
  }

  render() {
    if(!this.state.loggedIn) {
      return (<Login handleClick={this.logIn}/>)
    }
    const socket = io.connect();
    return (
      <div id='container'>
        <Router>
          <Routes>
            <Route path='/' element={<MessageBoard refresh={this.refresh} signout={this.signOut} name={this.state.currentUser} chatrooms={this.state.chatrooms} favorites={this.state.favorites} socket={socket}/>} />
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/chatroom' element={<Chatroom socket={socket} currentUserId={this.state.currentUserId}/>}/>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
