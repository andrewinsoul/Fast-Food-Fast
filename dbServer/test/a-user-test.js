/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Fast-Food-Fast backend tests with postgres database for user model', () => {
  describe('tests controller that signs up a user', () => {
    it('should return code 201 with success message and token', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'coolfeel',
          password: 'NotIntelligentButCurious',
          email: 'philnew@gmail.com',
          phone: '08166035057',
          address: 'My Crib'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status');
          expect(res.body.message).eql('signup successful');
          expect(res.body.token).to.not.eql(null);
          done();
        });
    });

    it('should return code 409 with existing email with error message and null token', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'coolfeel',
          password: 'NotIntelligentButCurious',
          email: 'philnew@gmail.com',
          phone: '08166035057',
          address: 'My Crib'
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
  describe('tests controller that logins a user', () => {
    it('should return code 200 and return a token when user with an account enters correct login details', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'andrewinsoul@gmail.com',
          password: 'NotIntelligentButCurious'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          expect(res.body.token).to.not.eql(null);
          done();
        });
    });

    it('should return code 400 and null token when user enters login details without email field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          password: 'NotIntelligentButCurious'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('email field is required');
          done();
        });
    });

    it('should return code 400, null token and concise error message when user enters login details with email having a wrong format', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'email',
          password: 'NotIntelligentButCurious'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('invalid email');
          done();
        });
    });

    it('should return code 400 and return null token when user enters login details without password field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'email@email.com'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('password field is required');
          done();
        });
    });
  });
});
