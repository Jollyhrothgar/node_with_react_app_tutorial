// A Mongoose model representing the MongoDB collection Users.
const mongoose = require('mongoose');

// The line below:
//    const Schema = mongoose.Schema; // ES2015 Descructuring
// is identical to:
//    const { Schema } = mongoose;
//
// This process is called destructuring, and it's short-hand for pulling out properties from a
// an object / module to use independently. Seems kinda like a pointer?
// 
// Destructuring is alos sorta like how python does comma assignment, e.g.
//
// [a, b, c, d] = [10, 20, 30, 40] : same as var a = 10...etc.
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const { Schema } = mongoose;

// Mongoose enforces a schema, which curtails our ability to use schema-less storage in MongoDB.
const userSchema = new Schema({
  googleId: String
});

// Create the model class -- two args mean we load a class, not supplying the schema means we're
// defining a model class.
mongoose.model('users', userSchema);
