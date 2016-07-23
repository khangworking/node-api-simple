//call packeges we need
var express = require('express'); // call express
var bodyParser = require('body-parser');
var app = express(); // define app express

var mongoose = require('mongoose') // define mongoose
// connect mongo db
mongoose.connect('mongodb://khang:3111410034@ds027425.mlab.com:27425/gaming');

// define bear class
var Bear = require('./app/models/bear');

//config app
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

//set port
var port = process.env.port || 3000;

// router
var router = express.Router();

//define middleware router

var logger = function(req,res,next) {
	console.log(req.ip + ': ' + req.method + ' ' + req.path);
	next();
};

router.use(logger);

router.get('/', function(req,res) {
	res.json({
		'message' : 'Welcome to my api'
	});
});

// create and get all bear route
router.route('/bear')
	.post(function(req,res) {
		var bear = new Bear;
		bear.name = req.body.name;
		bear.save(function(err) {
			if (err)
				res.send(err);
			res.json({
				'message' : 'bear created'
			});
		})
	})
	.get(function(req,res) {
		Bear.find(function(err,bears) {
			if (err)
				res.send(err);
			res.json(bears);
		});
	});

// get, update and delete a single bear
router.route('/bear/:id')
	.get(function(req,res) {
		Bear.findById(req.params.id, function(err,bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})
	.put(function(req,res) {
		Bear.findById(req.params.id, function(err,bear) {
			if (err)
				res.send(err);
			bear.name = req.body.name;

			bear.save(function(err) {
				if (err)
					res.send(err);
				res.json({
					'message' : 'bear updated'
				});
			});
		})
	})
	.delete(function(req,res) {
		Bear.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			res.json('Bear removed');
		});
	});

app.use('/api', router);

app.listen(port);
console.log('Server started on port ' + port);