const pharmacy = require('../../db/models/pharmacyregistration')

exports.ShowAllPharmacies = async (req,res)=>{
    
try {

   const pharmacies = await pharmacy.find({})

   res.status(200).json({

    pharmacies

   })
   
    
} catch (error) {
    
    console.log(error.message)

    res.status(500).json({

        error : " Something Wrong happened! "
    })


}




}