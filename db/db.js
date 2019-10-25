const mongoose = require('mongoose'); //step 2
// mongoose is an odm
const connectionString = 'mongodb://localhost/rm'; //step 2
// database name is blog

// second argument, options subject, we set certa
mongoose.connect(connectionString, { //step 2
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreatedIndex: true,
	useFindAndMody: false
});

mongoose.connection.on('connected', () => { //step 2
	console.log('Mongoose connected to', connectionString);
});

mongoose.connection.on('disconnected', () => { //step 2
	console.log('Mongoose disconnected');
});

mongoose.connection.on('error', (err) => { //step 2
	console.log('Mongoose error: ', err);
});
