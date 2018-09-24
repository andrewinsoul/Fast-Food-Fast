/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import config from '../config/config';

chai.use(chaiHttp);
const { expect } = chai;

describe('Fast-Food-Fast backend tests with postgres database for user model', () => {
  before((done) => {
    config.query('DELETE FROM users').then(() => done());
  });
  describe('tests controller that signs up a user', () => {
    it('should return code 409 with existing email with error message and null token', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'andyjs',
          password: 'NotIntelligentButCurious',
          email: 'andrewinsoul@gmail.com',
          phone: '08166035057',
          address: 'MyCrib'
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('status');
          expect(res.body.status).eql('error');
          expect(res.body.token).to.not.eql(null);
          done();
        });
    });

    it('should return code 400 with error message and null token for an input with invalid email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'andyjss',
          password: 'NotIntelligentButCurious',
          email: 'andrewinsoulgmail.com',
          phone: '12345678909',
          address: 'MyCrib'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).eql('error');
          expect(res.body.error).eql('invalid email');
          done();
        });
    });

    it('should return code 400 with concise error message for input without address field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'andyjss',
          password: 'NotIntelligentButCurious',
          phone: '12345678909',
          email: 'andrewinsoulsw@gmail.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).eql('error');
          expect(res.body.error).eql('address field is required');
          done();
        });
    });

    it('should return code 400 with concise error message for input without username field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          address: 'address',
          password: 'NotIntelligentButCurious',
          phone: '12345678909',
          email: 'andrewinsoulsw@gmail.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).eql('error');
          expect(res.body.error).eql('username field is required');
          done();
        });
    });

    it('should return code 400 with concise error message for invalid username', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          username: '',
          password: 'NotIntelligentButCurious',
          email: 'andrewinsoulsw@gmail.com',
          address: 'Andela Office',
          phone: '12345678976'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).eql('error');
          expect(res.body.error).eql('space character is invalid for username field');
          done();
        });
    });
  });
});
