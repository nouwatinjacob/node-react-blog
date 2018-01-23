import db from '../models';
import Validator from 'validatorjs';

const Review = db.Review;
const Post = db.Post;

const reviewRule = {
  review_body: 'required' 
}

const reviewsController = {
  create(req, res) {
    const body = req.body;
    const validator = new Validator(body, reviewRule);
    if(validator.fails()) {
      return res.status(400).json({ code:400, message: validator.errors.all() });
    }
    Post.findById(req.params.postId)
    .then((post) => {
      if(!post) {
        return res.status(404).json({ code:404, message: 'Blog Post not found'});
      }
      return Review.create({
        review_body : req.body.review_body,
        post_id: req.params.postId,
        user_id: req.decoded.id
      })
      .then((savedReview) => {
        return res.status(201).json({ code: 201, message: 'Review created', data: savedReview});
      })
      .catch(error => res.status(500).json(error));
    })
    .catch(error => res.status(500).json(error));
  }

};

export default reviewsController;