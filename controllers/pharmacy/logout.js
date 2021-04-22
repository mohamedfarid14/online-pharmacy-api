exports.logout= async(req,res)=>{

    try {

        req.pharmacyreq.tokens = req.pharmacyreq.tokens.filter((token)=>{
          
            return token.token !== req.token;
 
          });


         await  req.pharmacyreq.save(); 

         res.status(202).json({
          
          message:" Successfully log out "

         });
    
    
    } catch(error) {
    
       res.status(500).send('Faild')
    
    }
     
    
};
