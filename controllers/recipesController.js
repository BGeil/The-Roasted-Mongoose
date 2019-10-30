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


// recipe show -- takes ID as a URL parameter, find the recipe w/ that id in DB,
// and renders a template with that data from that recipe inserted 
router.get('/:id', async (req, res, next) => {
	console.log("\nwe just hit recipe show route, here's req.params.id", req.params.id);
	try {
		const foundRecipe = await Recipe.findById(req.params.id)
		console.log(`this is the found recipe in :id route`);
		console.log(foundRecipe);
		res.render(`recipes/show.ejs`, {
			savedRecipe: foundRecipe
		})		
	}
	catch (err) {
		next(err)
	}
})




// creates recipe on new.ejs and redirects to SHOW page
router.post('/show', async (req, res, next) => {
	try {
			const createdRecipe = await Recipe.create(req.body)
		 	const savedRecipe = await createdRecipe.save();
		 	res.redirect('/recipes/' + savedRecipe._id)
	}
	catch(err) {
		next(err)
	}
})

// this shows the page that can add ingreients to the recipe
router.get('/:id/edit', async (req, res, next) => {
    try {
        // similar func to recipe show --
        // also renders template that shows existing info, like recipe show AND that has a form to add an ingredient
        console.log('this is for the edit recipe page.');
        const foundRecipe = await Recipe.findById(req.params.id)
        console.log(`this is the fouund recipe in eidt route`);
        console.log(foundRecipe);
        // that form will post to the following route:
        res.render('recipes/edit.ejs', {
        	savedRecipe: foundRecipe
        })
    }
    catch (err) {
        next(err)
    }
})


//  this page adds ingredients to the recipe
//update route
router.put(`/:id`, async (req, res, next) => {
	console.log(req.body);
	try {

		const recipe = await Recipe.findById(req.params.id)

		recipe.ingredients.push({
			name: req.body.name,
			quantity: req.body.quantity
		})

		await recipe.save()

		res.redirect(`/recipes/` + recipe._id  + `/edit`)

	}
	catch(err) {
		next(err)
	}
})


// this ir the  ENTIRE RECIPE EDIT ROUTE
router.get('/:id/editRecipe', async (req, res, next) => {
    try {
        // similar func to recipe show --
        // also renders template that shows existing info, like recipe show AND that has a form to add an ingredient
        console.log('this is for the edit recipe page.');
        const foundRecipe = await Recipe.findById(req.params.id)
        console.log(`this is the fouund recipe in edit route`);
        console.log(foundRecipe);
        // that form will post to the following route:
        res.render('recipes/editRecipe.ejs', {
        	savedRecipe: foundRecipe,
        	cuisineTypes: Recipe.schema.path('cuisineType').enumValues
        })
    }
    catch (err) {
        next(err)
    }
})



// 3.
// make the recipe edit page able to edit the other data as well


// 4. 
/// later: don't let people edit recipes unless they're the ones that created them
// 4a. make the recipe page not work (redirect and show message "you can't") if it's not their recipe
// 4b. only show edit link on show page if it's their recipe






module.exports = router;

