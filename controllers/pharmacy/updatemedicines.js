const pharmacy = require('../../db/models/pharmacyregistration')

exports.showmedicine = async (req,res) => {

        const  id = req.pharmacyreq._id
        const  med = req.query.med
        const price = req.body.price

    try {
     
        if (!med){

            return res.status(406).json({

                error :" please enter the name of medicine "

            })
        }

        if (!price){

            return res.status(406).json({

                message  : " please enter the new price of medicine "

            })
        }

     await pharmacy.findOneAndUpdate(
        {_id: id},
        {$set: {"medicines.$[el].price": price }},
        { 
          arrayFilters: [{ "el.name": med }],
          new: true
        })

        res.status(200).json({

            message :" Successfully Updated ",
            
        })

    } catch (error) {
        
        console.log(error.message)
        res.status(500).json({
            error:" Something Wrong happened!"
        })
    }


}