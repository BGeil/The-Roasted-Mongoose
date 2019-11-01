const mongoose = require(`mongoose`)

const ingredientSchema = new mongoose.Schema({
	name: String,
	quantity: String
})
module.exports = mongoose.model(`Ingredient`, ingredientSchema)