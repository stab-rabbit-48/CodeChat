import React, { Component, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import io from "socket.io-client";
import './Chatroom.css';

import ChatRoomInfo from '../components/ChatRoomInfo';
import Messages from '../components/messages/Messages';
import Input from '../components/Input';

const end_point = 'http://localhost:3000/';

// let socket = io(end_point, {
//   "force new connection" : true,
//   "reconnectionAttempts": "Infinity", 
//   "timeout" : 10000, 
//   transports: ['polling', 'websocket'],
// });

const Chatroom = props => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [participants, setParticipants] = useState('');
  const [message, setMessage] = useState('');
  const [prevMessages, setPrevMessages] = useState([]);

  const { state } = useLocation();
  const { socket } = props;

  useEffect(() => {
    // get room_id from props
    // get name from props ?
    console.log(state);
    const { name, room } = state;
    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if (error) alert(error);
    });
  }, [state]);

// --------------------------------------------------------------------

  useEffect(() => {
    // When a message is received from the server
    socket.on('message', ({ user, message }) => {
      // push the received message to prevMessages
      const msgReceived = { user, message };
      setMessage(prevMessages => [...prevMessages, msgReceived]);
    });

    // When roomInfo is received from the server
    socket.on('roomInfo', ({ room, users }) => {
      setParticipants(users);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', { name, message }, () => {
        setMessage('');
      });
    }
  };

  return (
    <div className="chatroom">
      <div className='container'>
        <ChatRoomInfo room={room} />
        <Messages messages={prevMessages} username={name} />
        <Input setMessage={setMessage} sendMessage={sendMessage} message={message}/>
      </div>
    </div>
  );
}

export default Chatroom;
