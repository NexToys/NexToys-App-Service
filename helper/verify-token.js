const jwt = require('jsonwebtoken');

var isVerified =  (req,res,next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if(!token){
        res.json({
            status: false,
            message: 'No token provided.'
        });
    }else{
        jwt.verify(token,req.app.get('api_secret_key'), (err,decoded) => {
            if(err){
                res.json({
                    status: false,
                    message: 'Failed to authenticate token.'
                });
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }
};

module.exports = isVerified;