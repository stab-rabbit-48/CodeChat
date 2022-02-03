const express = require('express');
const router = express.Router();
const dbApi = require('../messageBoardModel.js');
const loginController = require('../controllers/loginController.js');
const { generateAccessToken } = require('../utils/users');

//api/users/register ----> adds a record to users table db
router.post('/register',
  loginController.register,
  (req, res) => {
    return res.status(200).json(res.locals)
  }
);

//api/users/verifylogin ----> checks the users table to see if it finds a record
router.post('/verifylogin', 
  loginController.verifylogin,
  (req, res, next) => {
    let token; 
    if (res.locals.verifyLogin.username && res.locals.verifyLogin.isAuthenticated) {
      token = generateAccessToken(res.locals.verifyLogin.username);
      res.locals.verifyLogin.token = token;
    }
    return res.status(200).json(res.locals);//.res.json(token);
  }
);



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