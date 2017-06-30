const mongoose  = require('mongoose');
const config    = require('../../config/database');

const eventSchema = mongoose.Schema({
    time_in : String,
    time_out : String,
    description : String,
    user_unlock : []
});

const Events = module.exports = mongoose.model('Event', eventSchema);

module.exports.getEventById = function(id, callback){
    Events.findById(id, callback);
}

module.exports.getEventByTimeIn = function(time_in, callback){
    const query = {time_in: time_in};
    Events.findOne(query, callback);
}

module.exports.addEvent = function(newEvent, callback){
    newEvent.save(callback);
}
