import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.scss'

const Login = props => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value
    e.target.username.value = '';
    e.target.password.value = '';
    if (!username || !password) return; 
    fetch('api/users/login', {
      method: "POST", 
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('frontend data', data)
        if (data.isAuthenticated === true) {
          navigate('/home');
        }
      });
        //look for data.verifyLogin.isAuthenticated 
          //if its true -> get -> api/chatrooms/view/all
          //if its false -> new message saying wrong username and/or password
    
  }


  return (
    <div className = "login-container">
      <form onSubmit={handleSubmit} className="login-box">  
        <p> Login </p>
        <input type='text' name='username' required placeholder='username'></input>
        <input type='password' name='password' required placeholder='password'></input>
        <button id = 'loginButton' type = 'submit'>Login</button>
        <button id = 'signup' type = 'button' onClick = {() => {navigate('/register')} }>Sign Up </button>
      </form>
    </div>
  )
}

export default Login;
