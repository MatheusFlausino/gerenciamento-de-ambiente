const express     = require('express');
const router      = express.Router();
const Events      = require('../models/events');
const Room      = require('../models/room');
const User      = require('../models/user');
const config      = require('../../config/database');

router.get('/consult', (req, res, next) => {
  Events.getEventByTimeIn(time_in, (err, events) => {
    if(err) throw err;
    if(!events){
      return res.json({success:false, msg: 'Event not found'})
    }

    return res.json({
      success: true,
      events: {
        time_in: events.time_in,
        time_out: events.time_out,
        description: events.description,
        user_unlock: events.user_unlock
      }
    })
  })
});

router.post('/create', (req, res, next) => {
  let newEvent = new Events({
      time_in : req.body.time_in,
      time_out : req.body.time_out,
      description : req.body.description,
      user_unlock : req.body.user_unlock,
      color : req.body.color
      });
  
  Events.addEvent(newEvent, (err, user) => {
    if(err){
      res.json({success: false, msg: 'Failed to register Event'});
    } else {
      res.json({success: true, msg: 'Successfully added Event'})
    }
  });
});

module.exports = router;