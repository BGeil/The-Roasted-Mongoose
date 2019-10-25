const express = require('express'); // step 1
const app = express(); // step 1
const PORT = 3000 // step 1


require('./db/db')  //step 2 -
// set up the date connection in our main server file. 
// server.js is executed by node, and all files will be linked to this

// middleware will go below as needed


// step 4: home page route
app.get('/', (req, res) => {
	res.render('index.ejs')
});




app.listen(PORT, () => { // step 1
	console.log('Server is listening on ' + PORT); // step 1
})