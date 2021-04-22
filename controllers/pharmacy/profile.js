const pharmacy = require('../../db/models/pharmacyregistration')

exports.PharmacyProfile = async (req,res)=>{


    try {
        
      const pharmacyreq = await pharmacy.findOne({'tokens.token':req.token});
    
      res.status(202).json({pharmacyreq});
    
    
    } catch (error) {
        
       res.status(500).json({
    
        error:' Something went wrong '
         
       });
    }
    
    
    };