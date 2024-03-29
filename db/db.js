const mongoose = require(`mongoose`)

const connectionString = process.env.MONGODB_URI

mongoose.connect(connectionString, { 
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});


mongoose.connection.on(`connected`,() => {
	console.log(`connected to database: ${connectionString}`);
})

mongoose.connection.on(`disconnected`,() => {
	console.log(`disconnected from database: ${connectionString}`);
})

mongoose.connection.on('error', (err) => {
  console.log('Mongoose error: ', err);
});
