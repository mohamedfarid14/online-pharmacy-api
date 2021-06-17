const User = require('../../db/models/user')

exports.Userprofile = async (req,res)=>{


try {
    
  const user = await User.findOne({'tokens.token':req.token});

  res.status(202).json({user});


} catch (error) {
    
   res.status(500).json({

    error:' Something went wrong  '
     
   });
}


};