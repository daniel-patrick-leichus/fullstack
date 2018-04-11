module.exports = (sequelize, Sequelize) => {
  const SqlUser = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true

    },
    googleId: {
      type: Sequelize.STRING
    }
  });
  SqlUser.sync({force: true});

  return SqlUser;
}
