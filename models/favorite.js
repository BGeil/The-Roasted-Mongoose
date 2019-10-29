
const mongoose = require(`mongoose`)

const favoriteSchema = new mongose.Schema({
	user: {
		type: mongooose.Schema.Types.ObjectId
		ref: 'User'
	},
	recipe: {
		type: mongooose.Schema.Types.ObjectId
		ref: 'recipe'
	}
})


module.exports = mongooose.model(`Favorite`, favoriteSchema)


