const Order = require('../../db/models/orders')
const pharmacy = require('../../db/models/pharmacyregistration')



exports.UpdateOrder = async ( req,res)=>{

    
    const state = req.body.state;
    const updates= Object.keys(req.body);
    const allowedupdates = ['name','medicinequantity','medicinename','address','state','price'];
    const isValidupdate = updates.every((update)=>{

          return allowedupdates.includes(update);

    }); 

    if ( !isValidupdate){

        return res.status(406).json({error:'invalid updates'});
    }

    const orderID = req.params.id
    const  id = req.pharmacyreq._id
    try {

      const order = await Order.findById({_id:orderID})
    
      if (!order){

        return res.status(404).json({
            error : " order not found "
        })
     }

     updates.forEach(update=>order[update]=req.body[update]);
     await order.save();

       res.status(200).json({
    
        order
    
       })
       
        
    } catch (error) {
        
        console.log(error.message)
    
        res.status(500).json({
    
            error : " Something Wrong happened! "
        })
    
    
    }





}