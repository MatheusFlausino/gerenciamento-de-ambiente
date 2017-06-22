// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose    = require('mongoose');
const config      = require('./config/database');

// Get our API routes
const api = require('./server/routes/api');
const users = require('./server/routes/user');
const app = express();

// Database connection
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log(`Connected to database ${config.database}`)
})
mongoose.connection.on('error', (err) => {
  console.log(`DB Error ${err}`)
})

// Parsers for POST data
// BodyPaser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);
app.use('/api/user', users);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));