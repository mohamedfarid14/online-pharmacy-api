const Order = require('../../db/models/orders')

exports.ShowOrders = async (req,res)=>{
    
try {

    const id = req.user._id

    const orders = await Order.find({owner:id})

   res.status(200).json({

    orders

   })
   
    
} catch (error) {
    
    console.log(error.message)

    res.status(500).json({

        error : " Something Wrong happened! "
    })


}




}