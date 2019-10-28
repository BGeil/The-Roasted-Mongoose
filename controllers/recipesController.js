const express =  require(`express`)
const router = express.Router()
const User = require(`../models/user`)



router.get(`/new`, (req, res) => {
	res.render(`users/login.ejs`)
})


module.exports = router;