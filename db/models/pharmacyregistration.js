const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const RequestSchema = new mongoose.Schema({
   
   UserName:{

        type:String,
        required:true,
        trim:true,
        unique:true
    
 },
 
   password:{
  
    type:String,
    required:true,
    trim:true,
    minlength:7,
  
},
    Pharmacyname:{

    type:String,
    trim:true,
    required:true
   

}, Country: {

    type:String,
    trim:true,
    required:true
 
},
    City: {

    type:String,
    trim:true,
    required:true

},
   Address: {

    type:String,
    trim:true,
    required:true

},

   location : {

   type:{

    type: String ,
    default:"Point", 
    required: true
     
  },

  coordinates:{
    
    type: [Number],
    required: true

     }
    
},

   Branches:{
  
    type:Number,
    required:true,
    deafult:0
  
},
    WorkingType:{
    type:String,
    required:true,
    
    
}, 
   
    Hotline:{

      type:Number,
      required:true,
    
},
    
    DeliveryService:{

      type:String,
      required:true,


}, 
    DrName:{

        type:String,
        required:true,
        trim:true
  
  
},
    DrMobile:{

      type:Number,
      required:true,


},
    DrEmail: {

    type:String,
    required:true,
    trim:true,
    unique:true


},

role:{

  type:String,
  enum:['pharmacist'],
  default:'pharmacist'

},
  
 medicines: [{}],

 orders: [{}],

  tokens :[{

    token : {
   
    type:String,
    required:true
  
  }
  
  }] 

});


RequestSchema.index({ location : '2dsphere' });


RequestSchema.methods.toJSON = function(){

    userObject = this.toObject();
    
     delete userObject.password;
     delete userObject.tokens;
     
    
    return userObject;
    
    };
RequestSchema.statics.findUser = async function(UserName,password){


    try {
       // find pharmacy in db by its username and password
       const pharmacyreq = await pharmacy.findOne({UserName});
   
       if(!pharmacyreq) {
   
           throw new Error(' Unable to log in ');
       }

       const isPassMatch =  await bcrypt.compare(password,pharmacyreq.password);

       if(!isPassMatch) {
   
           throw new Error('invalid password');
       }
       // return the confirmed user details 
       return pharmacyreq;
   
    } catch (error) {
        
    
       throw new Error('unable to find user ');
    }
   
       
};

RequestSchema.methods.generateAuthToken = async function(){

    // {this} point to every user instance from the model 
  
    const token = jwt.sign({_id:this._id.toString()},process.env.JWT_SECRET);
  
    this.tokens = this.tokens.concat({token}); 
    
  try {
  
     await this.save();
  
      return token;
  
  } catch (error) {
  
     throw new Error('error');
     
  }
    
  };

  RequestSchema.pre('save', async function(next){

   
    if (this.isModified('password')){
       
      try {

        this.password= await bcrypt.hash(this.password,8 );
        

      } catch (error) {

          throw new Error('error') ;
      }

       
    };

    next();

}); 



const pharmacy = mongoose.model('pharmacies',RequestSchema) 

module.exports = pharmacy;