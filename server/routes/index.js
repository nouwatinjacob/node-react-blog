import { usersController, postsController, reviewsController, replyController } from '../controllers';

import authMiddleware from '../middleware/auth';

const routes = (router) => {
  router.route('/')
    .get((req, res) => res.status(200).json({
      message: 'Welcome to Blog-Me API!',
    }));

  router.route('/signup')
    .post(usersController.create);

  router.route('/signin')
    .post(usersController.login);

  router.route('/blog-posts')
    .post(authMiddleware.verifyToken, postsController.create);

  router.route('/blog-posts')
    .get(authMiddleware.verifyToken, postsController.list);

  router.route('/blog-post/:postId')
    .get(authMiddleware.verifyToken, postsController.retrieve);

  router.route('/blog-post/:postId')
    .put(authMiddleware.verifyToken, postsController.update);

  router.route('/blog-post/:postId')
    .delete(authMiddleware.verifyToken, postsController.destroy);

  router.route('/blog-post/:postId/review')
    .post(authMiddleware.verifyToken, reviewsController.create);

  router.route('/blog-post/:postId/review')
    .get(authMiddleware.verifyToken, reviewsController.getAllReviews);
  
  router.route('/:reviewId/reply')
    .post(authMiddleware.verifyToken, replyController.create);

  router.route('/blog-post/:postId/replies')
    .get(authMiddleware.verifyToken, replyController.getAllReply);
  
  router.route('/blog-post/:postId/views')
    .get(authMiddleware.verifyToken, postsController.getPostView);

  };

  export default routes;