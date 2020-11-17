const express = require('express')
const passport = require('passport')
const router = express.Router()
const authCntrl = require('../controllers/auth.controller')
const { loginValidator, registerValidator } = require('../middlewares/schemas')

router.post('/signup',registerValidator,authCntrl.register)

router.post('/login',loginValidator,authCntrl.login)

router.get('/refresh-token',authCntrl.refreshTokenManager)

router.get('/google', passport.authenticate("google",{
    scope: ["profile","email"],
 
}))

router.get('/google/redirect',authCntrl.loginGoogle)

router.get('/logout',authCntrl.logout)

module.exports = router