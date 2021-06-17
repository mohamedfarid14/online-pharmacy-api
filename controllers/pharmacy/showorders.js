const pharmacy = require('../../db/models/pharmacyregistration')


exports.GetUserOrders = async(req,res)=>{

    const userID = req.params.id
    const  pharmacyID = req.pharmacyreq._id
    
    try {
        
        if (!userID){

            res.status(500).json({
     
                error :" Please Enter the User ID "
        
                })

        }
       const  PharmacyDocument =  await pharmacy.findById({_id:pharmacyID})

       const orders = PharmacyDocument.orders.filter((OrderObject)=>{
      
        if (OrderObject.owner==userID) 
           
             return OrderObject
      
    })
    
        res.status(200).json({
    
         orders
    
        })
    
    } catch (error) {
    
        console.log(error.message)
    
        res.status(500).json({
     
            error :" Something Went Wrong happened! "
    
            })
    }

    
}



exports.GetallOrders = async(req,res)=>{

    const  pharmacyID = req.pharmacyreq._id
    
    try {
        
       const  PharmacyDocument =  await pharmacy.findById({_id:pharmacyID})
    
       const orders = PharmacyDocument.orders.filter(OrderObject=>OrderObject)
    
        res.status(200).json({
    
         orders
    
        })
    
    } catch (error) {
    
        console.log(error.message)
    
        res.status(500).json({
     
            error :" Something Went Wrong happened! "
    
            })
    }
    

}