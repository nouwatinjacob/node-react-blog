import jwt from 'jsonwebtoken';
import _ from 'lodash';
import Validator from 'validatorjs';

import db from '../models';

const User = db.User;

const secret = process.env.SECRET_TOKEN;

const userRegRule = {
  first_name: 'required|min:3|alpha',
  last_name: 'required|min:3|alpha',
  username: 'required|min:6|alpha_dash',
  email: 'required|email',
  password: 'required|min:6|alpha_dash',
}

const userController = {

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
      User.findOne({
        where: {
          $or: [{ email: body.email }, { username: body.username }]
        }        
      })
      .then((user) => {
        if(user){
          return res.status(404).json({ code:404, message: 'A user with those credentials already exist' });
        }
        User.create(body)
        .then((savedUser) => {
          const data = _.pick(savedUser, ['id', 'first_name', 'last_name', 'email', 'telephone', 'username', 'avatar' ]);
          const myToken = jwt.sign(data, secret, { expiresIn: 24 * 60 * 60 });
          return res.status(201).json({ code: 201, token: myToken, message: 'Registration Succesfull' });
        })
        .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error));
    }
    else return res.status(400).json({ code:400, message: validator.errors.all() });
  },


};
