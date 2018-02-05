import request from 'supertest';
import dotEnv from 'dotenv';
import jwtDecode from 'jwt-decode';
import { assert } from 'chai';
import app from '../../app';
import seed from './seeders/auth_seed';

process.env.NODE_ENV = 'test';

require('dotenv').config();

describe('POST Test suites for User sign up', () => {
  before(seed.emptyUserTable);
  before(seed.addUser);

  describe('Test case for correct inputs', () => {
    it('should return status code 401 and a message when all input are empty', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('', '', '', '', '', ''))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          //   console.log(res.body);
          assert.deepEqual(res.body, {
            code: 401,
            message:
            {
              first_name: ['The first name field is required.'],
              last_name: ['The last name field is required.'],
              username: ['The username field is required.'],
              email:['The email field is required.'],
              password: ['The password field is required.'] 
            }
          });
          done();
        });
    });
  });


  describe('Test case for first_name inputs', () => {
    it('should return status code 401 and a message when first_name input is empty', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('', 'Ademola', 'ademola23', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.first_name[0], 'The first name field is required.');
          done();
        });
    });
  });

  describe('Test case for first name inputs', () => {
    it('should return status code 401 and a message when first_name input is less than 3 characters', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('Ad', 'Ademola', 'ademola23', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.first_name[0], 'The first name must be at least 3 characters.');
          done();
        });
    });
  });

  describe('Test case for first name inputs', () => {
    it('should return status code 401 and a message when first_name does not consist of alphabetic characters', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('12as33', 'Ademola', 'ademola23', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'The first name field must contain only alphabetic characters.');
          done();
        });
    });
  });

  describe('Test case for last name inputs', () => {
    it('should return status code 401 and a message when last name input is empty', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('Ndubuiisi', '', 'ademola23', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.last_name[0], 'The last name field is required.');
          done();
        });
    });
  });

  describe('Test case for last name inputs', () => {
    it('should return status code 401 and a message when last name input is less than 6 characters', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('Ademola', 'Xu', 'ademola23', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.last_name[0], 'The last name must be at least 3 characters.');
          done();
        });
    });
  });

  describe('Test case for last name inputs', () => {
    it('should return status code 401 and a message when last_name does not consist of alphabetic characters', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('Adebisi', '12as33', 'ademola23', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'The last name field must contain only alphabetic characters.');
          done();
        });
    });
  });

  describe('Test case for username inputs', () => {
    it('should return status code 401 and a message when username input is empty', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('Akpobure', 'Ademola', '', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.username[0], 'The username field is required.');
          done();
        });
    });
  });

  describe('Test case for username inputs', () => {
    it('should return status code 401 and a message when username input is less than 6 characters', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('Ademola', 'Xuinjin', 'ade', 'runtown@gmail.com', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.username[0], 'The username must be at least 6 characters.');
          done();
        });
    });
  });

  describe('Test case for email inputs', () => {
    it('should return status code 401 and a message when email input is empty', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('Issac', 'Ademola', 'ademola23', '', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.email[0], 'The email field is required.');
          done();
        });
    });
  });

  describe('Test case for email inputs', () => {
    it('should return status code 401 and a message when email is not valid', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('Issac', 'Ademola', 'ademola23', 'nondse', 'password', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.email[0], 'The email format is invalid.');
          done();
        });
    });
  });

  describe('Test case for password inputs', () => {
    it('should return status code 401 and a message when password input is empty', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('Nnammani', 'Ademola', 'ademola23', 'runtown@gmail.com', '', 'password'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.password[0], 'The password field is required.');
          done();
        });
    });
  });

  describe('Test case for password inputs', () => {
    it('should return status code 401 and a message when verify password input is empty', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('Nnammani', 'Ademola', 'ademola23', 'runtown@gmail.com', 'password', ''))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Password does not match');
          done();
        });
    });
  });

  describe('Test case for password inputs', () => {
    it('should return status code 401 and a message when verify password input is not equal to password input', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('Nnammani', 'Ademola', 'ademola23', 'runtown@gmail.com', 'password', 'anomaly'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Password does not match');
          done();
        });
    });
  });

  
  describe('Test case for password inputs', () => {
    it('should return status code 401 and a message when the password characters is less than 6', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('Nnammani', 'Ademola', 'ademola23', 'runtown@gmail.com', 'pass', 'pass'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message.password, 'The password must be at least 6 characters.');
          done();
        });
    });
  });

  describe('Test case for correct inputs', () => {
    it('should create a new user and return status 200 and a token', (done) => {
      request(app)
        .post('/api/signup')
        .send(seed.setInput('Nnammani', 'Ademola', 'ademola23', 'runtown@gmail.com', 'password', 'password'))
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          const decodedToken = jwtDecode(res.body.token);
          assert.equal(decodedToken.id, 2);
          assert.equal(decodedToken.username, 'ademola23');
          done();
        });
    });
  });

// Login test

describe('POST Test suites for sign in', () => {
  before(seed.emptyUserTable);
  before(seed.addUser);

  it('should return status code 400 and a message if the email format is invalid', (done) => {
    request(app)
      .post('/api/signin')
      .send(seed.setLogin('Benjamin', 'password'))
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.message.email, 'The email format is invalid.');
        done();
      });
  });

  it('should return status code 404 and a message if the email does not exist', (done) => {
    request(app)
      .post('/api/signin')
      .send(seed.setLogin('Benjamin@gmail.com', 'password'))
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.code, 404);
        assert.equal(res.body.message, 'User not found, please register');
        done();
      });
  });

  it('should return 200 and give the user token if credentials are correct.', (done) => {
    request(app)
      .post('/api/signin')
      .send(seed.setLogin('mohzak@gmail.com', 'password'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.exists(res.body);
        const decodedToken = jwtDecode(res.body.token);
        assert.equal(decodedToken.username, 'mohzaky');
        done();
      });
  });
});
  
});