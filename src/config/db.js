const mongoose = require('mongoose');
const {mongoURI} = require('./config')

const connectDB = async () => {
    try {
	//console.log(`${mongoURI}`);
	await mongoose.connect(mongoURI);
	console.log("MongoDB Connected!");
    } catch (err) {
	console.error(err.message);
	process.exit(1);
    }
}

module.exports = connectDB;
