
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: true
},
user_id: {
  type: DataTypes.INTEGER,
  allowNull: false
}
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });

    Post.hasMany(models.Review, {
      foreignKey: 'post_id',
      as: 'reviews'
    });
        
  };

  return Post;
};