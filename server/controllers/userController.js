const dbApi = require('../messageBoardModel.js');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../utils/users');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const userController = {};

userController.verifylogin = (req, res, next) => {
  // console.log('enter veryifylogin middleware')
  const { username, password } = req.body; 
  const query = `
    SELECT * FROM users 
    WHERE username = $1 LIMIT 1
  `;


  dbApi.query(query, [username], (err, data) => {
    // console.log('enter dbAPI query of verifylogin middleware')
    if (err) { 
      return next({ log: 'There was an error in userController.verifyLogin query'})
    } 
    if (data.rows.length !== 1) {
      res.locals.isAuthenticated = false;
    }
    bcrypt.compare(password, data.rows[0].password, (err, result) => {
      // console.log('enter bcrypt query of verifylogin middleware')
      if (err) return next({ log: 'There was an error in verifyLogin bcrypt compare'});
      if (result === true) {
        // console.log('bcrypt approved!')
        res.locals.username = username;
        res.locals.userId = data.rows[0].id;
        res.locals.isAuthenticated = true; 
      } else {
        res.locals.isAuthenticated = false; 
      }
      return next();
    })
  })
}


userController.authenticate = (req, res, next) => {
  res.locals.isAuthenticated = false; 
  if (!req.cookies.jwt) {
    return next();
  }
  jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next({ log: err });
    if (decoded) res.locals.isAuthenticated = true; 
    else res.locals.isAuthenticated = false; 
    return next(); 
  })
  
}

userController.logout = (req, res, next) => {
  res.clearCookie('jwt');
  res.clearCookie('username');
}


userController.setCookieANDToken = (req, res, next) => {
  // console.log('enter setCookie middleware')
  // console.log("here", res.locals.isAuthenticated, res.locals.username);
  if (res.locals.isAuthenticated && res.locals.username) {
    // console.log('hit');
    res.locals.token = generateAccessToken(res.locals.username);
    // console.log('enter setCookie middleware if statement. res locals is:', res.locals.token)
    res.cookie('jwt', res.locals.token); //res.locals.token not defined?
    res.cookie('user_id', res.locals.userId);
    res.cookie('username', res.locals.username, { httpOnly: true });

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




// userController.verifylogin = (req, res, next) => {
//   const { username, password } = req.body;
//   const query = 'SELECT * FROM users WHERE username = $1 LIMIT 1';
//   const params = [username];
//   dbApi.query(query, params)
//     .then(data => {
//         const defaultAuth = {
//           isAuthenticated: false, 
//           username: undefined, 
//           userID: undefined,
//         }
//         // if there was no users or multiple users with the same username
//         // set isAuthenticated to false and go to next middleware
//         if (data.rows.length !== 1) {
//             res.locals.user = defaultAuth;
//             return next();
//         }
//         // if there was 1 user, compare the stored hash to the inputted password
//         // set isAuthenticated to true and return next if they match
//         // if they don't match, set isAuthenticated to false and go to next middleware
//         bcrypt.compare(password, data.rows[0].password)
//           .then(result => {
//             // if result is true, then they are the same
//             if (result === true) {
//                 defaultAuth.isAuthenticated = true;
//                 defaultAuth.username = username;
//                 defaultAuth.userID = data.rows[0].id;
//                 res.locals.user = defaultAuth;
//                 return next();
//             } else {
//               res.locals.user = defaultAuth;
//               return next();
//             }
//           })
//           // error handling for bcrypt
//           .catch(err => { return next({ log: err }) })
//     })   
//     // error handling for dbApi.query
//     .catch(err => {
//       return next({
//           log: err,
//           message: {err: 'An error has occurred in the userController.verifylogin middleware'}
//       })
//     })
// }