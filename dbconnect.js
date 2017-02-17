const mongoose = require('mongoose');
const bluebird = require('bluebird');
const mai = require('mongoose-auto-increment');

mongoose.promise = bluebird;
mongoose.connect("mongodb://localhost:27017/freecodecamp");

let connection = mongoose.connection;
mai.initialize(connection);

connection.on('error', console.error.bind(console, 'Connection Error : '));
connection.on('open',function(){
	console.log('Connected to database: ');
})


module.exports = connection;