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