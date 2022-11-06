const { varify } = require("../helpers/jwt");
var jwtDecode = require("jwt-decode");

function Authentication(req, res, next) {
  try {
  
    if (req.headers.token == undefined  ) {
      
      res.status(400).json({ message: 'token not found' });
    } 
 
    let decode = varify(req.headers.token);
    req.decode = decode;
    next();
 
    
  } catch (err) {
    next(err);
  }
}

 
 
module.exports = {
  Authentication
};