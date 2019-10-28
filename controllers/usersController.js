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






module.exports = router;