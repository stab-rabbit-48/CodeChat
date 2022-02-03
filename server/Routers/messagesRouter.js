const express = require('express');
const chatController = require('../controllers/chatController.js');
const router = express.Router();

//api/messages/sendMessages/ ---> add a message to the messages table in the db
router.post('/sendMessages', 
  chatController.postMsg,
  (req, res) => {
    return res.status(200).json(res.locals)
});

//api/messages/deleteMessages/*message_id* ----> delete a specific message message   
router.delete('/deleteMessages/:id', (req, res) => {
  console.log('hit')
});

router.get('/all/:id',chatController.getChat, (req, res) => {
  return res.json(res.locals.messages);
});

module.exports = router;