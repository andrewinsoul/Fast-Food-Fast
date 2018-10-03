/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;
let adminToken = '';

describe('Fast-Food-Fast backend tests with postgres database for menu model', () => {
  describe('tests controller that creates a menu', () => {
    it('should login and get token for testing purposes', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'andrewinsoliii@gmail.com',
          password: 'password'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          adminToken = res.body.token;
          done();
        });
    });
    it('should return code 201 with success message when admin user adds a menu with valid payload', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send({
          foodName: 'Indomie and Coke',
          price: 1200
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql('success');
          done();
        });
    });

    it('should return code 403 with error message when authorized user tries to create menu without token', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          foodName: 'food-name',
          price: 666
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.error).to.eql('No token provided');
          done();
        });
    });

    it('should return code 400 with error message when user tries to create menu without price field', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send({
          foodName: 'food-name'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('price field is required');
          done();
        });
    });

    it('should return code 403 with error message when authorized user tries to create menu without token', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          done();
        });
    });
  });
});
