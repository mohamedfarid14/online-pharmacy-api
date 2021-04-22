const pharmacy = require('../../db/models/pharmacyregistration');
const validator = require('validator');

exports.PharmacyReistration = async(req,res)=> {

  const pharmacyrequest = new pharmacy(req.body);

 const { Pharmacyname,Country,City,Address,Branches,WorkingType,Hotline,DeliveryService,DrName,DrMobile,DrEmail,location,UserName,password} = req.body;

  try {


    if (!Pharmacyname||!Country||!City||!Address||!Branches||!WorkingType||!Hotline||!DeliveryService||!DrName||!DrMobile||!DrEmail||!location||!UserName||!password){

     return res.status(406).json({
  
        error:' Missing Mandatory Fields  ',
        description:'Please fill all the required fields '

     });

    }
    

  if ( typeof Pharmacyname === 'number' ){

     return  res.status(406).json({
       
        error : " Please enter a Valid Pharmacy Name "

   });
 
  };


  if( typeof DrName === 'number'){

    return  res.status(406).json({
       
      error : " Please enter a Valid Name "

 });

};

if(!validator.isEmail(DrEmail)){

  return res.status(406).json({
 
    error:'Please enter a Valid email'

   });
};
const userExists = await pharmacy.findOne({DrEmail});

     if(userExists){
 
       return res.status(406).json({
      
         error:' email address already exist'
 
        });
     };

if( typeof Branches === 'string'){

  return  res.status(406).json({
     
    error : " Please enter a Right Number "

});

};
 

if( typeof Hotline === 'string'){

  return  res.status(406).json({
     
    error : " Please enter a Right hotline Number "

});

};

if( typeof DrMobile === 'string'){

  return  res.status(406).json({
     
    error : " Please enter a Right phone Number "

});

};

if (typeof username === 'number'){
 
  return res.status(406).json({

    error:'Please enter valid username ',
   

   });
 } 
 const usernameExists = await pharmacy.findOne({UserName});
    
 if(usernameExists){

   return res.status(406).json({
  
     error:' username already exist , please try another one  '

    });
 };
 
 if(password.length < 7 || password.length > 15 ){
    
  return  res.status(406).send({
  
     error:'Please enter a valid password between 7-15 Char '

    });
 };


await pharmacyrequest.save();

return res.status(200).json({

  message:" your request  is successfully recived we will contact with you as soon as possible ."

})



} catch (error) {
      

  console.log(error.message)

   res.status(500).json({
       
        message:" Something Went wrong ,Try Again "

   });


  };


}



