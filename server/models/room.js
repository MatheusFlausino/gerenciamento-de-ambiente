const mongoose  = require('mongoose');
const config    = require('../../config/database');

const RoomSchema = mongoose.Schema({
    block : {
        type : String,
        required: true
    },
    classes : [{
        number : String,
        responsible: [],
        type : String,
        permission_room : Number,
        dateEvents : [{
            date : Date,
            event : [String]      
        }]
    }]
});

const Room = module.exports = mongoose.model('Room', RoomSchema);

module.exports.getClassById = function(id, callback){
    Room.findById(id, callback)
}

module.exports.getClassByBlock = function(block, callback){
    const query = {block: block}
    Room.findOne(query, callback)
}

module.exports.addRoom = function(newRoom, callback){
    newRoom.save(callback);
}