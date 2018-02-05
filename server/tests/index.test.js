import chai, {expect} from 'chai';
import supertest from 'supertest';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

const request = supertest(app);

// Test for API home route and invalid routes
describe('GET: /api/v1', () => {
  it('Should return status code 200 when user visits the index route', (done) => {
    chai.request(app)
      .get('/api')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.eql({
          message: 'Welcome to Blog-Me API!'
        });
        done();
      });
  });

  it('Should return status code 404 when user an unregistered route ', (done) => {
    chai.request(app)
      .get('/api/v')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.eql({
          message: 'Invalid Url'
        });
        done();
      });
  });

 });
 


