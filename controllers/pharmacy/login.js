const pharmacy = require('../../db/models/pharmacyregistration');

exports.PharmacyLogin= async (req,res) => {

   const  {UserName , password} = req.body;

   if (!UserName || !password){

      return res.status(406).json({

       error:' the user not found',
       description :' please enter your User Name and Password '

       });

       };

    try{

    
        const  pharmacyreq = await pharmacy.findUser(UserName,password);

       // generate the authintication token 
        const token = await pharmacyreq.generateAuthToken();

        res.status(201).json({
           
         message:" Successfully login  ",
         pharmacyreq,
         token

       });
        
        
    }catch(error) {
   
        console.log(error.message)

      res.status(406).json({
   
      error : " Your Username/Password Went wrong Please Try Again"
   
          });

         
    };    

}