const User = require("../models/user.js");

const {
  getRedisData,
  setRedisData,
  destroyRedisData,
} = require("../helpers/redis");

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      const user_cache = await getRedisData(process.env.REDIS_KEY);
      var data = "";

      if (user_cache) {
        data = JSON.parse(user_cache);
      } else {
        data = await User.find({
          where: {
            _id: req.params.id,
          },
        });

        await setRedisData(process.env.REDIS_KEY, JSON.stringify(data));
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
  getUser: async (req, res, next) => {
    try {
      var data = await User.findOne({ _id: req.params.id });
      //  await data.save()

      res.status(200).json({
        status: "Success",
        message: "Success",
        data,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getUserAccountNumber: async (req, res, next) => {
    try {
      var data = await User.findOne({
        accountNumber: req.params.accountNumber,
      });

      if (data == null) {
        res.status(404).json({
          status: "error",
          message: "user not found",
        });
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
  getUserIdentityNumber: async (req, res, next) => {
    try {
      var data = await User.findOne({
        identityNumber: req.params.identityNumber,
      });
      if (data == null) {
        res.status(404).json({
          status: "error",
          message: "user not found",
        });
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
};
