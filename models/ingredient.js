const mongoose = require(`mongoose`)


const ingredientSchema = new mongoose.Schema({
	name: String,
	quantity: Number
})

module.exports = mongoose.model(`Ingredient`, ingredientSchema)