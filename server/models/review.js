
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review_body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  } 
  });

  return Review;
};