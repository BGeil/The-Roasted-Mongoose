const express =  require(`express`)
const router = express.Router()
const User = require(`../models/user`)
const bcrypt = require(`bcryptjs`)


// Login Route
router.get(`/login`, (req, res) => {
	res.render(`users/login.ejs`)
})

// this checks to see if there an existing username and password
// if true, the user is logged in
// if false they ger redirected back to the login pa
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
			else{
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


// Register Route
router.get(`/register`, (req, res) => {
	res.render(`users/register.ejs`)
})

// Stores New User in the DB
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



// Profile route
// this will navigate to the profile page when the
// view profile  link on the nav bar is clicked
router.get('/profile', (req, res) => {
	res.render('users/profile.ejs')
})

// Add/Edit Route
// this will be the edit page route and will only be accesible
// thru the user's profile page
router.get('/edit', (req, res) => {
	res.render('users/edit.ejs')
})


module.exports = router;

