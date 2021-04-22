const jwt = require('jsonwebtoken');
const User = require('../db/models/user');



 exports.Auth = async (req,res,next)=>{

try {

    const token = req.header('Authorization');
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findOne({ _id :decoded._id,'tokens.token':token});
   

    if (!user){

        throw new Error();
     }
     
     req.token = token;
     req.user=user;

     next();
  
  

} catch(e){

    res.status(401).json({

      error:'unauthorized',
      description:" You need access token to perform the action "

    });

}


};

exports.restictTo = (...roles) => {
 
  return(req,res,next) => {

    if(!roles.includes(req.user.role)){
     res.status(401);
     return res.json({error:'You do not have permission to perform this action'});
    }
    next();
  }
};

