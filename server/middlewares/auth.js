const passport= require('passport')

module.exports = {
    
    ensureAuth: function(req, res, next){
       
    passport.authenticate('jwt', {session: false}, (err, user)=>{
        try{
            console.log('Ejecutando mdw auth de authenticate para jwt')
            console.log(err)
            console.log(user)
            if(err) return res.status(403).json(err)

            if(!user) return res.status(403).json({message: 'You are not allowed to access. '})

            req.user = user

            next()

        }catch(err){
            next()
        }
    })(req, res, next)
        
       
    }
}