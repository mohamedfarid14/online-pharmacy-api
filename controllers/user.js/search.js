const Medicine = require('../../db/models/medicines');


exports.Search = async(req,res)=>{

    const q = req.query.q

try {

    const fetchedmedicines = await  Medicine.find({name:q})
 
    res.status(200).json({
        
        
        fetchedmedicines
    })
} catch(error){

console.log(error.message)

res.status(500).json({

    error:" something went wrong "
})
    

}





}