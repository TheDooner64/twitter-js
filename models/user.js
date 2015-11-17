var Sequelize = require('sequelize');

var userModel = function(db) {
  var User = db.define('User', {
    name: Sequelize.STRING,
    pictureUrl: Sequelize.STRING
  }, {
    timestamps: false
  });
  
  return User;
};

module.exports = userModel;