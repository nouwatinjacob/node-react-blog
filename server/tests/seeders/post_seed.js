import db from '../../models';

const Post = db.Post;

const seeder = {
  emptyPostTable(done) {
    Post.destroy({ truncate: true, cascade: true, restartIdentity: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setInput(title, post_body, image, views) {
    return {
      title,
      post_body,
      image,
      views
    };
  },
  setUpdatePost(title, post_body, image, views) {
    return {
      title,
      post_body,
      image,
      views
    };
  },
  addPost(done) {
    Recipe.create({
      title: 'Yam Porridge',
      post_body: 'This is just a test, so cool your tension down',
      image: 'yam.img',
      views: 9
    })
      .then(() => done())
      .catch(err => done(err));
  }
};

export default seeder;