const express = require('express');
const socket = require('socket.io');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');




const PORT = 3000;

const apiRouter = require('./Routers/apiRouter.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.get('/chatroom', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// router handler
app.use('/api', apiRouter);

app.get('/home', homeController.getChatrooms, (req, res) => {
  return res.status(200).json(res.locals.chatrooms);
});

// // access chatroom 
//will need to be "router.get('/chatroom/*chatroom_id*', -> to access specific chatroom
app.get('/chatroom', homeController.loadChat, (req, res) => {
  return res.status(200).json('foo')
});

app.post('/newChat', homeController.newChat, (req, res) => {
  return res.status(200).json('[]');
});

// router error 
app.use((req, res) => {
  return res.status(404).send('This is not the page you\'re looking for...')
});

// express error handler 
app.use((err, req, res, next) => {
  const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: {err: 'An error has occurred!'}
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})

// listen to server
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});


// -------------------------------------------------------------------------
const io = socket(server, {cors : {origin: '*'}});

io.on('connect', socket => {
  // when the user enters the room

  socket.on('join', ({ room }) => {
    socket.join(room);
  });

  // when the user send a message
  socket.on('sendMessage', ({ name, message, room }) => {
    // const user = getUser(name);
    io.to(room).emit('receivedMessage', { name, message });
    // io.sockets.emit('receivedMessage', {name, message});
  });

  //when user lands on homepage
  socket.on('leave', (arr) => {
    for (let i = 0; i < arr.length; i++) {
      socket.leave(arr[i].title);
    }
  })

  // when the user leave the room
  socket.on('disconnect', () => {
    // const user = removeUser(name);
    // io.to(user.room).emit('message', { user: 'admin', message: `${user.name} has left the room` });
    // io.to(user.room).emit('roomInfo', { room: user.room, users: getUsers(user.room)});
  });
});


