const router = require("express").Router();
const userController = require("./controllers/userController");

router.post("/user/login", userController.loginUser);
router.post("/user", userController.registerUser);

module.exports = router;
