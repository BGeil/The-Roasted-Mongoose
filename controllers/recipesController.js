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


// recipe show -- takes ID as a URL parameter, find the recipe w/ that id in DB,
// and renders a template with that data from that recipe inserted 
router.get('/:id', async (req, res, next) => {
	console.log("\nwe just hit recipe show route, here's req.params.id", req.params.id);
	try {
		const foundRecipe = await Recipe.findById(req.params.id)
		res.render(`recipes/ingredientsShow.ejs`, {
			savedRecipe: foundRecipe
		})		
	}
	catch (err) {
		next(err)
	}
})




// create recipe
router.post('/ingredientsShow', async (req, res, next) => {
	try {
			const createdRecipe = await Recipe.create(req.body)
		
			console.log('-----------');
			console.log(`created recipe in post route before saving`);
			console.log(createdRecipe);
			console.log('-------------');


		 	const savedRecipe = await createdRecipe.save();
		 	// req.session.savedRecipe = savedRecipe;

		 	console.log('this is the saved recipe after creating in the post route');
		 	console.log(savedRecipe);
	
		 	// redirect to /recipes/:id -- show page
		 	res.redirect('/recipes/' + savedRecipe._id)

		}
	catch(err) {
		next(err)
	}
})


// 1.
// recipe edit (where you add ingredients) GET /recipes/edit/:id
router.get('/recipes/edit/:id', async (req, res, next) => {
	
})
// similar func to recipe show --
// also renders template that shows existing info, like recipe show AND that has a form to add an ingredient
// that form will post to the following route:


// 2. PUT /recipes/:id
router.put('/recipes/:id')
// get the recipe from db
// adds that ingredient (req.body) to that recipe (push)
// --> .save()
// and redirects back to the recipe edit page 


// (pro tip)
// (link on recipe edit page to say done --> link to show )


// 3.
// make the recipe edit page able to edit the other data as well


// 4. 
/// later: don't let people edit recipes unless they're the ones that created them
// 4a. make the recipe page not work (redirect and show message "you can't") if it's not their recipe
// 4b. only show edit link on show page if it's their recipe



module.exports = router;

