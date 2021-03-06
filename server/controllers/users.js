import jwt from 'jsonwebtoken';
import _ from 'lodash';
import dotenv from 'dotenv';
import Validator from 'validatorjs';

import db from '../models';

const User = db.User;

const secret = process.env.SECRET_TOKEN;

const userRegRule = {
  first_name: 'required|min:3',
  last_name: 'required|min:3',
  username: 'required|min:6',
  email: 'required|email',
  password: 'required|min:6',
}

const loginRule = {
  email: 'required|email',
  password: 'required'
}

const usersController = {

  /**
   * Create User and validate request
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   */
  create(req, res) {
    const body = req.body;
    const validator = new Validator(body, userRegRule);
    if(validator.passes()) {
      if(body.verify_password !== body.password) {
        return res.status(401).json({ code:401, message: 'Password does not match' });
      }
      if(!isNaN(parseInt(body.first_name, 10))) {
        return res.status(401).json({ code:401, message: 'The first name field must contain only alphabetic characters.' });
      }
      if(!isNaN(parseInt(body.last_name, 10))) {
        return res.status(401).json({ code:401, message: 'The last name field must contain only alphabetic characters.' });
      }
      User.findOne({
        where:{ username: body.username }               
      })
      .then((user) => {
        if(user){
          if (user.email === body.email) {
            return res.status(400).json({ code: 400, message: `User with ${body.email} already exists` });
          }
          if (user.username === body.username) {
            return res.status(400).json({ code: 400, message: `User with ${body.username} already exists` });
          }
        }
        User.create(body)
        .then((savedUser) => {
          const data = _.pick(savedUser, ['id', 'first_name', 'last_name', 'email', 'username', 'avatar' ]);
          const myToken = jwt.sign(data, secret, { expiresIn: 24 * 60 * 60 });
          return res.status(201).json({ code: 201, token: myToken, message: 'Registration Succesfull' });
        })
        .catch(error => res.status(500).json(error));
      })
      .catch(error => res.status(500).json(error));
    }
    else return res.status(401).json({ code:401, message: validator.errors.all() });
  },
/**
   * Log in user and validate user request
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   */

   login(req, res) {
    const body = req.body;
    console.log(body);
    const validator =  new Validator(body, loginRule);
    if(validator.fails()) {
      return res.status(400).json({ code:400, message: validator.errors.all() });
    }
    return User.findOne({
      where: { email: body.email }
    })
    .then((user) => {
      if(!user) {
        return res.status(404).json({ code: 404, message: 'User not found, please register' })
      }
      if (!user.comparePassword(user, body.password)) {
        return res.status(400).json({ message: 'Password does not match the one in record' });
      }
      const data = _.pick(user, ['id', 'first_name', 'last_name', 'email', 'username', 'avatar' ]);
      const myToken = jwt.sign(data, secret, { expiresIn: 24 * 60 * 60 });
      return res.status(200).json({ code: 200, token: myToken, message: 'Login Succesfull' });
    })
    .catch(error => res.status(500).json(error));

   }

};

export default usersController;