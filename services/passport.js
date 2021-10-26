const passport = require('passport');
// passport uses callbacks: done(error, and result)

// Imports the google oauth strategy.
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');

// Import keys.
// - Local keys: ./config/keys.js
// Paths are relative to file.
const keys = require("../config/keys.js");

// Reference the model rather than importing it directly to avoid confusing mongoose. We pull
// from mongoose here.
const User = mongoose.model('users');

// Define a callback and give it to passport's user serializer handler. Mongo generates a unique
// key for each user (row). id is a shortcut to the mongoDB id.
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// MongoDB id, done callback
passport.deserializeUser((id, done) => {
	// Returns a promise (asynchronous)
	User.findById(id).then(user => {
		done(null, user);
	});
});

// Passport manages authentication using cookies.



// Inform the passport library about oauth.
//  
// passport.use -> a generic register
//
// new means create new instance.
//
// Must give a client id and a client secret. We tell Google what app is associated with
// this API. We registerd the application.
//
// The client id is a public token, anyone can use it.
// The client secret is private, and anyone can act as if they are 'us' for oauth.
//
// Secure storage of client secrets is important!
//
// - In prod, it is common / useful to store secrets in environment variables. However,
//   in dev, we can store them in a file.
passport.use(
	new GoogleStrategy(
		{ // First argument is an object which provides the information needed by google to
			// authenticate. The object requires authentication tokens, to find the right google client
			// associated with the app, and then the secret which authenticates with that client.
			clientID: keys.googleClientID,         // Needs: the client id
			clientSecret: keys.googleClientSecret, // Needs: the clientSecret
			callbackURL: '/auth/google/callback'   // Route the user is sent to after they authenticate.
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id}).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile ID
          console.log(`User ${profile.id} already exists.`);
          // Done is a function that tells Google that we're finished with authentication.
          // Arg 1, Arg 2
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
          console.log(`Creating user ${profile.id}.}`);
        }
      });
    }
  )
);
