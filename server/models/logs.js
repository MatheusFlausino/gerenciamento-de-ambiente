const mongoose  = require('mongoose');
const config    = require('../../config/database');

const logsSchema = mongoose.Schema({
    room : {
      type :  String
    },
    dateEvents : [{
        date : Date,
        event : String,
        user_in : [],
        user_out : []        
    }]
});

const Logs = module.exports = mongoose.model('Log', logsSchema);

module.exports.getClassById = function(id, callback){
    Logs.findById(id, callback)
}

module.exports.getClassByBlock = function(block, callback){
    const query = {block: block}
    Logs.findOne(query, callback)
}

module.exports.addRoom = function(newRoom, callback){
    newRoom.save(callback);
}