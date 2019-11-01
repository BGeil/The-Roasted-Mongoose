const express =  require(`express`)
const router = express.Router()
const User = require(`../models/user`)
const Recipe = require(`../models/recipe`)
const bcrypt = require(`bcryptjs`)

// RENDERS LOGIN ROUTE
router.get(`/login`, (req, res) => {
	res.render(`users/login.ejs`)
})
router.post(`/login`, async (req, res, next) => {
	try {
		const foundUser = await User.findOne({username: req.body.username});
		if (foundUser) {
			if (bcrypt.compareSync(req.body.password, foundUser.password)) {
				req.session.message = '';
				req.session.username = foundUser.username;
				req.session.logged = true;
				console.log('password correct');
				res.redirect(`/users/profile`)
			}
			else {
				console.log(`Username or password is incorrect`);
				req.session.message = `Username or password is incorrect`;
				res.redirect(`/users/login`)
			}
		}
		else {
			console.log(`Username or password is incorrect`);
			req.session.message = `Username or password is incorrect`
			res.redirect(`/users/login`)
		}
	}
	catch(err) {
		next(err)
	}
})
// RENDERS REGISTER ROUTE
router.get(`/register`, (req, res) => {
	res.render(`users/register.ejs`)
})
// STORES REGISTER USER INTO DB
router.post(`/register`, async (req, res, next) => {
	const password = req.body.password
	const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

	const newUserEntry = {};
	newUserEntry.username = req.body.username;
	newUserEntry.password = encryptedPassword;
	try {
		const createdUser = await User.create(newUserEntry);
		console.log(createdUser);
		req.session.username = createdUser.username
		res.redirect(`/users/login`)
	}
	catch(err) {
		next(err)
	}

})
// PROFILE ROUTE
router.get('/profile', async (req, res, next) => {
	try {
		const allRecipes =  await Recipe.find()
		res.render('users/profile.ejs', {
			allRecipes: allRecipes
	})
	}
	catch(err) {
		next(err)
	}
})
module.exports = router;