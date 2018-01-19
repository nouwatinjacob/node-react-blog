import usersController from '../controllers';

const routes = (router) => {
  router.route('/')
    .get((req, res) => res.status(200).json({
      message: 'Welcome to Blog-Me API!',
    }));

  router.route('/signup')
    .post(usersController.create);

  router.route('/signin')
    .post(usersController.login);

  };

  export default routes;