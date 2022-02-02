const express = require('express');
const router = express.Router();

//api/messages/sendMessages/ ---> add a message to the messages table in the db
router.post('/sendMessages', (req, res) => {
  console.log('hit')
});

//api/messages/deleteMessages/*message_id* ----> delete a specific message message   
router.delete('/deleteMessages/:id', (req, res) => {
  console.log('hit')
});

module.exports = router;