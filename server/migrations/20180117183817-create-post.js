
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      post_body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    views: {
      type: Sequelize.INTEGER,
      allowNull: true
  },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, /* Sequelize */) =>  queryInterface.dropTable('Posts')
};