const express = require('express')
const { ensureAuth } = require('../middlewares/auth')
const router = express.Router()
const auth = require ('../middlewares/auth')
const User = require ('../models/User')


router.get('/',auth.ensureAuth, async (req,res) => {
    console.log('some')
    const users = await User.find()
    return res.status(200).json(users)
})   

module.exports = router