const express = require('express');
const router = express.Router();
const dbApi = require('../messageBoardModel.js');
const userController = require('../controllers/userController.js');
const { generateAccessToken } = require('../utils/users');

const loginController = require('../controllers/loginController.js');

//api/users/register ----> adds a record to users table db
router.post('/register',
  userController.register,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

//api/users/verifylogin ----> checks the users table to see if it finds a record
router.post('/login', 
  userController.verifylogin,
  userController.setCookieANDToken,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

router.get('/authenticate', 
  userController.authenticate,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
)

router.get('/logout', 
  userController.logout, 
  (req, res) => {
    return res.status(200).json({ success: true });
  }
)


router.post('/favorite/chatroom/:id',  
  userController.addFavChatroom,
  (req, res) => {
    return res.redirect('/')
  }
);


router.get('/grabUser', loginController.grabUser, (req, res) => {
  console.log('req.cookies', res.locals.user);
  return res.status(200).json(res.locals.user); //res.locals.user = {username: foo, userID: foo}
});

/*----------stretch goals -------------*/
router.post('/favorite', (req, res) => {
  console.log('hit')
});

router.post('/favorite/post/:id', (req, res) => {
  console.log('hit')
});


module.exports= router;