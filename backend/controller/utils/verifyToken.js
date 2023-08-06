import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const token = req.cookies.accesToken;
    if(!token){
        return res.status(401).json({success: false, message: "Unauthorized"});
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
            if(err){
                return res.status(401).json({success:false, message:"token is invalid"})
            }
            req.user = user
            next() //
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({success: false, message: "Unauthorized"});
    }
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, ()=>{
        if(req.user.id === req.params.userId || req.user.isAdmin){
            next()
        }else{
            res.status(403).json({success: false, message: "Forbidden"})
        }
    })
}