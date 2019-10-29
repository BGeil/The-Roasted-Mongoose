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


router.get(`/register`, (req, res) => {
	res.render(`users/register.ejs`)
})


router.post(`/register`, async (req, res, next) => {
	const password = req.body.password
	const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
})













module.exports = router;

