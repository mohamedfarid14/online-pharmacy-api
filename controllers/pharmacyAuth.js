const jwt = require('jsonwebtoken');
const pharmacy = require('../db/models/pharmacyregistration');


exports.Auth = async (req,res,next)=>{

try {

    const token = req.header('Authorization');
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const pharmacyreq = await pharmacy.findOne({ _id :decoded._id,'tokens.token':token});
   

    if (!pharmacyreq){

        throw new Error();
     }
     
     req.token = token;
     req.pharmacyreq=pharmacyreq;

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

    if(!roles.includes(req.pharmacyreq.role)){
     res.status(402);
     return res.json({error:'You do not have permission to perform this action'});
    }
    next();
  }
};

