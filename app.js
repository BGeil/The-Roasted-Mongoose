const dotenv = require('dotenv').config()
const express = require(`express`)
const app = express()
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

// Database
require(`./db/db.js`)



// middleware
	// css
app.use(express.static('public'))
	//body parser
app.use(bodyParser.urlencoded({extended: false}))
// method override
app.use(methodOverride('_method'));
	//session



app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: false 
}));
const PORT = process.env.PORT



// controllers
const userController = require(`./controllers/usersController.js`);
app.use(`/users` , userController);
const recipesController = require(`./controllers/recipesController.js`);
app.use(`/recipes` , recipesController);




// Home page for Roasted Mongoose
app.get(`/`, (req, res) => {
	res.render(`index.ejs`)
})








app.listen(PORT, () => {
	console.log(`app is listening on PORT ${PORT}`);
})