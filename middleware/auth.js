const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    //Get token from header
    const token = req.header('x-auth-token');

    //check if token not present
    if(!token){
        return res.status(401).json({msg: "no valid token"});
    }

    try{
        const decode = jwt.verify(token, config.get('jwtSecret'));
        req.user = decode.user;
        next();
    }catch(err){
        res.status(401).json({msg: "token not valid"});
    }
}
 