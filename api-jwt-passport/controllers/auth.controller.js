const mongoose = require('mongoose')
const passport = require('passport')

const User = require('../models/User')
const { verifyRefreshToken, generateRefreshToken, generateToken } = require('../utils/authJWT')

module.exports = {
    register: async (req, res, next) => {
        console.log(' register case');
        try{

            const user = await User.findOne({email : req.body.email })
            if (user) next({message:  'Ya existe un usuario con ese nombre'})
            const newUser = new User({
                 email: req.body.email,
                  password : await User.hashPassword(req.body.password),
                  name: req.body.name,
                  lastName: req.body.lastName
                })
            await newUser.save()
            return res.json({data: {email: newUser.email} })
            
        }catch(err){
            next({message: err.message})
        }
    },
    login: (req,res,next)=> {
        
        passport.authenticate("local", {session: false },(error,user) => {

            if ( error || user === null ){
                next(error)
            }else{
                const token = generateToken( user )
                generateRefreshToken( res, user._id)
                res.status(200).json({ data:{ token } } )

            }
        })(req, res)
    },

    loginGoogle: (req, res,next )=>{
        passport.authenticate("google",{
            session: false,
            failureRedirect: '/'
        },(error, user) => {
            if (error || !user){
                next(error)
            }else{

                generateRefreshToken( res, user._id)
                const html =  "<script> window.close()</script>"
                
                res.send(html)

            }
        }
        )(req, res)

    },

    logout : (req, res)=>{
        res.clearCookie('refreshToken')
        res.status(200).json({message: 'Good bye'})
    },

    refreshTokenManager : async (req, res, next)=>{

        const refreshToken = verifyRefreshToken( req , next)
        if(!refreshToken) return next()

        const user = await User.findById(refreshToken.id)
        
        if( !user ) next({message: 'No user found'})

        const newToken = generateToken(user)

        generateRefreshToken(res, user._id)

        res.status(200).json({ data : { token: newToken }});

    }

    


}