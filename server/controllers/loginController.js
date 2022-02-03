const dbApi = require('../messageBoardModel.js');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../utils/users');

const loginController = {};

loginController.verifylogin = (req, res, next) => {
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
            res.locals.verifyLogin = defaultAuth;
            return next();
        }
        // if there was 1 user, compare the stored hash to the inputted password
        // set isAuthenticated to true and return next if they match
        // if they don't match, set isAuthenticated to false and go to next middleware
        bcrypt.compare(password, data.rows[0].password)
          .then(result => {
            // console.log('result is:', result)
            // if result is true, then they are the same
            if (result === true) {
                defaultAuth.isAuthenticated = true;
                defaultAuth.username = username;
                defaultAuth.userID = data.rows[0].id;
                res.locals.verifyLogin = defaultAuth;
                return next();
            } else {
              res.locals.verifyLogin = defaultAuth;
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
            message: {err: 'An error has occurred in the loginController.verifylogin middleware'}
        })
    })
}




loginController.register = (req, res, next) => {
    const { username, password } = req.body;
    const defaultSignup = {
      validSignup: false, 
      username: undefined, 
      userID: undefined
    }
    //check if password and/or username are empty string
    if (!username.length || !password.length) {
        res.locals.verifySignup = defaultSignup;
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
          res.locals.verifySignup = defaultSignup;
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
                res.locals.verifySignup = defaultSignup; 
                return next();
              }
            })
          })
        } 
      })
    }
}


module.exports = loginController;