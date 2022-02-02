const express = require('express');
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const chatController = require('../controllers/chatController');
const router = express.Router();

// home page
 // getting list of all the existing chatrooms
//  homeController.getFavorites,
 // section with favorited chatrooms
router.get('/home',
    homeController.getChatrooms,
    (req, res) => res.status(200).json(res.locals.chatrooms)
)

// // create new chatroom button
//     // post request to server with form data from front end
router.post('/newChat',
    homeController.newChat,
    homeController.participantTable,
    homeController.messagesTable,
    (req, res) => res.status(200).json('[]')
)
    
// // access chatroom 
//will need to be "router.get('/chatroom/*chatroom_id*', -> to access specific chatroom
router.get('/chatroom',
    homeController.loadChat,
    (req, res) => res.status(200).json('foo')
)


    

module.exports = router;