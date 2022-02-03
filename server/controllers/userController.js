const dbApi = require('../messageBoardModel.js');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../utils/users');

const userController = {};

userController.verifylogin = (req, res, next) => {
  console.log('heree')
  
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = $1 LIMIT 1';
  const params = [username];
  dbApi.query(query, params)
    .then(data => {
        const defaultAuth = {
          isAuthenticated: false, 
          username: undefined, 
          userID: undefined,
        }
        // if there was no users or multiple users with the same username
        // set isAuthenticated to false and go to next middleware
        if (data.rows.length !== 1) {
            res.locals.user = defaultAuth;
            return next();
        }
        // if there was 1 user, compare the stored hash to the inputted password
        // set isAuthenticated to true and return next if they match
        // if they don't match, set isAuthenticated to false and go to next middleware
        bcrypt.compare(password, data.rows[0].password)
          .then(result => {
            // if result is true, then they are the same
            if (result === true) {
                defaultAuth.isAuthenticated = true;
                defaultAuth.username = username;
                defaultAuth.userID = data.rows[0].id;
                res.locals.user = defaultAuth;
                return next();
            } else {
              res.locals.user = defaultAuth;
              return next();
            }
          })
          // error handling for bcrypt
          .catch(err => { return next({ log: err }) })
    })   
    // error handling for dbApi.query
    .catch(err => {
        return next({
            log: err,
            message: {err: 'An error has occurred in the userController.verifylogin middleware'}
        })
    })
}

userController.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, decoded) => {
    if (decoded) return next();
    else return next({
      log: 'Not signed in'
    });
  })
}

userController.logout = (req, res, next) => {
  res.clearCookie('jwt');
  res.clearCookie('username');
}


userController.setCookieANDToken = (req, res, next) => {
  if (res.locals.user.isAuthenticated && res.locals.user.username) {
    res.locals.user.token = generateAccessToken(res.locals.user.username);
    res.cookie('jwt', res.locals.user.token);
    res.cookie('user_id', res.locals.user.userID);
    res.cookie('username', res.locals.user.username, { httpOnly: true });
  }
  return next();
}

userController.register = (req, res, next) => {
    const { username, password } = req.body;
    const defaultSignup = {
      validSignup: false, 
      username: undefined, 
      userID: undefined
    }
    //check if password and/or username are empty string
    if (!username.length || !password.length) {
        res.locals.user = defaultSignup;
        return next()
    } else {
      const countQuery = `
        SELECT COUNT(*) FROM users
        WHERE username = $1
      `;
      dbApi.query(countQuery, [username], (err, data) => {
        if (err) return next({ log: err });
        // if user already exists in database exit to next middleware 
        if (data.rows[0].count !== '0') {
          res.locals.user = defaultSignup;
          return next()
        } else {
          // if user does not exist in database 
          const saltRounds = 10;
          bcrypt.hash(password, saltRounds, (hashError, hash) => {
            if (hashError) return next({ log: hashError });
            const insertQuery = `
              INSERT INTO users (username, password)
              VALUES ($1, $2) RETURNING (id)
            `;
            const params = [username, hash];
            dbApi.query(insertQuery, params, (queryError, queryResponse) => {
              if (queryError) return next({ log: queryError });
              else {
                console.log("successful account creation returns; is this id?:", queryResponse.rows[0].id)
                defaultSignup.validSignup = true; 
                defaultSignup.username = username; //come back to re-initialize 
                defaultSignup.userID = Number(queryResponse.rows[0].id); //come back to re-initialize 
                res.locals.user = defaultSignup; 
                return next();
              }
            })
          })
        } 
      })
    }
}


userController.addFavChatroom = (req, res, next) => {
  const chatroomId = req.body.chatroomId; 
  const userdId = req.body.userId;
  if (!chatroomId) return next({ log: 'No chatroom id present '});
  const query = `
    INSERT INTO user_chatroom_favorites (user_id, chatroom_id)
    VALUES ($1, $2); 
  `
  const params = [userId, chatroomId]; 
  dbApi.query(query, params, (err, data) => {
    if (err) return next({ log: err });
    return next(); // might need to change <-- 
  })
}

module.exports = userController;