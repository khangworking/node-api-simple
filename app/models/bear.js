var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bearSchema = new Schema({
	name : String
});

var Bear = mongoose.model('Bear', bearSchema);

module.exports = Bear;