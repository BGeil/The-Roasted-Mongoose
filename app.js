const express = require(`express`)
const app = express()


// Database
require(`./db/db.js`)



// middleware
app.use(express.static('public'))



// Home page for Roasted Mongoose
app.get(`/rm`, (req, res) => {
	res.render(`index.ejs`)
})







const PORT = 3000;
app.listen(PORT, () => {
	`app is listening on PORT ${PORT}`
})