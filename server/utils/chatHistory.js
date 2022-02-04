const db = require('../messageBoardModel');

const chatHistory = {};

chatHistory.postMessage = (chatroom_id, user_id, message) => {
    const sqlQuery = `
    INSERT INTO messages (chatroom_id, user_id, message, time_stamp)
    VALUES ( $1, $2, $3, NOW())
    `;
    db.query(sqlQuery,[String(chatroom_id), String(user_id), String(message)], (err, result) => {
      if(err) console.log('error occured', err);
      else console.log(result);
      return;
    });
};

module.exports = chatHistory;