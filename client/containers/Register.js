import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.scss'

const Register = props => {

  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    
    fetch('api/users/register', {
      method: "POST", 
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    })
      .then(response=>response.json())
      .then(data => { 
        console.log(data);
      })    
  }


  const redirectToLogin = () => {
    // navigate('/login')
  }

  return (
    <div className = "register-container">
      <form onSubmit={handleSubmit} className="register-box">  
        <h3>Register</h3>
        <input type='text' name='username' required placeholder='username'></input>
        <input type='password' name='password' required placeholder='password'></input>
        <button type = 'submit'>Register</button>
        <button type = 'button' onClick = {redirectToLogin}>Already a member? Click here</button>
      </form>
    </div>
  )
}


export default Register;