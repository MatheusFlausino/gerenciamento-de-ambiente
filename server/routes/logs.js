const express     = require('express');
const router      = express.Router();
const Log        = require('../models/logs');
const config      = require('../../config/database');

router.get('/', (req, res, next) => {
  Logs.getLogByRoomAndDate({room, date}, (err, log) => {
    if(err) throw err;
    if(!log){
      return res.json({success:false, msg: 'Log not found'})
    }

    return res.json({
      success: true,
      log: {
        id: log._id,
        room : log.room,
        date: log.dateEvents.date,
        event_code: log.dateEvents.code,
        user_in: log.dateEvents.user_in,
        user_out: log.dateEvents.user_out
      }
    })
  })
});

router.post('/create', (req, res, next) => {
  let newLog = new Log({
    room : req.body.room,
    dateEvents: ({
      date: new Date(),
      event_code: req.body.event_code,//MUDAR
      user_in: user._id,//MUDAR
      user_out: user.id,//MUDAR
    })
  })
  Log.addLog(newLog, (err, user) => {
    if(err){
      res.json({success: false, msg: 'Failed to register Log'});
    } else {
      res.json({success: true, msg: 'Successfully added Log'})
    }
  });
});

module.exports = router;
