const User = require('../../db/models/user');

exports.Login= async (req,res) =>{

   const {email , password} = req.body;

   if (!email || !password){

      return res.status(406).json({

       error:' the user not found',
       description :' please enter your email and password '

       });

       };

    try {

       // confirm the user login 
        const  user = await User.findUser(email,password);

       // generate the authintication token 
        const token = await user.generateAuthToken();

        res.status(201).json({
           
         message:" Successfully login  ",
         user,
         token

       });
        
        
    } catch (error) {
   
      res.status(500).json({
   
          error:' The User Not Found ',
          message :' Please enter the correct email and password  '
   
   
          });
   
   
          }

         
        
    };