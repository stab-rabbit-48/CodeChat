import React, { Component, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import io from "socket.io-client";
import './Chatroom.css';

import ChatRoomInfo from '../components/ChatRoomInfo';
import Messages from '../components/messages/Messages';
import Input from '../components/Input';

const Chatroom = props => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [room_id, setRoom_Id] = useState('');
  const [participants, setParticipants] = useState('');
  const [message, setMessage] = useState('');
  const [prevMessages, setPrevMessages] = useState([]);

  const { state } = useLocation();
  const { socket, currentUserId } = props;

  useEffect(() => {
    
    const { name, room, room_id} = state;
    setRoom(room);
    setName(name);
    setRoom_Id(room_id);
    fetch(`/api/messages/all/${room_id}`)
      .then(res => res.json())
      .then(data => {
        setPrevMessages(data);
        document.getElementById('messageBoard').scrollTo(0, document.getElementById('messageBoard').scrollHeight);
      });

    socket.emit('join', { room_id }, (error) => {
      if (error) alert(error);
    });
  }, [state]);

  socket.on('receivedMessage', (msgPackage) => {
    console.log('msgPackage',   msgPackage);
    setPrevMessages(prevMessages.concat(msgPackage));
    document.getElementById('messageBoard').scrollTo(0, document.getElementById('messageBoard').scrollHeight);
  })

// --------------------------------------------------------------------

  // useEffect(() => {
  //   // When a message is received from the server
  //   socket.on('message', ({ user, message }) => {
  //     // push the received message to prevMessages
  //     const msgReceived = { user, message };
  //     setMessage(prevMessages => [...prevMessages, msgReceived]);
  //   });

  //   // When roomInfo is received from the server
  //   socket.on('roomInfo', ({ room, users }) => {
  //     setParticipants(users);
  //   });
  // }, []);

  return (
    <div className="chatroom">
      <div className='container'>
        <ChatRoomInfo room={room} /> {/*title*/} 
        <Messages messages={prevMessages} username={name} /> {/*messageboard*/}
        <Input setMessage={setMessage} room={room} name={name} message={message} room_id={room_id} socket={socket} currentUserId = {currentUserId}/> {/*inputbox*/}
      </div>
    </div>
  );
}

export default Chatroom;