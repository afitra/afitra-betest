const router = require("express").Router();
const userController = require("./controllers/userControllers");
const { Authentication } = require("./middlewares/auth.js");

router.put("/user/:id", Authentication, userController.updateUser);

module.exports = router;
