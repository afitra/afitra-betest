const User = require("../models/user.js");
const {
  getRedisData,
  setRedisData,
  destroyRedisData,
} = require("../helpers/redis");
module.exports = {
  destroyUser: async (req, res, next) => {
    try {
      var user = await User.findByIdAndDelete({ _id: req.params.id });

      if (user == null) {
        res.status(404).json({
          status: "error",
          message: "user not found",
        });
      }
      await destroyRedisData(process.env.REDIS_KEY);

      res.status(200).json({
        status: "Success",
        message: "Success",
        data: {},
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
