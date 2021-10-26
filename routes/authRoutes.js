const passport = require('passport');

// This is a hack that uses a lambda (arrow function) to essentially execute this code in another
// context. By setting the code up like this, we can define this file, expecting a varaible 'app',
// which is defined as an express module to already exist. Then we can import this file in the
// index, after we have defined app. What a hack...
//
// Module.exports is kind of like a 'return value' for importing a module with
// 'require('something')'. In this case, we're exporting a function, that takes an argument (app)
// and does stuff to it.
module.exports = app => {

  /* ORIGINAL ROUTES */
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
  /* Old Test Route
  app.get('/', (req, res) => {
    //res.send({hi: 'there'});
    res.send({bye: "buddy"});
  });
  */


  // Now, we need to set up the endpoint which will handle user authentication.
  //
  // Javascript makes use of ad-hoc objects much more frequenlty than python does, it seems. These
  // objects seem to be defined in-line very often.
  //
  // For app endpoints (remember, app is an express instance), we give it a route, and a handler.
  //
  // Consider the following:
  //   - We never told anyone that our google strategy is called 'google'. We didn't register this
  //     with passport.
  //   - Internally to google's strategy - Google self-identifies as the string 'google'. So other
  //     services know to look up google by name - 'google'.
  //
  // A possible error to get for misconfigured oauth with Google is 400 - 'redirect_uri_mismatch'.
  // With google, we can investigate the URL parameters, and the redict_uri might show up there.
  app.get(
    '/auth/google', 
    passport.authenticate(
      'google', // look up the strategy named 'google' -> the GoogleStrategy object is named 'google'
                // internally.

      { // this is an options object.
        scope: ['profile', 'email'] // internal scopes / lists in the GoogleStrategy object. We can
                                    // specify scopes here (e.g. profile, google photos, drive files,
                                    // and so-on. 
      }
    )
  );

  // We need to have a route-handler to do the handshake with google which occurs after /auth/google
  //
  app.get(
    '/auth/google/callback', 
    passport.authenticate('google') // tell passport to use the Google strategy.
  );

  app.get('/api/logout', (req, res) => {
    // passport attaches this automatically. Passport kills the cookie id.
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

};
