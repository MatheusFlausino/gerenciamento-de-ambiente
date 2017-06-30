const mongoose  = require('mongoose');
const config    = require('../../config/database');

const logsSchema = mongoose.Schema({
    room : {
      type :  String
    },
    dateEvents : [{
        date : Date,
        event_description : String,
        user_in : [],
        user_out : []
    }]
});

const Logs = module.exports = mongoose.model('Log', logsSchema);

module.exports.getLogById = function(id, callback){
    Logs.findById(id, callback)
}

module.exports.getLogByRoomAndDate = function({room, date}, callback){
    const query = {room: room, dateEvents: {"$in" : [{date: date}]}}
    Logs.findOne(query, callback)
}

module.exports.addLog = function(newLog, callback){
    newLogs.save(callback)
}
