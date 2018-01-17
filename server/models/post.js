
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
  } 
  });

  Post.associate = (models) => {
    Post.hasMany(models.Review, {
      foreignKey: 'review_id'
    });
    Post.belongsTo(models.User, {
      foreignKey: 'user_id'
    })    
  };

  return Post;
};