// Recipes Model
const mongoose = require(`mongoose`)



const CUISINES = [`ITALIAN`, `MEXICAN`, `CHINESE`, `JAPANESE`, `FRENCH`]



const recipeSchema = new mongoose.Schema({
	name: String,
	recipeImg: String,
	serves: Number,
	cost: Number,
	cuisineType: {type: String,  enum: CUISINES},
	instructions: [{type: String}],
	author: {
		type: mongoose.Schema.Types.ObjectId
		ref: `User`
	},
	// ingredients: //sub ingrediants schema

})




module.exports = mongoose.model(`Recipe`, recipeSchema)





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
// 		type: mongoose.Schema.Types.ObjectId
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