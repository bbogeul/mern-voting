const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'development') {
  mongoose.connection.on('open', function(ref) {
    console.log('Connected to mongo server.');
    //trying to get collection names
    mongoose.connection.db.listCollections().toArray(function(err, names) {
      console.log(names); // [{ name: 'dbname.myCollection' }]
      module.exports.Collection = names;
    });
  });
}
console.log(process.env.DB);
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// export models

// user models
module.exports.User = require('./users/user');
module.exports.UserUpdateHistory = require('./users/user-update-history');
// polls
module.exports.Poll = require('./poll');
