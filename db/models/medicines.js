const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({

name :{

    type:String,
    required:true,
    trim:true
},


price : {

    type:Number,
    required:true,

},



})


const Medicine = mongoose.model('medicines',MedicineSchema);


Medicine.insertMany([
    
    { name: 'a', price: 20},
    { name: 'p', price: 30},
   
]).then(function(){
    console.log("Data inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});



module.exports = Medicine

