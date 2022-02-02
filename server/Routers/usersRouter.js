const express = require('express');
const router = express.Router();

//api/users/register ----> adds a record to users table db
router.post('/register', (req, res) => {
  console.log('hit')
});

//api/users/verifylogin ----> checks the users table to see if it finds a record
router.post('/verifylogin', (req, res) => {
  console.log('hit')
});

/*----------stretch goals -------------*/
router.post('/favorite', (req, res) => {
  console.log('hit')
});

router.post('/favorite/post/:id', (req, res) => {
  console.log('hit')
});

router.post('/favorite/chatroom/:id', (req, res) => {
  console.log('hit')
});

module.exports= router;