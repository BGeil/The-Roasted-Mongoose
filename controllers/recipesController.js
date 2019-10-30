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

// create recipe
router.post('/ingredientsShow', async (req, res, next) => {
	try {
			const createdRecipe = await Recipe.create(req.body)
			createdRecipe.name = req.body.name

			


		 	const savedRecipe = await createdRecipe.save();
		 	req.session.savedRecipe = savedRecipe;


			res.render(`recipes/ingredientsShow.ejs`, {
				savedRecipe: savedRecipe
			})
		}
	catch(err) {
		next(err)
	}
})


//  add ingredients route

router.post(`/ingredientsShow`, async (req, res, next) => {
	try {
		const ingredients = await Ingredient.create(req.body)

		console.log(`this is the the req.body.savedRecipe on a post route`);

		console.log(req.body.savedRecipe);

		const recipes = Recipe.findOne(req.body.savedRecipe)

		recipes.ingredients.push(ingredients)

		const savedIngredients = await ingredients.save()

		res.redirect(`recipes/ingredientsShow`)

	// req.ingredients.push({
// 	name: 
// 	quantity: 
// })
// await rec.save()
	
	}
	catch(err) {
		next(err)
	}
})


module.exports = router;

