import db from '../../models';

const User = db.User;

const seeder = {
  emptyUserTable(done) {
    User.destroy({ truncate: true, cascade: true, restartIdentity: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setInput(first_name, last_name, username, email, password, verify_password) {
    return {
      first_name,
      last_name,
      username,
      email,
      password,
      verify_password
    };
  },
  setLogin(email, password) {
    return { email, password };
  },
  addUser(done) {
    User.create({
      first_name: 'Isioye',
      last_name: 'Mohammed',
      username: 'mohzaky',
      email: 'mohzak@gmail.com',
      password: 'password'
    })
      .then(() => done())
      .catch(err => done(err));
  }
};

export default seeder;