const User = require("../models/user.js");

const {
  getRedisData,
  setRedisData,
  destroyRedisData,
} = require("../helpers/redis");
module.exports = {
  updateUser: async (req, res, next) => {
    try {
      const {
        userName,
        accountNumber,
        emailAddress,
        identityNumber,
        password,
      } = req.body;
      var data = await User.findOne({ _id: req.params.id });

      data.userName = userName;
      data.accountNumber = accountNumber;
      data.emailAddress = emailAddress;
      data.identityNumber = identityNumber;
      data.password = password;
      await data.save();

      await destroyRedisData(process.env.REDIS_KEY);

      res.status(200).json({
        status: "Success",
        message: "Success",
        data,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
