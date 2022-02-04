import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ChatroomPassword = props => {
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  return(
    <div className='chatroomPassword' id={`password${props.i}`}>
      <h2>Enter Password for <br/>{props.chatroomName}</h2>
      <input type='password' id={`passwordInput${props.i}`} name='password' onChange={e => setPassword(e.target.value)}/>
      <div>
        <button className='enterButton' onClick={(e) => {
          if(password === props.password) navigate('/chatroom', {state: {name: props.name, room: props.chatroomName, room_id: props.room_id}}); else alert('Wrong Password!');
          document.querySelector(`#passwordInput${props.i}`).value='';
        }}>Enter</button>
        <button className='cancelButton' onClick={(e) => {
          document.querySelector(`#password${props.i}`).style.display='none';
          document.querySelector(`#passwordInput${props.i}`).value='';
        }}>Cancel</button>
      </div>
    </div>
  );
};

export default ChatroomPassword;
