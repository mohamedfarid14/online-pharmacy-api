const Order = require('../../db/models/orders')
const User = require('../../db/models/user')
const pharmacy = require('../../db/models/pharmacyregistration')

exports.order = async (req,res)=>{

    const order = new Order(req.body);

    const lng = req.query.lng
    const lat = req.query.lat

    

const {name,address,medicinename,medicinequantity,state} = req.body 

try {

    if (!name||!address||!medicinename||!medicinequantity||!state){

        return res.status(406).json({

            error:" please enter the required fields to complete the order "
        })
    }

 if (typeof medicinequantity === 'string'|| typeof medicinequantity === 'boolean'){

    return res.status(406).json({

        error: " enter a right number "
    })
 }

 const user = await User.findByIdAndUpdate({_id:req.user._id},{$push:{orders:order}})

 await user.save()

const NearPharmacies = await pharmacy.aggregate(
    [
        { "$geoNear": {
            "near": {
                "type": "Point",
                "coordinates": [parseFloat(lng),parseFloat(lat)]
            },
            "distanceField": "distance",
            "spherical": true,
            "maxDistance": 5000
        }}
    ],   
)

if (NearPharmacies.length===0){

    return res.status(406).json({

        message:" Sorry this medicine is not available in your pharmacies area "
    })
}

const ClosestPharmacyDoc = NearPharmacies.find((pharmacydocument)=>{

const MatchedMedicineObj = pharmacydocument.medicines.find((medObj)=>{

    if( medicinename === medObj.name){

           return true 
    }

})

if (MatchedMedicineObj)

return pharmacydocument


 });

if (ClosestPharmacyDoc===undefined){
    
    return res.status(406).json({

        message:" Sorry this medicine is not available in your pharmacies area "
    })

}
 


order.owner = req.user._id;

const obj = ClosestPharmacyDoc.medicines.find(o => o.name === medicinename);

order.price = medicinequantity*obj.price;
 

await order.save()

await pharmacy.findOneAndUpdate({_id:ClosestPharmacyDoc._id},{$push:{orders:order}})


 return res.status(200).json({

     message :" order successfully send "

 })


} catch (error) {
    
console.log(error.message)

res.status(500).json({

    error:" somthing went wrong happend!"
})


}

}

