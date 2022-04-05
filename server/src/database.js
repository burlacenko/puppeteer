const mongoose = require('mongoose');
const User = require('./models/user.model');

const connection = 'mongodb://localhost:27017/puppeteer';

// I added options to test them:
// https://mongoosejs.com/docs/connections.html#options
const options = {
  // these were from the example:
  // autoIndex: false, // Don't build indexes
  // maxPoolSize: 10, // Maintain up to 10 socket connections
  // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4 // Use IPv4, skip trying IPv6

  // I used these to eliminate specific warnings that were present at @5.12.00:
  // useUnifiedTopology: true,
  // useNewUrlParser: true

  // the above warnings are not currently present at @6.2.10
};

const connectDb = () => {
  return mongoose.connect(connection, options);
};

module.exports = connectDb;
