const db = require('../messageBoardModel')
const chatController = {};

// postMsg
chatController.postMsg = (req, res, next) => {
  const title = req.body.title
    const sqlQuery = `\
    INSERT INTO ${title}_chatroom (title, status, password)\
    VALUES \
    `;

    db.query(sqlQuery)
        .then(data => console.log(data))
        .then(data => res.locals.chat = data.rows)
        .then(data => next())
        .catch((err) => {next('issues with loadChat middleware: ', err)})
}

chatController.getChat = (req, res, next) => {
  const roomID = req.params.id;
  const sqlQuery = `
  SELECT m.user_id, m.message, u.username as name, m.time_stamp
  FROM messages m
  JOIN users u on m.user_id = u.id
  WHERE chatroom_id = $1
  ORDER BY m.time_stamp asc
  `
  db.query(sqlQuery, [String(roomID)], (err, result) => {
    if(err) console.log('error occured in chatController.getChat');
    res.locals.messages = result.rows;
    next();
  });
}


// userEnters
chatController.userIn = (req, res, next) => {


}


// userLeaves
chatController.userOut = (req, res, next) => {


}

// // getFavorites
// chatController.getFavorites = (req, res, next) => {
//   const userId = req.body.userId
//   const sqlQuery = `\
//   SELECT u.favorites
//   FROM userTable u\
//   WHERE u.id = ${userId};
//   `;

//   db.query(sqlQuery)
//     .then((data) => {res.locals.favorites = data.rows})
//     .then(data => next())
//     .catch((err) => {
//       console.log('error in getFavorites middleware')
//       next(err)
//     })
// }

// // loadHome

// // addFavorites
// chatController.addFavorites = (req, res, next) => {
//   const favs = req.body[0]
//   const sqlQuery = `\
//   INSERT INTO userTable (favorite_chatrooms) \
//   VALUES ('${favs}');
//   `;

//   db.query(sqlQuery)
//       .then(data => res.locals.new = data.rows)
//       .then((data) => next())
//       .catch(
//           (err) => {
//               console.log('issues with newChat middleware')
//               next(err)
//       })
// }

// getChat
// chatController.getChat = (req, res, next) => {
//   const chatName = req.body.title;
//   const sqlQuery = `\
//   SELECT c.messages \
//   FROM chatrooms c \
//   WHERE c.title = ${chatName};
//   `;
//   db.query(sqlQuery)
//     .then((data) => res.locals.messages = data.body[0])
//     .then(data => next())
//     .catch((err) => {
//       console.log('error in getChat middleware')
//       next(err)
//     })
// }



module.exports = chatController;