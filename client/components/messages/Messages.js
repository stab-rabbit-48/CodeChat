import React from 'react';
import Message from './Message';

const Messages = props => {
  // props should have a messages and username properties
  let { messages } = props;
  // const msgs = messages.map(msgReceived => {
  //   return <div><Message msgReceived={msgReceived} username={username} /></div>;
  // });
  const msgs = messages.map((msgReceived, index) => {
    return <Message key={"message" + index} msgReceived={msgReceived} /> 
  });
  return (
    <div id="messageBoard" className='messagesContainer'>
      {msgs}
    </div>
    );
};

export default Messages;