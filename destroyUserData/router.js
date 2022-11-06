const router = require("express").Router();
const userController = require("./controllers/userController");

router.delete("/user/:id", userController.destroyUser);

module.exports = router;
