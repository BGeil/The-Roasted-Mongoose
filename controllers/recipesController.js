const express =  require(`express`)
const router = express.Router()
const Recipe = require(`../models/recipe`)
const User = require(`../models/user`)

// RENDERS CUISINE RECIPE ROUTE
router.get(`/cuisine/`, async (req, res, next) => {
	try {
		res.render('recipes/cuisine.ejs', {
			cuisineTypes: Recipe.schema.path('cuisineType').enumValues,		
		})
	}
	catch(err) {
		next(err)
	}
})
// SHOWS LIST OF RECIPES BASED ON CUISINE TYPE
router.get(`/cuisine/:cuisineType`, async (req, res, next) => {
	try {
		const foundRecipes = await Recipe.find({ cuisineType: req.params.cuisineType })
		
		if (foundRecipes.length > 0) {
			res.render('recipes/recipesList.ejs', { foundRecipes: foundRecipes })
		}
		else {
    		res.render('404.ejs')
		}
	}
	catch(err) {
		next(err)
	}
})
// NEW ROUTE FOR RECIPES
router.get('/new', (req, res) => {
	res.render('recipes/new.ejs', {
		cuisineTypes: Recipe.schema.path('cuisineType').enumValues
	})	
})
// SHOW RECIPE PAGE 
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
// ADDS RECIPE AND REDIRECTS TO SHOW PAGE
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
// EDIT ROUTE
router.get('/:id/edit', async (req, res, next) => {
    try {
        const foundRecipe = await Recipe.findById(req.params.id)
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
// DELETE ROUTE FOR ENTIRE RECIPES
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id);
		res.redirect('/users/profile')
	}
	catch (err) {
		next(err)
	}
})
// DELETE ROUTE FOR INGREDIENTS IN EDIT PAGE
router.delete('/:recipeId/ingredients/:indexOfIngredientInArray', async (req, res, next) => {
	try {
		const recipe = await Recipe.findById(req.params.recipeId);
		recipe.ingredients.splice(req.params.indexOfIngredientInArray,1)
		await recipe.save()
		res.redirect(`/recipes/` + recipe._id  + `/edit#ingredients`)
	}
	catch (err) {
		next(err)
	}
})
module.exports = router;