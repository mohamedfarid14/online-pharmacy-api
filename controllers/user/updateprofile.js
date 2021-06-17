const User = require('../../db/models/user')


exports.UpdateUserProfile = async ( req,res)=>{

   
    const updates= Object.keys(req.body);
    const allowedupdates = ['username','email','age','password','phone','location'];
    const isValidupdate = updates.every((update)=>{

          return allowedupdates.includes(update);

    }); 

    if ( !isValidupdate){

        return res.status(406).json({error:'invalid updates'});
    }

    const UserID = req.user._id

    try {

      const user = await User.findById({_id:UserID})
    
      if (!user){

        return res.status(404).json({
            error : " User not found  "
        })
     }

     updates.forEach(update=>user[update]=req.body[update]);

     await user.save();


       res.status(200).json({
        
        message:"Successfully Updated ",
        user
    
       })
       
        
    } catch (error) {
        
        console.log(error.message)
    
        res.status(500).json({
    
            error : " Something Wrong happened! "
        })
    
    
    }


}