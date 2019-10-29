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

// recipe edit (where you add ingredients)

// create recipe
router.post('/', async (req, res, next) => {
	if (req.session.logged === true){
		try {
				const createdRecipe = await Recipe.create(req.body)
		}
		catch(err) {
			next(err)
		
			}
		res.redirect(`/users/profile`) // use recipe edit above intead
	}
})


module.exports = router;

