const express = require('express');
const router  = express.Router();
const logs    = require('../models/logs');

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

module.exports = router;