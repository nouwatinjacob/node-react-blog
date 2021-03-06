import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
  }
  }); 

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: 'user_id',
      as: 'posts'
    });
    User.hasMany(models.Review, {
      foreignKey: 'user_id',
      as: 'reviews'
    });
  };

  /**
   * Method for comparing passwords
   */
  User.prototype.comparePassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
  };
  // Hooks
  User.hook('beforeCreate', (user) => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  });

  return User;
};