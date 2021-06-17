const User = require('../../db/models/user')

exports.User = async (req,res)=>{

const userID = req.params.id 

try {
    
    const user = await User.findById({_id:userID})
   
    res.status(200).json({
        user
    })

} catch (error) {
   
    
    res.status(500).json({

        error :" Something Wrong happened! "
    })

}








}