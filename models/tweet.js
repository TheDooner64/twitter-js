var Sequelize = require('sequelize');

var tweetModel = function(db) {
  var Tweet = db.define('Tweet', {
    tweet: Sequelize.STRING
  }, {
    timestamps: false
  });
  
  return Tweet;
};

module.exports = tweetModel;