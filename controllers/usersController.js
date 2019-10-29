const express =  require(`express`)
const router = express.Router()
const User = require(`../models/user`)



router.get(`/login`, (req, res) => {
	res.render(`users/login.ejs`)
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



module.exports = router;