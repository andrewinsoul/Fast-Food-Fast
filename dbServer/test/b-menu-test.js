/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../app';

dotenv.load();
chai.use(chaiHttp);
const { expect } = chai;
let adminToken = '';

describe('Fast-Food-Fast backend tests with postgres database for menu model', () => {
  describe('tests controller that creates a menu', () => {
    it('should login and get token for testing purposes', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD
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
          description: 'Indomie coated with two pieces of egg omelette and a coca-cola softdrink',
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
          foodName: 'food name',
          description: 'description'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('price field is required');
          done();
        });
    });

    it('should return code 400 with error message when user tries to create menu without price field', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send({
          foodName: 'food-name',
          price: 1200,
          description: 'description'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('Numbers and special characters not allowed as part of food name, only letters and spaces are allowed');
          done();
        });
    });

    it('should return code 400 with error message when user tries to create menu without description field', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send({
          foodName: 'foodName',
          price: 1200,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('description field is required');
          done();
        });
    });

    it('should return code 400 with error message when user tries to create menu with incorrect data type for description field', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send({
          foodName: 'foodName',
          price: 1200,
          description: 1200
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('invalid type for description, must be a string');
          done();
        });
    });

    it('should return code 400 with error message when user tries to create menu with lengthy content in description field', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send({
          foodName: 'foodName',
          price: 1200,
          description: 'okay, do not try to comprehend wat I am typing because I just want the length of the field to be greater than the max-limit htsaytsytyt sytasyu astsa sausaf saujhdsd dsiydsg duyg idusdf dsuydsu dsuydsgudsgyds ihyg dsjgd sdutds dsyd dsuyug dsdgu dsydsuy dsygdsu dsfdsyt sdufdsu sayfsau sayfsau sufds udsgfu sdutfs asuyfas usafu sauys dsuds udsgu sdugsdu usasf sftdgydfesrfeygd ydygysautsa sautsyts usfududyud uysd sygds dsydsigds dsiygsd dsuydsuydiu kugu i eeueoeouiiuewe oeoer eooiod dodod  ddodh doio reoireoer reoeroereroreoi rroruirehreuiureiureh reor reoreuorhreiuruitr trouitruiorthiutr truiotruoitrh toitoitroitroithtro troitroitroitroitr oi'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('description too long, should not be more than 250 characters');
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
