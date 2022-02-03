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





module.exports = loginController;