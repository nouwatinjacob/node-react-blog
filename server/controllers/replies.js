import db from '../models';
import Validator from 'validatorjs';

const Review = db.Review;
const Post = db.Post;
const Reply = db.Reply;

const replyRule ={
  reply_body: 'required'
}

const replyController = {
  create(req, res) {
    const body = req.body;
    const validator = new Validator(body, replyRule);
    if(validator.fails()) {
      return res.status(400).json({ code:400, message: validator.errors.all() });
    }
    Review.findById(req.params.reviewId)
    .then((review) => {
      if(!review){
        return res.status(404).json({ code:404, message: 'Review not found'});
      }
      return Reply.create({
        reply_body: body.reply_body,
        review_id: req.params.reviewId,
        post_id: review.post_id, 
        user_id: req.decoded.id
      })
      .then((savedReply) => {
        return res.status(201).json({ code: 201, message: 'Reply created', data: savedReply});
      })
      .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(400).json(error));
  },
  
  getAllReply(req, res) {
    return Reply.findAll({ 
      page: req.query.page, 
      limit: req.query.limit,
      offset: 0,
      where : { review_id: 1 } 
    })
      .then((replies) => {       
        return res.status(200).json({code: 200, message:"All Review's reply", data: replies})
      })
      .catch(error => res.status(500).json(error));
  }

};

export default replyController;