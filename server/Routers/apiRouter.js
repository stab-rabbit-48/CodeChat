const express = require('express');
const router = express.Router();
const chatroomsRouter = require('./chatroomsRouter.js');
const messagesRouter = require('./messagesRouter.js');
const usersRouter = require('./usersRouter.js');

router.use('/chatrooms', chatroomsRouter);
router.use('/messages', messagesRouter);
router.use('/users', usersRouter);

module.exports = router;