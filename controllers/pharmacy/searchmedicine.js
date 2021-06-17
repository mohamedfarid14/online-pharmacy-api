const pharmacy = require('../../db/models/pharmacyregistration')


exports.searchMed = async(req,res)=>{

const medicine = req.query.medicine
const  pharmacyID = req.pharmacyreq._id

try {
    
    if (!medicine){

        return res.status(406).json({ 

            error:" enter the medicine name "
        })
    }
   const  PharmacyDocument =  await pharmacy.findById({_id:pharmacyID})

   const Medicines = PharmacyDocument.medicines.filter((medicineObject)=>{
    
       if (medicineObject.name === medicine)
           return medicineObject
    
})

    res.status(200).json({

     Medicines

    })

} catch (error) {

    console.log(error.message)

    res.status(500).json({
 
        error :" Something Went Wrong happened! "

        })
}

}


exports.Getallmed = async(req,res)=>{

    const  pharmacyID = req.pharmacyreq._id
    
    try {
        
       const  PharmacyDocument =  await pharmacy.findById({_id:pharmacyID})
    
       const Medicines = PharmacyDocument.medicines.filter(medicineObject=>medicineObject)
    
        res.status(200).json({
    
         Medicines
    
        })
    
    } catch (error) {
    
        console.log(error.message)
    
        res.status(500).json({
     
            error :" Something Went Wrong happened! "
    
            })
    }
    
    
    
}