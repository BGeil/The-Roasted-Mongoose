const mongoose = require(`mongoose`)

const connectionString = `mongodb://localhost/roastedMongoose`

mongoose.connect(connectionString, { 
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});


mongoose.connection.on(`connected`,() => {
	console.log(`Mongoose is connected to ${connectionString}`);
})

mongoose.connection.on(`disconnected`,() => {
	console.log(`Mongoose is disconnected from ${connectionString}`);
})

mongoose.connection.on('error', (err) => {
  console.log('Mongoose error: ', err);
});
