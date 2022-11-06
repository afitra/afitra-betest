const User = require("../models/user.js")
const { tokenGenerate } = require("../helpers/jwt.js");
const { comparePassword } = require("../helpers/bycrypt");  
const {getRedisData,setRedisData,destroyRedisData} = require("../helpers/redis");  
module.exports = {
  loginUser: async (req, res, next) => {
    try {
        const {  emailAddress,password } = req.body
  
        var user = await User.findOne({emailAddress})
        if (user == null){
          res.status(404).json({
            messege: "NOT FOUND user name / pass "
          });
        }else{
          let validate = comparePassword(password, user.password);
    
          if (validate == true) {
            let payload = {
              _id: user._id,
              email: user.email
            };
            let token = tokenGenerate(payload);
            res.status(200).json({ token });
          } else {
            throw new Error("BROKEN");
          }
        }
          
        res.status(200).json({
            status:"Success",
            message:"Success",
            data
        })
 
    } catch (error) {
        res.status(500).send(`${error.message}`)
    }
  },
  registerUser: async (req, res, next) => {
    try {
        const { userName, accountNumber, emailAddress,identityNumber,password } = req.body
  
        var data = await   User.create({
          userName, accountNumber, emailAddress,identityNumber ,password
        })
        const redis_key="data_user"
        await destroyRedisData(redis_key)
          
        res.status(201).json({
            status:"Success",
            message:"Success",
            data
        })
 
    } catch (error) {
        res.status(500).send(`${error.message}`)
    }
  },
  getAllUser: async (req, res, next) => {
    try {
        const redis_key="data_user"
        const user_cache = await getRedisData(redis_key);
        var data =''
        var resource=""
       
        if(user_cache){
          data = JSON.parse(user_cache)
          resource='cache'
        }else{
          data = await User.find({
            where:{
              _id:req.params.id
            }
          })
          await setRedisData(redis_key, JSON.stringify(data))
          resource="database"
        }
         
 
          
        res.status(200).json({
            status:"Success",
            message:"Success",
            data,
            resource
        })
 
    } catch (error) {
        res.status(500).send(`${error.message}`)
    }
  },
  getUser: async (req, res, next) => {
    try {
        
  
        var data = await User.findOne({_id:req.params.id})
        //  await data.save()
          
        res.status(200).json({
            status:"Success",
            message:"Success",
            data
        })
 
    } catch (error) {
        res.status(500).send(`${error.message}`)
    }
  },
  getUserAccountNumber: async (req, res, next) => {
    try {
        
  
        var data = await User.findOne({accountNumber:req.params.accountNumber})
        //  await data.save()
          
        res.status(200).json({
            status:"Success",
            message:"Success",
            data
        })
 
    } catch (error) {
        res.status(500).send(`${error.message}`)
    }
  },
  getUserIdentityNumber: async (req, res, next) => {
    try {
        
  
        var data = await User.findOne({identityNumber:req.params.identityNumber})
        //  await data.save()
          
        res.status(200).json({
            status:"Success",
            message:"Success",
            data
        })
 
    } catch (error) {
        res.status(500).send(`${error.message}`)
    }
  },
  updateUser: async (req, res, next) => {
    try {
     
        const { userName, accountNumber, emailAddress,identityNumber , password} = req.body

        var data = await User.findOne({_id:req.params.id})
        data.userName=userName
        data.accountNumber=accountNumber
        data.emailAddress=emailAddress
        data.identityNumber=identityNumber
        data.password=password
        await data.save()
        const redis_key="data_user"
        await destroyRedisData(redis_key)
        
        res.status(200).json({
            status:"Success",
            message:"Success",
            data
        })
 
    } catch (error) {
        res.status(500).send(`${error.message}`)
    }
  },
  destroyUser: async (req, res, next) => {
    try {
        
        await User.findByIdAndDelete({ _id: req.params.id })
   
          
        res.status(200).json({
            status:"Success",
            message:"Success",
            data:{}
        })
 
    } catch (error) {
        res.status(500).send(`${error.message}`)
    }
  },

  
}
