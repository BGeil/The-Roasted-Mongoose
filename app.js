const express = require(`express`)
const app = express()
const bodyParser = require('body-parser');
const session = require('express-session');

// Database
require(`./db/db.js`)



// middleware
app.use(express.static('public'))


// controllers

const userController = require(`./controllers/usersController.js`);
app.use(`/users` , userController);
const recipesController = require(`./controllers/recipesController.js`);
app.use(`/recipes` , recipesController);




// Home page for Roasted Mongoose
app.get(`/`, (req, res) => {
	res.render(`index.ejs`)
})







const PORT = 3000;
app.listen(PORT, () => {
	`app is listening on PORT ${PORT}`
})