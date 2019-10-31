const express =  require(`express`)
const router = express.Router()
const Recipe = require(`../models/recipe`)
const User = require(`../models/user`)



router.get(`/cuisine/:type`, async (req, res, next) => {
	try {

		// const foundRecipes = await Recipe.find({})


		// res.render('some template', {
		// 		recipes
		// })
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
	try {
		const foundRecipe = await Recipe.findById(req.params.id)
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
        const foundRecipe = await Recipe.findById(req.params.id)
        // that form will post to the following route:
        res.render('recipes/edit.ejs', {
        	savedRecipe: foundRecipe,
        	cuisineTypes: Recipe.schema.path('cuisineType').enumValues
        })
    }
    catch (err) {
        next(err)
    }
})



//ADD INGREDIENTS ROUTE
router.put(`/:id/ingredients`, async (req, res, next) => {
	console.log(req.body);
	try {
		const recipe = await Recipe.findById(req.params.id)
		recipe.ingredients.push({
			name: req.body.name,
			quantity: req.body.quantity
		})
		await recipe.save()
		res.redirect(`/recipes/` + recipe._id  + `/edit#ingredients`)

	}
	catch(err) {
		next(err)
	}
})

// UPDATE ROUTE FOR RECIPE ONLY
router.put(`/:id`, async (req, res, next) => {
	try {
		const findUpdatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true});
		await findUpdatedRecipe.save()
		res.redirect(`/recipes/` + findUpdatedRecipe._id)
	}
	catch(err) {
		next(err)
	}
})

// DELETE ROUTE FOR RECIPES
router.delete('/:id', async (req, res, next) => {
	try {

		console.log('in delete route')
		const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id);
		console.log(deletedRecipe);
		res.redirect('/users/profile')
	}
	catch (err) {
		next(err)
	}
})

// DELETE ROUTE FOR INGREDIENTS
router.delete('/:recipeId/ingredients/:indexOfIngredientInArray', async (req, res, next) => {
	console.log("\nhere is req.params");
	console.log(req.params);
	try {
		
		const recipe = await Recipe.findById(req.params.recipeId);
		console.log("\n here's the reipce we found");
		console.log(recipe);
		// splice out ingredient
		recipe.ingredients.splice(req.params.indexOfIngredientInArray,1)
		await recipe.save()
		res.redirect(`/recipes/` + recipe._id  + `/edit#ingredients`)
		
	}
	catch (err) {
		next(err)
	}
})

// this  the  ENTIRE RECIPE EDIT ROUTE
router.get('/:id/editRecipe', async (req, res, next) => {
    try {
        const foundRecipe = await Recipe.findById(req.params.id)
        res.render('recipes/editRecipe.ejs', {
        	savedRecipe: foundRecipe,
        	cuisineTypes: Recipe.schema.path('cuisineType').enumValues
        })
    }
    catch (err) {
        next(err)
    }
})


// 4. 
/// later: don't let people edit recipes unless they're the ones that created them
// 4a. make the recipe page not work (redirect and show message "you can't") if it's not their recipe
// 4b. only show edit link on show page if it's their recipe






module.exports = router;

