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

// user
// 	username 
// 	pasword
// 	// fav rec

// recipe
// 	cuisine type: string - mongoose enum
// 	name: string
// 	photo: string -- URL
// 	instructions (steps): [Strings] ===> [{ text: String, photo: URL }]
// 	author: {
// 		type: mongooose.Schema.Types.ObjectId
// 		ref: 'User'
// 	}
// 	serves: Number
// 	cost: Numer //***
// 	ingredients: [Ingredient.schema] /// 


// ingredient  // this will just be used as a subdoc
// 	qty
// 	name


// favorite
// 	user: {
// 		type: mongooose.Schema.Types.ObjectId
// 		ref: 'User'
// 	},
// 	recipe: {
// 		type: mongooose.Schema.Types.ObjectId
// 		ref: 'recipe'
// 	}