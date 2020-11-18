const mongoose = require('mongoose')

const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require ('passport-jwt').Strategy
const GoogleStrategy = require ('passport-google-oauth20').Strategy

const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')

module.exports =  function(passport){
        
        passport.use(new LocalStrategy(
                {
                usernameField: 'email',
                passwordField: 'password',
                session:false
            }, async (email, password, done) =>{
                try{
                    console.log("Ejecutando callback verify de strategy local")
                    
                    const user = await  User.findOne({ email: email})
                
                    if( user == null )  return done({message: 'Email doesn exist in the database'}, false);
                
                    if(! await User.isValidPassword(password, user.password))return done({message: 'Is not a valid password'}, false)

                    return done(null, user)

                }catch(err){
                    done(err, null)
                }
                
            }
        ))

        let opts = {}
        opts.jwtFromRequest= ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = process.env.JWT_SECRET;

        passport.use(new JwtStrategy(
            opts,
            async (jwt_payload, done)=>{
            try{

                console.log('Ejecutando callback verify de estrategia jwt')

                const user = await User.findById(jwt_payload.data._id)

                if( user === null) return done({ message: 'Not user found' },false )
                
                return done(null, user)
            
            }catch(err){
                return done(err,null)
            }
            
        }))


        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/redirect'
        },
        async  (accessToken, refreshToken, profile, done)=>  {
            const { given_name, family_name, email} = profile._json
            const newUser = {
                googleId: profile.id,
                email : email,
                name: given_name,
                lastName: family_name,
                password: await User.hashPassword('random'),
            }
            try{
                let user = await User.findOne({ googleId: profile.id })
                if (user) {
                    done(null,user)
                }else{
                    let user = await User.create(newUser)
                    done(null, user)
                }

            }catch(err){
                console.error(err)
            }
           
        }
        ))

    
    
}