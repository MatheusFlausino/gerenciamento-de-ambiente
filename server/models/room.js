const mongoose  = require('mongoose');
const config    = require('../../config/database');

const RoomSchema = mongoose.Schema({
    block : {
        type : String,
        required: true
    },
    classes : [{}]
});

const Room = module.exports = mongoose.model('Room', RoomSchema);

module.exports.getRoomById = function(id, callback){
    Room.findById(id, callback)
}

module.exports.getRoombyBlock = function(block, callback){
    const query = {block: block}
    Room.findOne(query, callback)
}

module.exports.addRoom = function(newRoom, callback){
    newRoom.save(callback);
}

module.exports.updateClass = function(block, classe, calback){
    Room.update(
        { block: block },
        { $push: {
            classes : {
                $each: classe
                }
            }
        }, 
        calback
        );
}

module.exports.updateEvent = function(block, classe, event, calback){
    Room.update(
        { block: block, "classes.number" : classe },
        {  $push:{
                "classes.$.dateEvent" : { $each: event }
            }
        },
        { upsert: true },
        calback
        );
}

module.exports.getAll = function(callback){
    Room.find({}, {block:1, "classes.number":1, responsible:1, permition:1} , callback);
}

module.exports.getFull = function(callback){
    Room.find({}, callback);
}