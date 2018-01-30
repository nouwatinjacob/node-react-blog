import Validator from 'validatorjs';
const util = require('util');
import check from 'validator';

import db from '../models';

const User = db.User;
const Post = db.Post;
const Review = db.Review;

const postRule = {
  title: 'required|min:3',
  post_body: 'required|min:50',
  image: 'required',
}

const postsController = {

  /**
   * Create Blog Post and validate request
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   */ 
  
  create(req, res) {
    const body = req.body;
    const validator = new Validator(body, postRule);
    if(validator.fails()) {
      return res.status(400).json({ code:400, message: validator.errors.all() });
    }
    if(check.isNumeric(body.title)) {
      return res.status(400).json({ code:400, message: 'The title field must be a string.' });
    }
    if(check.isNumeric(body.post_body)) {
      return res.status(400).json({ code:400, message: 'The post_body field must be a string.' });
    }
    User.findById(req.decoded.id)
    .then((user) => {
      if(!user) {
        return res.status(404).json({code: 404, message: 'This User Does not exit'});
      }
      return Post.create({
        title: body.title,
        post_body: body.post_body,
        image: body.image,
        user_id: req.decoded.id
      })
      .then((post) => {
        return res.status(201).json({ code: 201, message: 'Blog Post has been Posted', data: post });
      })
      .catch(error => res.status(500).json(error));
    })
    .catch(error => res.status(500).json(error));
  },
  
  /**
   * List all Blog Post
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   */

  list(req, res) {
    return Post.findAll({ 
      page: req.query.page, 
      limit: req.query.limit,
      offset: 0
    })
      .then((posts) => {       
        return res.status(200).json({code: 200, message:'All Blog Post', data: posts})
      })
      .catch(error => res.status(500).json(error));
  },

  /**
   * Retrieve a Blog Post
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   */

   retrieve(req, res) {
     Post.findById(req.params.postId, {
      include: [{
        model: Review,
        as: 'reviews'
      }]
     })
     .then((post) => {
      if(!post) {
        return res.status(404).json({code: 404, message: 'This Blog Post Does not exit'}); 
      }      
      return post.update({ views: post.views + 1 });
     })
     .then((post) => {
       if(!post) {
        return res.status(404).json({code: 404, message: 'This Blog Post Does not exit'});
       }
       if (req.decoded && req.decoded.id && req.decoded.id === post.user_id)
        res.status(200).json({code: 200, message: 'A Blog Post with its Reviews', data: post });
     })
     .catch(error => res.status(400).json(error));
   },

   update(req, res) {
    const body = req.body;
    const validator = new Validator(body, postRule);
    if(validator.fails()) {
      return res.status(400).json({ code:400, message: validator.errors.all() });
    } 
     Post.findById(req.params.postId)
     .then((post) => {
      if(!post) {
        return res.status(404).json({code: 404, message: 'This Blog Post Does not exit'});
      }
      return Post.update({
        title: body.title || post.title,
        post_body: body.post_body || post.post_body,
        image: body.image || post.image
      })
      .then((updatedPost) => {
        res.status(200).json({ message: 'Blog Post succesfully updated', updatedPost});
      })
      .catch(error => res.status(400).json(error));
     })
     .catch(error => res.status(400).json(error));
   },

   destroy(req, res) {
     Post.findById(req.params.postId)
     .then((post) => {
      if(!post) {
        return res.status(404).json({code: 404, message: 'This Blog Post Does not exit'});
      }
      return post.destroy()
      .then(() => res.status(200).json({code: 200, message: 'Blog Post Deleted'}))
      .catch(error => res.status(400).json(error));
     })
     .catch(error => res.status(400).json(error));
   },

   getPostView(req, res) {
     Post.findById(req.params.postId)
     .then((post) => {
      if(!post) {
        return res.status(404).json({code: 404, message: 'This Blog Post Does not exit'});
      }
      post = post.views;
      res.status(200).json({code: 200, message: 'Total number of views for this Blog Post', views: post });
     })
     .catch(error => res.status(400).json(error));
   }

};

export default postsController;