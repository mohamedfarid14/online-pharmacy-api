const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

  name :{
      type : String , 
      required : true 
  },

  address :{

    type:String,
    required:true
  },

  medicinename :{

    type : String, 
   required : true 
  },
  
  medicinequantity : {

    type : Number,
    required : true 
 
  },

  owner : {
     
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
    
  },

  state :{

    type : Number,
    required:true
  },
 
},{ timestamps: true, 
    required:true
});

const Order = mongoose.model("orders", OrderSchema);

module.exports = Order 
