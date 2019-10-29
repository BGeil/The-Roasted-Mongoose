const express =  require(`express`)
const router = express.Router()
const User = require(`../models/user`)



router.get(`/login`, (req, res) => {
	let messageToShow = ""

	if (req.session.message) {
		messageToShow = req.session.message
		req.session.message = ""
	}

	res.render(`users/login.ejs`, {
		message: messageToShow
	})
})

// this will navigate to the profile page when the
// view profile  link on the nav bar is clicked
router.get('/profile', (req, res) => {
	res.render('users/profile.ejs')
})

// this will be the edit page route and will only be accesible
// thru the user's profile page
router.get('/edit', (req, res) => {
	res.render('users/edit.ejs')
})

//router.post(`/login``)

router.get(`/register`, (req, res) => {
	res.render(`users/register.ejs`)
})

router.post(`/register`, async (req, res, next) => {
	const password = req.body.password
	const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

	const newUserEntry = {};
	newUserEntry.username = req.body.username;
	newUserEntry.password = encryptedPassword;
	try {
		const createdUser = await User.create(newUserEntry);
		console.log(createdUser);
	}
	catch(err) {
		next(err)
	}
	req.session.username = createdUser.username
	req.session.logged = true;
	res.redirect(`/login`)
})




// router.post(`/registration`, async (req, res, next) => {
  

//   // first thing to do is hash the password
//   const password = req.body.password //password fomr the body
//   const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//   const userDbEntry = {};
//   userDbEntry.username = req.body.username;
//   userDbEntry.password = passwordHash;
//   userDbEntry.email =  req.body.email;
//   try {
//     // added the user to the db
//     const createdUser = await User.create(userDbEntry);
//     console.log(createdUser);
//   }
//   catch(err) {
//     next(err)
//   }
//   req.session.username = createdUser.username
//   req.session.logged = true;

//   res.redirect(`/authors`)
// })









module.exports = router;

