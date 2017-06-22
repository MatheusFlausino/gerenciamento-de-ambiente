const mongoose  = require('mongoose');
const config    = require('../../config/database');

const eventSchema = mongoose.Schema({
    uid : String,
    time_in : String,
    time_out : String,
    description : String,
    user_unlock : []
});

const Evets = module.exports = mongoose.model('Event', eventSchema);

module.exports.getClassById = function(id, callback){
    Evets.findById(id, callback)
}

module.exports.getClassByBlock = function(block, callback){
    const query = {block: block}
    Evets.findOne(query, callback)
}

module.exports.addRoom = function(newRoom, callback){
    newRoom.save(callback);
}