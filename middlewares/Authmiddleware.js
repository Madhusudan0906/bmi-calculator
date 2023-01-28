const jwt = require("jsonwebtoken");
const Auth = (req,res,next)=>{
    try{
        const token = (req.headers.authorization).split(" ")[1];
        const decode=jwt.verify(token,`${process.env.SECRET}`);
        req.body.userId=decode.userId;
        next();
    }catch(e){
        res.status(500).send("error");
    }
    
}

module.exports = Auth;