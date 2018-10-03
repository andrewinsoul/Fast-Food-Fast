/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;
let adminToken = '';

describe('Fast-Food-Fast backend tests  with postgres database for orders model', () => {
  describe('tests controller that gets all orders', () => {
    it('should login and get token for testing purposes', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'andrewinsoliii@gmail.com',
          password: 'password'
        })
        .end((err, res) => {
          adminToken = res.body.token;
          done();
        });
    });

    it('should return status code 200 and status success when admin user tries to get all orders', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          done();
        });
    });

    it('should return status code 403 and status error when user enters a wrong token', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .set('x-access-token', 'WrongToken')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('Failed to authenticate token');
          done();
        })
    })
  });
});
