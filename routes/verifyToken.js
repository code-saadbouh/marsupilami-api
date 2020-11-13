const jwt = require ("jsonwebtoken");
require('dotenv/config'); 


module.exports = function Auth(req, res, next ){
     const token = req.header('auth-token'); 
     if(!token){
         return res.status(401).send('Connectez-vous d\'abord'); 
     }
     try {
         const verified = jwt.verify(token, process.env.TOKEN_SECRET); 
         req.userMarsu = verified;
         next(); 
     }catch(err){
         res.status(400).send('Invalid Token'); 
     }
 }

