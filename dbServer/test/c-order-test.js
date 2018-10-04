/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../app';

dotenv.load();

chai.use(chaiHttp);
const { expect } = chai;
let adminToken = '', userWithOrderToken = '', userWithNoOrderToken = '';

describe('Fast-Food-Fast backend tests  with postgres database for orders model', () => {
  describe('tests controller that gets all orders', () => {
    it('Admin should login and get token for testing purposes', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD
        })
        .end((err, res) => {
          adminToken = res.body.token;
          done();
        });
    });

    it('should login a user who has order history and get token for testing purposes', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'constance8721@gmail.com',
          password: 'password'
        })
        .end((err, res) => {
          userWithOrderToken = res.body.token;
          done();
        });
    });

    it('should login a user who has not ordered and get token for testing purposes', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'slavas@gmail.com',
          password: 'password'
        })
        .end((err, res) => {
          userWithNoOrderToken = res.body.token;
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

    it('should return status code 401 and status error when user enters a wrong token', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .set('x-access-token', 'WrongToken')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('Failed to authenticate token');
          done();
        });
    });

    it('should return status code 403 and error when a non-admin user tries to access the endpoint', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .set('x-access-token', userWithNoOrderToken)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('forbidden access, only admin is allowed.');
          done();
        });
    });

    it('should return status code 200 when admin tries to update the status of an order with valid payload', (done) => {
      chai.request(app)
        .put('/api/v1/orders/2')
        .set('x-access-token', adminToken)
        .send({
          status: 'cancelled'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          expect(res.body.message).to.eql('updated successfully');
          done();
        });
    });

    it('should return status code 400 when admin tries to update the status of an order without status field', (done) => {
      chai.request(app)
        .put('/api/v1/orders/2')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('status field not found, status field is required');
          done();
        });
    });

    it('should return code 400 when admin enters an unallowed value for status', (done) => {
      const status = 'Wrong value for status';
      chai.request(app)
        .put('/api/v1/orders/2')
        .set('x-access-token', adminToken)
        .send({
          status
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql(`the string ${status} is not allowed for this field, only New, Processing, Cancelled, Complete`);
          done();
        });
    });

    it('should return code 400 when admin enters a value for wrong data type of status', (done) => {
      const status = ['array for status'];
      chai.request(app)
        .put('/api/v1/orders/2')
        .set('x-access-token', adminToken)
        .send({
          status
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('invalid data type for status, must be a string');
          done();
        });
    });

    it('should return status code 404 when admin user tries to get an order not in the database', (done) => {
      chai.request(app)
        .get('/api/v1/orders/3')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('order not found');
          done();
        });
    });

    it('should return status code 200 when admin user tries to get an order in the database', (done) => {
      chai.request(app)
        .get('/api/v1/orders/2')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          expect(res.body).to.have.property('message');
          done();
        });
    });

    it('should return status code 400 when admin user tries to get an order in the database with wrong data type for param', (done) => {
      chai.request(app)
        .get('/api/v1/orders/2srfv')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('invalid data type, param must be an integer');
          done();
        });
    });

    it("should return status code 401 when a user tries to get another user's history of orders.", (done) => {
      chai.request(app)
        .get('/api/v1/users/2/orders')
        .set('x-access-token', userWithOrderToken)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('unauthorized access, cannot view another user history order');
          done();
        });
    });

    it("should return status code 400 when a user tries to get another user's history of orders.", (done) => {
      chai.request(app)
        .get('/api/v1/users/2asw/orders')
        .set('x-access-token', userWithOrderToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('invalid data type, param must be an integer');
          done();
        });
    });

    it('should return status code 200 when a user tries to get another his history of orders.', (done) => {
      chai.request(app)
        .get('/api/v1/users/5/orders')
        .set('x-access-token', userWithOrderToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql('success');
          expect(res.body).to.have.property('message');
          done();
        });
    });

    it('should return status code 404 tries to order for a food not found in database.', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set('x-access-token', userWithNoOrderToken)
        .send({
          orders: JSON.parse(`[
            { "foodId": 1200, "quantity": 3 },
            { "foodId": 5, "quantity": 1 }
          ]`)
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('food not found');
          done();
        });
    });

    it('should return status code 404 tries to order for a food not found in database.', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set('x-access-token', userWithNoOrderToken)
        .send({
          orders: JSON.parse(`[
            { "foodId": 1, "quantity": 3 },
            { "foodId": 2, "quantity": 1 }
          ]`)
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql('success');
          expect(res.body.message).to.eql('order placed successfully');
          done();
        });
    });
  });
});
