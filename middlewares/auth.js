
var jwt = require("jsonwebtoken");
require("dotenv/config");

const verifyToken = (req,res,next) => {
    var token;
    var authHeader = req.headers.authorization 
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
        if(!token){
            return res.status(404).json({msg:"no token access denied"})
        }
        try{
           let decode = jwt.decode(token,process.env.WhatIsYourName)
           req.user = decode 
           console.log('req.user', req.user)
           next()
        }catch(err){
            return res.status(500).json({msg:"token is not valid "})
        }
    }else{
        return res.status(500).json({msg:"token is not valid "})
    }
}

module.exports = verifyToken