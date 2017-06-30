const express     = require('express');
const router      = express.Router();
const passport    = require('passport');
const jwt         = require('jsonwebtoken');
const User        = require('../models/user');
const config      = require('../../config/database');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    position: req.body.position,
    permission : req.body.permition,
    department : req.body.department,
    token : "",
    dateEvent : [],
  })
  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg: 'Failed to register User'});
    } else {
      res.json({success: true, msg: 'Successfully added User'})
    }
  });
});

router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success:false, msg: 'User not found'})
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            events: user.dateEvents, 
            department: user.department, 
            position: user.position
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'})
      }
    });
  });
});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user})
});

router.get('/', (req, res, next) => {
  User.getAll( (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success:false, msg: 'User not found'})
    }
    return res.json({users: user})
  })
});

router.post('/update/event', (req, res, next) => {
    const user = req.body.username;
    const event = req.body.event;
    User.updateEvent(user, event, (err, events) => {
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

module.exports = router;
