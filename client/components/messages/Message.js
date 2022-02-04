import React from 'react';
import './Message.css';

const Message = props => {
  let isSentByCurrentUser = false;
  // props should have a message and username properties
  const { msgReceived} = props;
  // if (author === username) isSentByCurrentUser = true;

  // if (isSentByCurrentUser) {
    // console.log('test'); 
    return (
    <div className='messageContainer justifyEnd backgroundBlue'>
      <div className="textbox">
        <p className='sent'>{msgReceived.name} : </p>
        <div className='textContainer'>
          <p>{msgReceived.message}</p>
        </div>  
      </div>
    </div>
  );
// }
  // else return (
  //   <div className='messageContainer justifyStart backgroundWhite'>
  //     <p className='sent'>test{author}</p>
  //   </div>
  // );
};

export default Message;