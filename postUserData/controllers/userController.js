const User = require("../models/user.js");
const { comparePassword } = require("../helpers/bycrypt");
const { tokenGenerate } = require("../helpers/jwt.js");
const {
  getRedisData,
  setRedisData,
  destroyRedisData,
} = require("../helpers/redis");
module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const { emailAddress, password } = req.body;

      var user = await User.findOne({ emailAddress });

      if (user == null) {
        res.status(404).json({
          messege: "NOT FOUND user name / pass ",
        });
      } else {
        let validate = comparePassword(password, user.password);

        if (validate == true) {
          let payload = {
            _id: user._id,
            email: user.email,
          };
          let token = tokenGenerate(payload);
          res.status(200).json({ token });
        } else {
          res.status(400).json({
            status: "error",
            message: "email/pass not passed",
          });
        }
      }

      res.status(200).json({
        status: "Success",
        message: "Success",
        data,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  registerUser: async (req, res, next) => {
    try {
      const {
        userName,
        accountNumber,
        emailAddress,
        identityNumber,
        password,
      } = req.body;

      var data = await User.create({
        userName,
        accountNumber,
        emailAddress,
        identityNumber,
        password,
      });

      await destroyRedisData(process.env.REDIS_KEY);

      res.status(201).json({
        status: "Success",
        message: "Success",
        data,
      });
    } catch (error) {
      // console.log(error);
      res.status(500).send(error);
    }
  },
};
