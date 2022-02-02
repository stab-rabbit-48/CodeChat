const request = require('supertest');
const fs = require('fs');
const server = 'http://localhost:3000';

describe('Route integration', () => {  
  describe('/chatrooms/view/:id', () => {
    describe('GET', () => {
      it('it responds with status 200 and a json', () => {
        return request(server)
          .get('/chatrooms/view/:id')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });

  describe('Going to an endpoint that is not valid', ()=> { //404 page  
    describe('GET', ()=> {
      it('should return a 404 error code', async ()=> {
        const response = await request('http:localhost:3000').get('/notarealroute');
        expect(response.statusCode).toEqual(404);
      })
    })
  })
});