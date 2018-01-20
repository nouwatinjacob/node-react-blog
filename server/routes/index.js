import { usersController, postsController, reviewsController } from '../controllers';

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

  router.route('/blog-post')
    .post(authMiddleware.verifyToken, postsController.create);

  router.route('/blog-posts')
    .get(authMiddleware.verifyToken, postsController.list);

  router.route('/blog-post/:post_id/review')
    .post(authMiddleware.verifyToken, reviewsController.create);   

  };

  export default routes;