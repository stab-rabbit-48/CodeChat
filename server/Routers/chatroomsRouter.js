const express = require('express');
const router = express.Router();

//api/chatrooms/create ----> api to add a chatroom to chatrooms table in db
router.post('/create', (req, res) => {
  console.log('hit')
});

//api/chatrooms/view/*chatroom_id* ---> api to get a specific chatroom from chatrooms table in db
router.get('/view/:id', (req, res) => {
  console.log('hit')
});

//api/chatrooms/view/all ---> api to get all the records of chatrooms table in db
router.get('/view/all', (req, res) => {
  console.log('hit')
});

module.exports = router;