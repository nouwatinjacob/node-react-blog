import jwt from 'jsonwebtoken';

import db from '../models';

const User = db.User;

const secret = process.env.SECRET_TOKEN;

const Auth = {
  verifyToken(req, res, next) {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return res.status(401).json({message: 'Invalid authorization token'});
        }
        User.findById(decoded.id)
          .then((user) => {
            if (!user) {
              return Promise.reject('There is no user with this token');
            }
            req.decoded = decoded;
            return next();
          })
          .catch(err => res.status(404).json(err));
      });
    } else {
      res.status(403).json({
        message: 'Token not provided'
      });
    }
  },
  VerifyUser(req, res, next) {
    if (req.decoded && req.decoded.username) return next();
    return res.status(401).json({
      message: 'You must be a User to perform this operation'
    });
  }
};

export default Auth;