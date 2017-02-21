const express = require('express');
const connection = require('./dbconnect');
const bodyParser = require('body-parser');
const models = require('./models/image');
const moment = require('moment');

const IMAGE = models.imagemodel;
const HISTORY = models.historymodel;

let app = express();

//use body parser to get post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/addurl', function(req,res){
	let image = new IMAGE();
	image.url = req.body.url;
	image.alt_text = req.body.alt_text;
	image.page = req.body.page;
	image.save()
	.then(function(image){
		res.send(image);
	})
	.catch(function(err){
		console.log(err)
	});
});

app.get('/imagesearch/:searchTerm', function(req,res){
	let term = req.params.searchTerm;
	let offset = 0;
	if(req.query.offset){
		offset = parseInt(req.query.offset);
	}
	let skipValue = offset * 10;
	IMAGE.find({"alt_text" : {$regex : ".*"+term+".*"}})
	.skip(skipValue)
	.limit(10)
	.exec(function(err,images){
		if(err){
			console.log(err);
		}
		else{
			let history = new HISTORY();
			history.term = term;
			history.when = moment().format();
			history.save(function(err,history){
				if(err){
					console.log(err);
				}
				else{
					res.send(images);
				}
			})
		}
	})
})


app.get('/latest', function(req,res){
	HISTORY.find({})
	.sort({_id:-1})	
	.limit(10)
	.select({term:1, when:1,_id:0})
	.exec(function(err,hists){
		if(err){
			console.log(err);
		}
		else{
			res.send(hists);
		}
	})
})


app.listen(process.env.PORT || 3000);
