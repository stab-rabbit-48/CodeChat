const express = require('express');
const socket = require('socket.io');
const app = express();
const cors = require('cors');
const path = require('path');
const { addUser, removeUser, getUser, getUsers } = require('./userFunctions');
const homeController = require('./controllers/homeController');
const loginController = require('./controllers/loginController');
const chatController = require('./controllers/chatController');

const PORT = 3000;

const apiRouter = require('./Routers/apiRouter.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// router handler
app.use('/api', apiRouter);

app.get('/home', homeController.getChatrooms, (req, res) => {
  return res.status(200).json(res.locals.chatrooms);
});

// // create new chatroom button
//     // post request to server with form data from front end
// app.post('/newChat', homeController.newChat, homeController.participantTable, homeController.messagesTable, (req, res) => {
//   return res.status(200).json('[]')
// });
    
// // access chatroom 
//will need to be "router.get('/chatroom/*chatroom_id*', -> to access specific chatroom
app.get('/chatroom', homeController.loadChat, (req, res) => {
  return res.status(200).json('foo')
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
  socket.user = "Me";
  console.log(socket.user + ' connected')
  // when the user enters the room
  socket.on('join', ({ name, room }) => {
    // const { user } = addUser({ name, room });

    // // socket.join(user.room);
    // socket.to(user.room).emit('message', { user: 'admin', message: `${user.name}, welcome to room ${user.room}!` });
    // socket.broadcast.emit('message', { user: 'admin', message: `${user.name} has joined the room!` });
    // io.to(user.room).emit('roomInfo', { room: user.room, users: getUsers(users.room) });
  });

  // when the user send a message
  socket.on('sendMessage', ({ name, message }) => {
    // const user = getUser(name);
    // io.to(user.room).emit('message', { user: user.name, message: message });
  });

  // when the user leave the room
  socket.on('disconnect', () => {
    console.log(socket.user + ' disconnected');
    // const user = removeUser(name);
    // io.to(user.room).emit('message', { user: 'admin', message: `${user.name} has left the room` });
    // io.to(user.room).emit('roomInfo', { room: user.room, users: getUsers(user.room)});
  });
});


// -------------------------------------------------------------------------