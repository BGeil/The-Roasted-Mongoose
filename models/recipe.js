// Recipes Model
const mongoose = require(`mongoose`)
const Ingredient = require(`./ingredient.js`)
const cuisines = [`ITALIAN 🇮🇹`, `MEXICAN 🇲🇽`, `CHINESE 🇨🇳`, `JAPANESE 🇯🇵`, `FRENCH 🇫🇷`]

const recipeSchema = new mongoose.Schema({
	name: String,
	recipeImg: String,
	serves: String,
	cost: String,
	cuisineType: {type: String,  enum: cuisines},
	instructions: [String],
	author: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: `User`
	}],
	ingredients: [Ingredient.schema]
})
module.exports = mongoose.model(`Recipe`, recipeSchema)