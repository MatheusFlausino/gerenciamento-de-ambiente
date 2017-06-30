const express     = require('express');
const router      = express.Router();
const Room      = require('../models/room');
const config      = require('../../config/database');


router.get('/enable/:day/:hour_in/:hour_out', (req, res, next) => {
    const day = req.params.day;
    const timeIn = req.params.hour_in;
    const timeOut = req.params.hour_out;

    var createElement = function(strHour) {return  /(\d+):(\d+)/.exec(strHour)};
    var enable = [];
    var blockSelected = '';
    let params = {
        start: createElement(timeIn),
        end: createElement(timeOut)
    }
    Room.getFull( (err, events) => {
        if(err) throw err;
        if(!events){
            return res.json({success:false, msg: 'Not found'})
        }
        events.forEach( (block) => {
                blockSelected = block.block;
                block.classes.forEach( (room) => {
                    var cont = 0;
                    if(room.dateEvent.length <1){
                        room.block = block.block;
                        enable.push(room);
                        return;                        
                    }
                    
                    let eventList = room.dateEvent.filter((item)=> item.date == day);
                    if(eventList.length < 1){
                        room.block = block.block;                        
                        enable.push(room);                                                
                        return;
                    }

                    eventList.forEach( (event) => {
                            let dateEvent = {
                                start: createElement(event.time_in),
                                end : createElement(event.time_out)
                            }
                            if(( dateEvent.start[1] == params.start[1] && 
                                dateEvent.start[2] >= params.start[2]) || 
                                dateEvent.start[1] > params.start[1]) {

                                if ((params.end[1] == dateEvent.start[1] && 
                                    params.end[2] >= dateEvent.start[2]) || 
                                    params.end[1] > dateEvent.start[1]){
                                        cont++;
                                        return;
                                    }
                                }

                            if(( dateEvent.end[1] == params.start[1] && 
                                dateEvent.end[2] >= params.start[2]) || 
                                dateEvent.end[1] > params.start[1]) {
                                
                                if ((params.end[1] == dateEvent.end[1] && 
                                    params.end[2] >= dateEvent.end[2]) || 
                                    params.end[1] > dateEvent.end[1]){
                                        cont++;
                                        return;
                                    }
                                }

                            if(( dateEvent.start[1] == params.start[1] && 
                                dateEvent.start[2] <= params.start[2]) || 
                                dateEvent.start[1] < params.start[1]) {

                                if ((params.end[1] == dateEvent.end[1] && 
                                    params.end[2] <= dateEvent.end[2]) || 
                                    params.end[1] < dateEvent.end[1]){
                                        cont++;
                                        return;
                                    }
                                }

                    });

                    if(!cont){
                        room.block = block.block;
                        enable.push(room);                                                
                    }
                });
        });

        if(enable.length <1)
            return res.json({
                success: false,
                room: "Nao tem disponivel"
                });

        return res.json({
            success: true,
            room: enable
        });
    });
});

router.get('/consult/:block', (req, res, next) => {
    const block = req.params.block;
    Room.getRoombyBlock(block, (err, events) => {
        if(err) throw err;
        if(!events){
        return res.json({success:false, msg: 'Not found'})
        }

        return res.json({   
        success: true,
        room: {
                block : events.block,
                classes : events.classes
            }
        })
    })
});

router.get('/events/:block/:classe', (req, res, next) => {
    const block = req.params.block;
    const classe = req.params.classe;

    Room.getRoombyBlock(block, (err, events) => {
        if(err) throw err;
        if(!events){
            return res.json({success:false, msg: 'Not found'})
        }

        let classeSelected = events.classes.filter((item)=> item.number == classe);
        if(classeSelected[0].dateEvent.length <1){
            return res.json({success:false, msg: 'Not found'})
        }

        let classEvents = classeSelected[0].dateEvent

        return res.json({
            success: true,
            events: classEvents
        })
    })
});

router.get('/events/:block/:classe/:day', (req, res, next) => {
    const block = req.params.block;
    const classe = req.params.classe;
    const day = req.params.day;

    Room.getRoombyBlock(block, (err, events) => {
        if(err) throw err;
        if(!events){
            return res.json({success:false, msg: 'Not found'})
        }

        let classeSelected = events.classes.filter((item)=> item.number == classe);
        if(classeSelected[0].dateEvent.length <1){
            return res.json({success:false, msg: 'Not found'})
        }

        let classEvents = classeSelected[0].dateEvent.filter((item)=> item.date == day);
        if(classEvents.length < 1){
            return res.json({success:false, msg: 'Not found'})
        }

        return res.json({
            success: true,
            events: classEvents
        })
    })
});

router.post('/update/event', (req, res, next) => {
    const block = req.body.block;
    const room = req.body.room;
    const event = req.body.event;
    Room.updateEvent(block, room, event, (err, events) => {
        if(err) throw err;
        if(!events){
            return res.json({success:false, msg: 'Not found'})
        }
        return res.json({
            success: true,
            msg: 'Evento Inserido',
            retorno : events
        })
    })
    
});

router.post('/addroom', (req, res, next) => {
    const block = req.body.block;
    const classes = req.body.classes;
    Room.updateClass(block, classes, (err, events) => {
        if(err) throw err;
        if(!events){
        return res.json({success:false, msg: 'Not found'})
        }
        return res.json({
            success: true,
            msg: 'Classe Inserida',
            retorno : events
        })
    })
    
});

router.post('/create', (req, res, next) => {
    let newRoom = new Room({
            block : req.body.block,
            classes : req.body.classes
        });
    Room.addRoom(newRoom, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register Event'});
        } else {
            res.json({success: true, msg: 'Successfully added Event', retorno: user._id})
        }
    });
});

router.get('/', (req, res, next) => {
  Room.getAll( (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success:false, msg: 'Not found'})
    }
    return res.json({room: user})
  })
});

module.exports = router;
