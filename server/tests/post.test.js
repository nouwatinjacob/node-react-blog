import request from 'supertest';
import chai from 'chai';
import app from '../../app';
import seed from './seeders/auth_seed';
import postSeed from './seeders/post_seed';

process.env.NODE_ENV = 'test';

const assert = chai.assert;

require('dotenv').config();

describe('TEST POST ROUTES', ()=> {
  let user_id;
  before(seed.emptyUserTable);
  before(seed.addUser);
  before(postSeed.emptyPostTable);
  before(postSeed.addPost);

  let userToken; // store token for normal user authentication
  before((done) => {
    request(app)
      .post('/api/signin')
      .send(seed.setLogin('mohzak@gmail.com', 'password'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        userToken = res.body.token;
        done();
      });
  });

  describe('POST api/blog-posts when creating Posts', () => {
    describe('test for empty, valid and invalid token when creating a Post', () => {
      it('should return status code 403 when no token is provided', (done) => {
        request(app)
          .post('/api/blog-posts')
          .send(postSeed.setInput('The begining of Laravel Revolution',
          'This is just a test, so cool your tension down',
          'beans-porage.jpg','',1))
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Token not provided');
            done();
          });
        });

        it('should return status code 401 when invalid token is provided', (done) => {
          request(app)
            .post('/api/blog-posts')
            .set({ 'x-access-token': 'bajjlkall' })
            .send(postSeed.setInput('The begining of Laravel Revolution',
              'This is just a test, so cool your tension down',
              'beans-porage.jpg','',1))
            .expect(401)
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.body.message, 'Invalid authorization token');
              done();
            });
        });
        
        it('should return status code 201 and create book when token valid and authorised', (done) => {
          request(app)
            .post('/api/blog-posts')
            .set({ 'x-access-token': userToken })
            .send(postSeed.setInput('The begining of Laravel Revolution',
              'This is just a test, so cool your tension down',
              'beans-porage.jpg', 1))
            .expect(201)
            .end((err, res) => {
              if (err) return done(err);
              userID = userToken.de
              assert.equal(res.body.message, 'Blog Post has been Posted');
              assert.equal(res.body.data.title, 'The begining of Laravel Revolution');
              assert.equal(res.body.data.post_body, 'This is just a test, so cool your tension down');
              assert.equal(res.body.data.image, 'beans-porage.jpg');
              assert.equal(res.body.data.user_id, 1);
              done();
            });
        });
      
    });
  });

  describe('test for typeof and required length of some book details', () => {
    it('should return status code 400 if title length < 3', (done) => {
      request(app)
      .post('/api/blog-posts')
      .set({ 'x-access-token': userToken })
      .send(postSeed.setInput('on',
        'This is just a test, so cool your tension down',
        'beans-porage.jpg', 1))
      .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.title[0], 'The title must be at least 3 characters.');
          done();
        });
    });

    it('should return status code 400 if title field is empty', (done) => {
      request(app)
      .post('/api/blog-posts')
      .set({ 'x-access-token': userToken })
      .send(postSeed.setInput('',
        'This is just a test, so cool your tension down',
        'beans-porage.jpg', 1))
      .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.title[0], 'The title field is required.');
          done();
        });
    });

    it('should return status code 401 if title field is not a string', (done) => {
      request(app)
      .post('/api/blog-posts')
      .set({ 'x-access-token': userToken })
      .send(postSeed.setInput('1234',
        'This is just a test, so cool your tension down',
        'beans-porage.jpg', 1))
      .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.title, 'The title field must be a string.');
          done();
        });
    });

  });

});