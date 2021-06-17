const pharmacy = require('../../db/models/pharmacyregistration')


exports.deleteMed = async (req,res)=>{

    const medicine = req.query.medicine
    const  pharmacyID = req.pharmacyreq._id
    
    try {
        
        if (!medicine){
    
            return res.status(406).json({ 
    
                error:" enter the medicine name "
            })
        }
       const  PharmacyDocument =  await pharmacy.findById({_id:pharmacyID})
    
       const Medicine = PharmacyDocument.medicines.find((medicineObject)=>{
        
           if (medicineObject.name === medicine)
               
                   return medicineObject
        
    })

    const Objectindex =  PharmacyDocument.medicines.indexOf(Medicine)
   if (Objectindex !== -1 ) {
    PharmacyDocument.medicines.splice(Objectindex, 1)
   } else {
       return res.status(406).json({
           message : " There is no Medicine in Your List by This Name "
       })
   }

    await PharmacyDocument.save()
    
        res.status(200).json({
    
        message : " Medicine Successfully Removed "
    
        })
    
    } catch (error) {
    
        console.log(error.message)
    
        res.status(500).json({
     
            error :" Something Went Wrong happened! "
    
            })
  
        }
        
}
    

