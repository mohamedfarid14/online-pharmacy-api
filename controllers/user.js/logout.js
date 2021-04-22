exports.logout= async(req,res)=>{

    try {
          req.user.tokens=req.user.tokens.filter((token)=>{
          
            return token.token !== req.token;
 
          });


         await req.user.save(); 

         res.status(202).json({
          
          message:" Successfully log out "

         });
    
    
    } catch(error) {
    
       res.status(500).send('Faild')
    
    }
     
    
};
