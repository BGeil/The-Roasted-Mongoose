const express = require(`express`)
const app = express()
const bodyParser = require('body-parser');
const session = require('express-session');

// Database
require(`./db/db.js`)



// middleware
	//css
app.use(express.static('public'))
	//body parser
app.use(bodyParser.urlencoded({extended: false}))

	//session
app.use(session({
  secret: "Shh, This is a secret", 
  resave: false, 
  saveUninitialized: false 
}));




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