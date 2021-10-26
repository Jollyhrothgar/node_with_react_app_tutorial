// Common js modules on server-side. Other import syntax looks like
//    import express from 'express'
//  
// This is the server side 'import statement'
const express = require('express');

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

// const passportConfig = require('./services/passport.js'); // This executes the file.
// Because executing passport.js doesn't have any side effects, we don't need to store the output.
// So, we can simply execute this file by requiring it, but we don't need to store anything.
require('./models/User');
require('./services/passport'); // file suffix not required.
// This represents a running instance of express - the app.
// It listens for traffic and routes to handlers.

const app = express();

// Althought keys is already used in ./services/passport, we need it here also, since we don't
// store the results of the passport import.
const keys = require('./config/keys.js');

mongoose.connect(keys.mongoURI);

// Tell express it must use cookies.
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // microseconds, 30 days.
		keys: [keys.cookieKey] // encrypt cookie - sign!
	})
);

// Tell passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

// The by-product of this call is that the arrowfunction we defined in authRoutes will now be
// available to 'call' here. We will call it with the express 'app' after we import the routes.
// We could do the following:
//    const authRoutes = require('./routes/authRoutes');
//    const app = express();
//    authRoutes(app);
//
// However, we can use the one function we define in authRoutes right away, to keep things a little
// cleaner, adding the routes to the app right away.
require('./routes/authRoutes')(app);

// Figure out port dynamically
// heroku grabs the port from environment, so we look this up dynamically.
// 
// If there is not an env variable assigned by heroku, use the default value
// of 5000;
// 
// This is sort of like a ternary operator in python.
const PORT = process.env.PORT || 5000;

// listens on port 500.
app.listen(PORT);
