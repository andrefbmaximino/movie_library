const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Create schema
const MovieSchema = new schema({
	Title: {
		type: String,
		required: true
	},
	Poster: {
		type: String,
		required: true
	},
	Plot: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	Year: {
		type: String,
		required: true
	}
});

module.exports = Movie = mongoose.model('movie', MovieSchema);