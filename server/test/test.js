/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Fast-Food-App dummy data endpoint tests', () => {
  describe('tests for valid inputs of Fast Food Fast API', () => {
    it('should return code 201 with object of order just added when user access POST /api/v1/orders', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send(
          {
            userId: 1,
            order: [
              { foodId: 2, quantity: 1 },
              { foodId: 1, quantity: 1 }
            ],
            address: 'my house',
            status: 'waiting',
          }
        )
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.eql('success');
          done();
        });
    });

    it('should return code 200 with all orders when user access GET /api/v1/orders', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          expect(res.body.message.length).to.eql(4);
          expect(res.body.message).to.be.an('array');
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.eql('success');
          done();
        });
    });

    it('should return code 200 with specified order when user access GET /api/v1/order/:id', (done) => {
      chai.request(app)
        .get('/api/v1/orders/2')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('order');
          expect(res.body.status).to.eql('success');
          expect(res.body.order.userId).to.eql(1);
          done();
        });
    });

    it('should return code 200 with concise success message when user access PUT /api/v1/order/:id', (done) => {
      chai.request(app)
        .put('/api/v1/orders/2')
        .send({
          status: 'accepted',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          expect(res.body.status).to.eql('success');
          expect(res.body.message).to.eql(
            'status of order successfully updated'
          );
          expect(res.body.order[1].status).to.eql('accepted');
          done();
        });
    });
  });

  describe('tests for invalid inputs of Fast Food Fast API', () => {
    describe('tests for invalid inputs in placing order endpoint', () => {
      it('should return code 400 with error message when user access place order endpoint without address field', (done) => {
        chai.request(app)
          .post('/api/v1/orders')
          .send({
            userId: 1,
            order: [{ foodId: 1, quantity: 3 }],
            status: 'waiting',
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql('the address field is required');
            done();
          });
      });
      it('should return code 400 with concise error message when user access place order endpoint without status field', (done) => {
        const payload = {
          userId: 1,
          order: [{ foodId: 145, quantity: 3 }],
          address: 'address'
        };
        chai.request(app)
          .post('/api/v1/orders')
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql(`foodId ${payload.order[0].foodId} not found`);
            done();
          });
      });
      it('should return code 400 with simple error message when user access the place order endpoint with invalid value for the order field', (done) => {
        chai.request(app)
          .post('/api/v1/orders')
          .send({
            userId: 2,
            order: '',
            status: 'wait',
            address: 'address',
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql('order must be array of objects');
            done();
          });
      });
      it('should return 400 with error message when user access the place order endpoint with invalid input for the userId field', (done) => {
        chai.request(app)
          .post('/api/v1/orders')
          .send({
            userId: 'k',
            order: [{
              foodId: 1, quantity: 3
            }],
            address: 'address',
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql('userId should be a number');
            done();
          });
      });
      it('should return 400 with error message when user access the place order endpoint with empty array in order field', (done) => {
        chai.request(app)
          .post('/api/v1/orders')
          .send({
            userId: 1,
            order: [],
            status: 'wait',
            address: 'address',
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql(
              'cannot place an empty order'
            );
            done();
          });
      });
    });

    describe('tests for invalid inputs in updating the status endpoint', () => {
      it('should return code 400 with concise error message when user access update endpoint without the status field', (done) => {
        chai.request(app)
          .put('/api/v1/orders/2')
          .send({ userId: 2 })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql('the status field is required');
            done();
          });
      });
      it('should return code 400 with error message when user access the update endpoint with unallowed values for the status in status field', (done) => {
        chai.request(app)
          .put('/api/v1/orders/2')
          .send({ status: 'status' })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql(
              'value of status should either be waiting, declined or accepted'
            );
            done();
          });
      });

      it('should return code 400 with error message when user access the update endpoint with unallowed values for the status in status field', (done) => {
        chai.request(app)
          .put('/api/v1/orders/2')
          .send({ status: [] })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql(
              'only strings are allowed for the status field'
            );
            done();
          });
      });
    });

    describe('test for helper function', () => {
      it('should return code 404 with concise error message when id of order is not found', (done) => {
        chai.request(app)
          .get('/api/v1/orders/2100')
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql('order not found');
            done();
          });
      });
    });
  });
});
