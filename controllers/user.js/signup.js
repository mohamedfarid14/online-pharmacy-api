const User = require('../../db/models/user');
const validator = require('validator');


exports.Signup = async (req,res) => {

    const user = new User(req.body);

    const { username, email, password ,age,location,phone}  = req.body;

    try {
       
        if(!username||!email||!password||!age||!location||!phone){
    
           return res.status(406).json({
              
            error:' Un Valid Sign up ',
            description:'Please fill the required fields '
         
             });
         };

        
       if (typeof username === 'number'){
 
        return res.status(406).json({

          error:' Un Valid Sign up ',
          description:'Please enter valid name ',
         

         });
       }  

       if ( typeof location === 'number'){
 
        return res.status(406).json({

          error:' Un Valid Sign up ',
          description:'Please enter a valid location ',
         

         });
       }
 
      if(password.length < 7 || password.length > 15 || password.includes('password')){
    
          return  res.status(406).send({
          
             error:' Un Valid sign up ',
             description:'Please enter a valid password between 7-15 Char '
     
            });
         };
         
         if(!validator.isEmail(email)){
    
          return res.status(406).json({
         
            error:' Un Valid Signup ',
            description:'Please enter a valid email'
    
           });
        };
    
        const userExists = await User.findOne({email});
    
         if(userExists){
     
           return res.status(406).json({
          
             error:' Un Valid sign up ',
             description:' email address already exist '
     
            });
         };
       
        if (typeof phone ==='number'){
          
          return res.status(406).json({
          
            error:' Un Valid sign up ',
            description:' please enter a right phone number  '
    
           });

        }

        if (typeof age === 'string'){
          
          return res.status(406).json({
          
            error:' Un Valid sign up ',
            description:' please enter your age in number  '
    
           });

        }
    
       const token = await user.generateAuthToken();

       await user.save();

        res.status(201).json({
        
       message : " Your Account Created Successfully ",
       user,
       token 

        });
     

    } catch (error) {

        res.status(500).json({
        message:" Something Went wrong , Try Again "
    });
    
    }

};








