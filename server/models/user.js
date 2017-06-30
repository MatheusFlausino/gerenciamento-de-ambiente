const mongoose  = require('mongoose');
const bcrypt    = require('bcryptjs');
const config    = require('../../config/database');

const UserSchema = mongoose.Schema({
  name: { type: String },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  position: { type: String },
  permition : { type: String },
  department : { type: String },
  token : { type : String },
  dateEvents : [{}],
  temp_permition_date: { type: Date },
  temp_permition_old: { type: String }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback)
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback)
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash)=>{
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    })
  })
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.updateEvent = function(ra, event, calback){
    User.update(
        { username: ra },
        {  $push:{
                dateEvents : { $each: event }
            }
        },
        { upsert: true },
        calback
        );
}

module.exports.getAll = function(callback){
  User.find({}, { username: 1, name: 1, _id: 1 }, callback);
}
