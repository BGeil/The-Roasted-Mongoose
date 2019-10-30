const express =  require(`express`)
const router = express.Router()
const Recipe = require(`../models/recipe`)
const User = require(`../models/user`)



router.get(`/cuisine`, (req, res, next) => {
	try {
		res.render(`recipes/cuisine.ejs`, {
			cuisineTypes: Recipe.schema.path('cuisineType').enumValues
		})
	}
	catch(err) {
		next(err)
	}
})
// This Renders Added Recipe Route
router.get(`/recipesList`, (req, res) => {
	res.render(`recipes/recipesList.ejs`)
})

// Add/Edit Route
// this will be the edit page route and will only be accesible
// thru the user's profile page
router.get('/new', (req, res) => {
	res.render('recipes/new.ejs', {
		cuisineTypes: Recipe.schema.path('cuisineType').enumValues
		// cuisine types
	})
	
})
// index ingredients
// router.get(`/ingredientsShow`, async(req, res) => {
	
// 	res.render(`recipes/ingredientsShow.ejs`)
// })

// create recipe
router.post('/ingredientsShow', async (req, res, next) => {
	try {
			const createdRecipe = await Recipe.create(req.body)
			createdRecipe.name = req.body.name

			console.log('-----------');
			console.log(`created recipe in post route before saving`);
			console.log(createdRecipe);
			console.log('-------------');


		 	const savedRecipe = await createdRecipe.save();
		 	req.session.savedRecipe = savedRecipe;

		 	console.log('this is the saved recipe after creating in the post route');
		 	console.log(savedRecipe);
	

			res.render(`recipes/ingredientsShow.ejs`, {
				savedRecipe: savedRecipe
			})
		}
	catch(err) {
		next(err)
	}
})
// recipe edit (where you add ingredients)


module.exports = router;

