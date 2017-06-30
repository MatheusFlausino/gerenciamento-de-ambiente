const express       = require('express');
const router        = express.Router();
const logs          = require('../models/logs');
const dateFormate   =  require('dateformat');
const Room          = require('../models/room');


// declare axios for making http requests
//const axios = require('axios');
//const API = 'https://jsonplaceholder.typicode.com';
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/log', (req, res) => {
  res.send({logs : req.logs });
});

router.get('/auth/:token/:block/:number', (req, res, next) =>{
    const token = req.params.token;
    const block = req.params.block;
    const room = req.params.number;
    let day = dateFormate(new Date(), "dd-mm-yyyy");

    var classSelected;

    var createElement = function(strHour) {return  /(\d+):(\d+)/.exec(strHour)};

    let params = {
        now: createElement(dateFormate(new Date(), "MM:ss")),
        start: createElement(dateFormate(new Date(new Date().getTime() + 5*60000), "MM:ss")),
        end: createElement(dateFormate(new Date(new Date().getTime() - 5*60000), "MM:ss"))
    }
    Room.getRoombyBlock(block, (err, events) => {
        if(err) throw err;
        if(!events){
            return res.json({success:false, msg: 'Not found'})
        }
        classSelected = events.classes.filter((item) => item.number == room)[0];
        
        if(classSelected.dateEvents.length <1)
            return res.json({
                success: false,
                msg: 'Sala vaga'
            });
        
        let eventList = room.dateEvents.filter((item)=> item.date == day);        
        if(eventList.length < 1)
            return res.json({
                success: false,
                msg: 'Sala vaga'
            });

        eventList.forEach( (event) => {
            let dateEvent = {
                start: createElement(event.time_in),
                end : createElement(event.time_out)
            }
            if(( dateEvent.start[1] == params.now[1] && 
                dateEvent.start[2] <= params.now[2]) || 
                dateEvent.start[1] < params.now[1]) {
                
                if ((params.now[1] == dateEvent.end[1] && 
                    params.now[2] <= dateEvent.end[2]) || 
                    params.nowend[1] < dateEvent.end[1]){
                        //Compara token
                        for(let tag of event.tokens)
                            if(tag == token)
                                return res.json({
                                    success: true,
                                    msg: 'Sala reservada'
                                });
                            else
                                return res.json({
                                    success: false,
                                    msg: 'Sala reservada'
                            });
                    }
                }
            if(( dateEvent.start[1] == params.start[1] && 
                dateEvent.start[2] <= params.start[2]) || 
                dateEvent.start[1] < params.start[1]) {

                if ((params.start[1] == dateEvent.end[1] && 
                    params.start[2] <= dateEvent.end[2]) || 
                    params.start[1] < dateEvent.end[1]){
                        //Compara token
                        for(let tag of event.tokens)
                            if(tag == token)
                                return res.json({
                                    success: true,
                                    msg: 'Sala reservada'
                                });
                            else
                                return res.json({
                                    success: false,
                                    msg: 'Sala reservada'
                                });
                    }
                }

            if(( dateEvent.start[1] == params.end[1] && 
                dateEvent.start[2] <= params.end[2]) || 
                dateEvent.start[1] < params.end[1]) {
                
                if ((params.end[1] == dateEvent.end[1] && 
                    params.end[2] <= dateEvent.end[2]) || 
                    params.end[1] < dateEvent.end[1]){
                        //Compara token
                        for(let tag of event.tokens)
                            if(tag == token)
                                return res.json({
                                    success: true,
                                    msg: 'Sala reservada'
                                });
                            else
                                return res.json({
                                    success: false,
                                    msg: 'Sala reservada'
                                });
                    }
                }
        });

        return res.json({
            success: false,
            msg: 'ERROR'
        });
    });
})

module.exports = router;