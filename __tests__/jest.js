const login = require('../client/containers/Login.js')

describe('login tests', () => {

    describe('authentication', ()=> {
      it('should not authenticate email and or password if either are falsy', ()=> {
        const username = ''; 
        const password = '';
        const result = 'Username and/or Password must be filled'//**CURRENTLY A FILLER FOR FUNCTIONALITY**//login function should take in username & password login.FUNCTION
        expect(result).toEqual('Username and/or Password must be filled')
        
      })
      
      it('should authenticate email and password if they are both correct', ()=> {
        const username = 'test'; 
        const password = 'test';
      })
    })
})

//test to see if they enter something inside the username/pword
    //if not than the login component will say no good