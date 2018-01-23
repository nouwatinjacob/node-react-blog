
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review_body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  } 
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
    Review.belongsTo(models.Post, {
      foreignKey: 'post_id',
      onDelete: 'CASCADE'
    });

    Review.hasMany(models.Reply, {
      foreignKey: 'post_id',
      as: 'replies'
    });
  };

  return Review;
};