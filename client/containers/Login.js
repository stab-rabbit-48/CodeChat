import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

async function loginUser(credentials) {
  return fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const Login = props => {

  const handleLogin = () => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: ''
    });
  };

  return (
    <div className="logincontainer">
      <h1>Please Log In via GitHub Authentication</h1>
      <button onClick={props.handleClick}>Login</button>
    </div>
  );
}

export default Login;
