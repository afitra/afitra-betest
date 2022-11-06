const router = require("express").Router();
const userController = require("./controllers/userController");

router.post("/user/login", userController.loginUser);

router.post("/user", userController.registerUser);

router.get("/user", userController.getAllUser);
router.get("/user/:id", userController.getUser);
router.get("/user/account/:accountNumber", userController.getUserAccountNumber);
router.get(
  "/user/identity/:identityNumber",
  userController.getUserIdentityNumber
);

router.put("/user/:id", userController.updateUser);

router.delete("/user/:id", userController.destroyUser);

module.exports = router;
