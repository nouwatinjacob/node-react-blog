import Validator from 'validatorjs';

import db from '../models';

const User = db.User;
const Post = db.Post;
const Review = db.Review;

const postRule = {
  title: 'required',
  post_body: 'required',
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
      include: [{ model: Review }]
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

  //  retrieve(req, res) {
  //    Post.findById(req.params.postId, {
  //     include: [{
  //       model: Review,
  //       as: 'reviews'
  //     }]
  //   })
  //    .then((post) => {
  //      console.log(req.params.postId);
  //     if(!post) {
  //       return res.status(404).json({code: 404, message: 'This Blog Post Does not exit'}); 
  //     }
  //     return post.update({ views: post.views + 1 });
  //    })
  //    .then((post) => {
  //      if(!post) {
  //       return res.status(404).json({code: 404, message: 'This Blog Post Does not exit'});
  //      }
  //      if (req.decoded && req.decoded.id && req.decoded.id === post.user_id) recipe.views = 1;
  //       res.status(200).json({ recipe });
  //    })
  //    .catch(error => res.status(500).json(error));
  //  }

};

export default postsController;