const express = require('express')
const router = express.Router()


//@desc Login/Landing page
//@route GET /
router.get('/',(req, res)=> { res.json("Welcome")})


module.exports = router