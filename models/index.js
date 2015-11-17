var Sequelize = require('sequelize');

// Instantiate the database
  // The three arguments are database name, user, password
var twitterjsDB = new Sequelize('twitterjs', 'root', null,
{
  dialect: 'mysql',
  port: 3306, // Default port for mysql
});

twitterjsDB
  .authenticate()
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  })
  .then(function() {
    console.log('Connection has been established successfully.');
  });

// Define Tweet and User as sequelized classes
  // They're liste as "models" on the twitterjsDB object
var Tweet = require('./tweet')(twitterjsDB);
var User = require('./user')(twitterjsDB);

// adds a UserId foreign key to the `Tweet` table
User.hasMany(Tweet); // Allows us to use method User.getTweets();
Tweet.belongsTo(User);

module.exports = {
  User: User,
  Tweet: Tweet
};