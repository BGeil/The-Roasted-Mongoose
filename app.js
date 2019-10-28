const express = require(`express`)
const app = express()


// Database
require(`./db/db.js`)



// middleware
app.use(express.static('public'))


// controllers

const userController = require(`./controllers/recipesController.js`);
app.use(`/users` , userController);



// Home page for Roasted Mongoose
app.get(`/home`, (req, res) => {
	res.render(`index.ejs`)
})







const PORT = 3000;
app.listen(PORT, () => {
	`app is listening on PORT ${PORT}`
})