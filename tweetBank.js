var Sequelize = require('sequelize');
var db = require("./models/index.js");

// Function to add tweet to the database
var add = function(name, text, picUrl) {
  // Find userId by 'name', and create it if it doesn't exist
  return db.User
    .findOrCreate({
      where: {name: name},
      defaults: {pictureUrl: picUrl || 'https://pbs.twimg.com/profile_images/378800000500453121/0f8ead5d3dbd4e3f747aaca6bf3b8d9a.png'}
  }).spread(function(user, created) {
    return user.get({
      plain: true
    });
    return created; // Figure out if this second return is proper code
  })
    .then(function(user) {
      return db.Tweet.create({UserId: user.id, tweet: text});
  });
};

// Function to list all tweets from the database
var list = function() {
  return db.Tweet.findAll({include: [db.User]});
};

// Function to list all tweets from the database that match certain properties
var find = function(properties) {
  return db.Tweet.findAll({
    include: [{
      model: db.User,
      where: properties
    }]
  });
};

module.exports = {add: add, list: list, find: find};