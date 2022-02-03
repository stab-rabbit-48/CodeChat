const express = require('express');
const router = express.Router();
const dbApi = require('../messageBoardModel.js');
const userController = require('../controllers/userController.js');
const { generateAccessToken } = require('../utils/users');


//api/users/register ----> adds a record to users table db
router.post('/register',
  userController.register,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

//api/users/verifylogin ----> checks the users table to see if it finds a record
router.post('/verifylogin', 
  userController.verifylogin,
  userController.setCookieANDToken,
  (req, res) => {
    return res.status(200).json(res.locals);//.res.json(token);
  }
);

router.get('/authenticate', 
  // userController.authenticate,
  // (req,res) => {
  //   return res.status(200).send()
  // }
)

router.get('/logout', 
  userController.logout, 
  (req, res) => {
    return res.redirect('/login');
  }
)


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