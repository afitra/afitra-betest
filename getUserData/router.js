const router = require("express").Router();
const userController = require("./controllers/userController");
const { Authentication } = require("./middlewares/auth.js");

router.get("/user", userController.getAllUser);
router.get("/user/:id", Authentication, userController.getUser);
router.get(
  "/user/account/:accountNumber",
  Authentication,
  userController.getUserAccountNumber
);
router.get(
  "/user/identity/:identityNumber",
  Authentication,
  userController.getUserIdentityNumber
);

module.exports = router;
