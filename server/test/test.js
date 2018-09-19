import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Fast-Food-App dummy data endpoint tests', () => {
  describe('tests for valid inputs of Fast Food Fast API', () => {
    it('should return code 201 with object of order just added', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          name: 'Tracey Ezezubilike',
          order: 'Spaghetti and Bottled water',
          address: '6 NY street Ikoyi, Lagos',
          status: 'wait',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.eql('success');
        });

      /**
       * This is for seeding purposes for testing the get an order endpoint and get all orders
       */
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          name: 'Andy Smarty',
          order: 'Spaghetti and Bottled water',
          address: '6 NY street Ikoyi, Lagos',
          status: 'wait',
        })
        .end(() => {
          done();
        });
    });

    it('should return code 200 with all orders', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          expect(res.body.message.length).to.eql(2);
          expect(res.body.message).to.be.an('array');
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.eql('success');
          done();
        });
    });

    it('should return code 200 with specified order', (done) => {
      chai.request(app)
        .get('/api/v1/orders/2')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('order');
          expect(res.body.status).to.eql('success');
          expect(res.body.order.name).to.eql('Andy Smarty');
          done();
        });
    });

    it('should return code 200 with concise success message', (done) => {
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
          expect(res.body.message).to.eql('status of order successfully updated');
          expect(res.body.order[1].status).to.eql('accepted');
          done();
        });
    });
  });

  describe('tests for invalid inputs of Fast Food Fast API', () => {
    describe('tests for invalid inputs in placing order endpoint', () => {
      it('should return code 400 with and concise error message', (done) => {
        chai.request(app)
          .post('/api/v1/orders')
          .send({
            name: 'name',
            order: 'order',
            address: 'address',
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql('the status field is required');
          });

        chai.request(app)
          .post('/api/v1/orders')
          .send({
            name: 'name',
            order: 'order',
            status: 'wait',
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql('the address field is required');
          });

        chai.request(app)
          .post('/api/v1/orders')
          .send({
            name: 'name',
            order: '',
            status: 'wait',
            address: 'address',
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql('order field cannot be blank');
          });

        chai.request(app)
          .post('/api/v1/orders')
          .send({
            name: '',
            order: 'order',
            status: 'wait',
            address: 'address',
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql('name field cannot be blank');
          });

        chai.request(app)
          .post('/api/v1/orders')
          .send({
            name: 'name',
            order: 24000,
            status: 'wait',
            address: 'address',
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql('only strings are allowed for the order field');
            done();
          });
      });
    });

    describe('tests for invalid inputs in updating the status of the order endpoint', () => {
      it('should return code 400 with concise error message', (done) => {
        chai.request(app)
          .put('/api/v1/orders/2')
          .send({ name: 'name' })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql('the status field is required');
          });

        chai.request(app)
          .put('/api/v1/orders/2')
          .send({ status: 'status' })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql('error');
            expect(res.body.error).to.eql('value of status should either be waiting, declined or accepted');
            done();
          });
      });
    });

    describe('test for helper function', () => {
      it('should return code 404 with concise error message', (done) => {
        chai.request(app)
          .get('/api/v1/orders/21')
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
