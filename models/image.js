const mongoose = require('mongoose');
const mai = require('mongoose-auto-increment');

const Schema = mongoose.Schema;


//image schema
let imageSchema = new Schema({
	_id: {type : Number},
	url : {type:String},
	alt_text : {type:String},
	page : {type:String}
});

let historySchema = new Schema({
	_id: {type : Number},
	term : {type:String},
	when : {type:Date, default: Date.now}
})

imageSchema.plugin(mai.plugin,'image');
historySchema.plugin(mai.plugin,'history');

let i = mongoose.model('image', imageSchema);
let h = mongoose.model('history', historySchema);

module.exports = {
	imagemodel:i,
	historymodel:h
}