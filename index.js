// Common js modules on server-side. Other import syntax looks like
//    import express from 'express'

// This is the server side 'import statement'
const express = require('express');

// This represents a running instance of express - the app.
// It listens for traffic and routes to handlers.
const app = express();

// Create a route-handler (arg1, arg2) => {} is an anonymous function
// definition, its like a lambda.  Sorta.
//
// app: the running express server
// app.get: creating a new route handler
// app.get('/' : watch for requests accessing '/' 
//     get: get info
//     post: send info
//     put: update all the properties of something
//     delete: delete something
//     patch: update one or two properties of something.
//
// app.get takes two arguments: the first one is the route, the second one is
// the handler.
//
// req: incoming request
// resp: outgoing response
// res.send: immediate response
app.get('/', (req, res) => {
	//res.send({hi: 'there'});
	res.send({bye: "buddy"});
});

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
