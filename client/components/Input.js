import React from 'react';
import './Input.css';

const Input = props => {
  // props should have the following properties
  const { setMessage, name, message, room, socket } = props;

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', { name, message, room }, () => {
        setMessage('');
      });
    }
  };

  return (
    <form className='form' onSubmit={sendMessage}>
      <input className='input' 
             type='text' 
             placeholder='enter a message...' 
             value={message} 
             onChange={e => setMessage(e.target.value)}
             onKeyPress={e => e.key === 'Enter' ? sendMessage : null}
      />
      <button id = "input" className='sendButton'>Send</button>
    </form>
  );
};

export default Input;