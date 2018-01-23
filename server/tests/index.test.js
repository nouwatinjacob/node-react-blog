import request from 'supertest';
import server from '../../app';

describe('/GET: /api/ Tests for index routes', () => {
  it('should return status code 404 when user visit an unregistered route', (done) => {
    request(app)
      .get('/api/unregisteredroute')
      .expect(404)
      .end(done);
  });
  it('should return status code 200 when user visits the index route', (done) => {
    request(app)
      .get('/api/')
      .expect(200)
      .end(done);
  });
});