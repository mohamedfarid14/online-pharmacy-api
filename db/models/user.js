const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({

    username:{

    type:String,
    required:true,
    trim:true,

  },

    email:{

    type:String,
    unique:true,
    trim:true,
    required:true,
    lowercase:true,
    validate(value){
      if (!validator.isEmail(value)){
        throw new Error(' E-mail is invalid ');
      }
    
  }
 },
    password:{
  
    type:String,
    required:true,
    trim:true,
    minlength:7,
  
},
    age:{
    type:Number,
    required:true,
    validate(value){
        if(value<0){
            throw new Error(' Age must be postive number ');
        };
      
    }
}, 
    location: {

    type:String,
    trim:true,
    required:true

},
    phone:{ 
      
      type: String,
      requird:true

},
    role:{

      type:String,
      enum:['user'],
      default:'user'

}, 
    
     orders: [ 
       
       { type: mongoose.Schema.Types.ObjectId, required:true, ref: "Order"},
     
      ],

  tokens :[{

  token : {
 
  type:String,
  required:true

}

}]


});

// remove user password field and tokens array when send respond to client
UserSchema.methods.toJSON = function(){

  userObject = this.toObject();
  
   delete userObject.password;
   delete userObject.tokens;
  
  return userObject;
  
  };

UserSchema.methods.generateAuthToken = async function(){

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

UserSchema.statics.findUser = async function(email,password){


    try {
       // find user in db by its email 
       const user = await User.findOne({email});
   
       if(!user) {
   
           throw new Error(' Unable to log in ');
       }
       
       // compare the hashed saved password and enterd password 
       const isPassMatch =  await bcrypt.compare(password,user.password);

       if(!isPassMatch) {
   
           throw new Error('invalid password');
       }
       
       // return the confirmed user details 
       return user;
   
    } catch (error) {
        
       throw new Error('unable to find user ');
    }
   
       
};

// hashing password before user info saved to db 
UserSchema.pre('save', async function(next){

   
    if (this.isModified('password')){
       
      try {

        this.password= await bcrypt.hash(this.password,8 );
        

      } catch (error) {

          throw new Error('error') ;
      }

       
    };

    next();

}); 


 const User = mongoose.model('users', UserSchema);
 
 module.exports = User