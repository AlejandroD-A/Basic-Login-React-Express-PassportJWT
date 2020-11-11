const jwt = require('jsonwebtoken')

module.exports = {

    generateToken :  (user) =>{
        const data= {_id: user._id,email: user.email, name: user.name, lastName: user.lastName}
        
        return  jwt.sign({data},process.env.JWT_SECRET, {
            expiresIn: "15m"
        })
    },
    generateRefreshToken :  (res, id) =>{
        refreshToken =  jwt.sign( { id: id }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: 84600
        })

        res.cookie('refreshToken', refreshToken, {
            expires: new Date(Date.now() + 120000),
            httpOnly: true,
        });
       

    },
    verifyRefreshToken :  (req, next) =>{
        
        const { refreshToken = null } = req.cookies

        if (refreshToken == null) return next({message: "No token provided"})
         
        const decoded =  jwt.verify(refreshToken ,process.env.JWT_REFRESH_SECRET)

        if (!decoded) return next({message: "Is not a valid token"})

        return decoded
            
            
        
        
    }
}