import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddChatroom = props => {
  const [title, setTitle] = useState();
  const [status, setStatus] = useState('open');
  const [password, setPassword] = useState();
  const [titleError, setTitleError] = useState(null);
  const [statusError, setStatusError] = useState(null);

  const navigate = useNavigate();

  const saveChatroom = () => {
    console.log('saveChatroom invoked');
    if (title === ''){setTitleError('required')}
    else if (status === 'Closed' && password === ''){setStatusError('required')}
    else {
      const body = {
        title,
        status,
        password
      };
      console.log('this is the body', body)
      fetch('/newChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
        .then(resp => props.refresh())
        .catch(err => console.log('issue in AddChatroom frontend: ERROR', err))
    }
  }
  
  return(
    <div id='addChatroom'>
      <h2>Create a Chatroom</h2>
      <div>
        <label htmlFor='chatroomTitle'>Chatroom Title: </label>
        <input type='text' id='chatroomTitle' name='chatroomTitle' onChange={e => setTitle(e.target.value)}/>
      </div>
      <div>
        <label htmlFor='securityStatus'>Security Status: </label>
        <select name='securityStatus' id='securityStatus' onChange={e => setStatus(e.target.value)}>
          <option value='open'>Open</option>
          <option value='closed'>Closed</option>
        </select>
      </div>
      <div>
        <label htmlFor='newPassword'>Password: (if Closed) </label>
        <input type='password' id='newPassword' name='newPassword' onChange={e => setPassword(e.target.value)}/>
      </div>
      <div>
        <button className='submitButton' onClick={(e) => {
          e.preventDefault();
          // console.log(title, status, password);
          saveChatroom();
          document.querySelector('#addChatroom').style.display='none';
        }}>Submit</button>
        <button className='cancelButton' onClick={(e) => {
          e.preventDefault();
          document.querySelector('#addChatroom').style.display='none';
          document.querySelector('#chatroomTitle').value='';
          document.querySelector('#securityStatus').value='Open';
          document.querySelector('#newPassword').value='';
        }}>Cancel</button>
      </div>
    </div>
  );
}

export default AddChatroom;
