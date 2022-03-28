const bcrypt = require('bcrypt');
const { promise } = require('bcrypt/promises');
require('dotenv').config()

const veryfytoken = (token) =>{
    return new promise((resolve,reject)=>
    {
        jwt.verify(token, process.env.key, function(err, decoded) {
            if(err)
            {
                return reject(err)
            }
            return resolve(decoded)
          });
    })
}

const authentication = async(req,res,next)=>{  
    if(!req.headers["autherization"])
    {
        return res.status(500).send({message:"token is not valid"});
    }

   const header  = req.headers.autherization;
   const beerAndToken = header.split(" ");
   const token = beerAndToken[1];

   let decoded;
   try {
        decoded = await veryfytoken(token);
   } catch (error) {
       throw error
   }

   req.user = decoded.user;

   return next()
}

module.exports = authentication;