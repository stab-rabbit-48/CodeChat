const db = require('../messageBoardModel')
const homeController = {};


homeController.getChatrooms = (req, res, next) => {
    const sqlQuery = `\
    SELECT * \
    FROM chatrooms;
    `;

    db.query(sqlQuery)
      .then((data) => {
        res.locals.chatrooms = data.rows;
        // console.log('res.locals.chatrooms', res.locals.chatrooms);
        next();
      })
      .catch((err) => {
        console.log('error in getChatrooms middleware')
        next(err)
      })

}

homeController.newChat = (req, res, next) => {
    const { title, status, password } = req.body;
    const params = [ title, status, password];
    const sqlQuery = 'INSERT INTO chatrooms (title, status, password) VALUES ($1,$2,$3)';

    db.query(sqlQuery, params)
        .then((data) => {
            return next();
        })
        .catch(err => next({
            log: `homeController.newChat: ERROR: ${err}`,
            message: { err: 'Error occurred in homeController.newChat. Check server logs for more details.' },
        }));
}

homeController.loadChat = (req, res, next) => {
    const title = req.body.title
    const sqlQuery = `\
    SELECT * \
    FROM ${title}_chatroom \
    `;

    db.query(sqlQuery)
        .then(data => console.log(data))
        .then(data => res.locals.chat = data.rows)
        .then(data => next())
        .catch((err) => {next('issues with loadChat middleware: ', err)})
}

module.exports = homeController;