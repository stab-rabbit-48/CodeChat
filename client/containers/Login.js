import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.scss'

const Login = props => {

  const handleSubmit = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value
    fetch('api/users/verifylogin', {
      method: "POST", 
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    })
      .then(response => response.json())
      .then(data => {console.log('frontend data', data)});
        //look for data.verifyLogin.isAuthenticated 
          //if its true -> get -> api/chatrooms/view/all
          //if its false -> new message saying wrong username and/or password
    
  }

  // handles redirect to signup page 
  // api/users/register
  const handleSignup = (e) => {
    
  }

  return (
    <div className = "login-container">
      <form onSubmit={handleSubmit} className="login-box">  
        <input type='text' name='username' required placeholder='username'></input>
        <input type='password' name='password' required placeholder='password'></input>
        <button id = 'loginButton' type = 'submit'>Login</button>
        <button id = 'signup' type = 'button' onClick = {handleSignup}>Sign Up </button>
      </form>
    </div>
  )
}

export default Login;
