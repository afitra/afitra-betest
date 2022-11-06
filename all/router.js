const router = require("express").Router()
const userController = require("./controllers/userController")
const {Authentication} = require("./middlewares/auth.js")
 

router.post("/user/login", userController.loginUser)

router.post("/user", userController.registerUser)

router.get("/user", userController.getAllUser)
router.get("/user/:id",Authentication, userController.getUser)
router.get("/user/account/:accountNumber",Authentication, userController.getUserAccountNumber)
router.get("/user/identity/:identityNumber",Authentication, userController.getUserIdentityNumber)

router.put("/user/:id",Authentication, userController.updateUser)

router.delete("/user/:id", userController.destroyUser)
 
module.exports = router
