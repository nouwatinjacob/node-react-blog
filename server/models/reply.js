
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    reply_body: {
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
    },
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  Reply.associate = (models) => {
    Reply.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
    Reply.belongsTo(models.Post, {
      foreignKey: 'post_id',
      onDelete: 'CASCADE'
    });
    Reply.belongsTo(models.Review, {
      foreignKey: 'review_id',
      onDelete: 'CASCADE'
    });
  };
  
  return Reply;
};