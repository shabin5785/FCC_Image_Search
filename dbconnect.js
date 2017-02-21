const mongoose = require('mongoose');
const bluebird = require('bluebird');
const mai = require('mongoose-auto-increment');

mongoose.promise = bluebird;
mongoose.connect("mongodb://shabin5785:2plus2@ds157439.mlab.com:57439/shabin_mongo");

let connection = mongoose.connection;
mai.initialize(connection);

connection.on('error', console.error.bind(console, 'Connection Error : '));
connection.on('open',function(){
	console.log('Connected to database: ');
})


module.exports = connection;