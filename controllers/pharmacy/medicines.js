const pharmacy =  require('../../db/models/pharmacyregistration')

exports.addMedicine = async (req,res) =>{

const {name,price} = req.body 

try {

    if(!name||!price){
    
        return res.status(406).json({
        
         error:'Please fill the required fields '
      
          });
      };

      if (typeof name === 'number'){

        return res.status(406).json({
    
            error:" enter medicine name "
        })
    };
    
    if (typeof price === 'string'){
    
        return res.status(406).json({
    
            error:" enter medicine price "
        })
    };


    const ph = await pharmacy.findByIdAndUpdate({_id:req.pharmacyreq._id},{$push:{medicines:req.body}})

    
     await ph.save()

     return res.status(200).json({
         
        message:"your data successfully saved"
     })


} catch (error) {
    
console.log(error.message)

     res.status(500).json({

        error:"someting wrong happend "
     })

}


}

/*
const medicine = new Medicine(req.body)

const {name,price} = req.body 

try {

    if(!name||!price){
    
        return res.status(406).json({
           
       
         error:'Please fill the required fields '
      
          });
      };
      
if (typeof name === 'number'){

    return res.status(406).json({

        error:" enter medicine name "
    })
}

if (typeof price === 'string'){

    return res.status(406).json({

        error:" enter medicine price "
    })
}



} catch (error) {
    




}

*/