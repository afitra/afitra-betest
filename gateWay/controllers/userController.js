const apiAdapter = require("../helpers/apiAdapter");
const {
  URL_SERVICE_POST,
  URL_SERVICE_UPDATE,
  URL_SERVICE_DELETE,
  URL_SERVICE_GET,
} = process.env;

module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const api = await apiAdapter(URL_SERVICE_POST);

      const user = await api.post("/user/login", req.body);

      res.status(202).json({
        status: "Success",
        message: "Success",
        token: user.data.token,
      });
    } catch (error) {
      res.status(error.response.status).json({
        status: error.response.status,
        message: error.response.statusText,
        error: error.response.data.message,
      });
    }
  },
  registerUser: async (req, res, next) => {
    try {
      const api = await apiAdapter(URL_SERVICE_POST);

      const user = await api.post("/user", req.body);

      res.status(202).json({
        status: "Success",
        message: "Success",
        data: user.data.data,
      });
    } catch (error) {
      // res.status(500).send(`${error.response.data.message}`)
      res.status(error.response.status).json({
        status: error.response.status,
        message: error.response.statusText,
        error: error.response.data.message,
      });
    }
  },
  getAllUser: async (req, res, next) => {
    try {
      const api = await apiAdapter(URL_SERVICE_GET);

      const user = await api.get("/user");

      res.status(200).json({
        status: "Success",
        message: "Success",
        data: user.data.data,
      });
    } catch (error) {
      // res.status(500).send(`${error.response.data.message}`)
      res.status(error.response.status).json({
        status: error.response.status,
        message: error.response.statusText,
        error: error.response.data.message,
      });
    }
  },
  getUser: async (req, res, next) => {
    try {
      const api = await apiAdapter(URL_SERVICE_GET);
      api.defaults.headers.token = req.headers.token;
      const user = await api.get(`/user/${req.params.id}`);

      res.status(200).json({
        status: "Success",
        message: "Success",
        data: user.data.data,
      });
    } catch (error) {
      // res.status(500).send(`${error.response.data.message}`)
      res.status(error.response.status).json({
        status: error.response.status,
        message: error.response.statusText,
        error: error.response.data.message,
      });
    }
  },
  getUserAccountNumber: async (req, res, next) => {
    try {
      const api = await apiAdapter(URL_SERVICE_GET);
      api.defaults.headers.token = req.headers.token;
      const user = await api.get(`/user/account/${req.params.accountNumber}`);

      res.status(200).json({
        status: "Success",
        message: "Success",
        data: user.data.data,
      });
    } catch (error) {
      // res.status(500).send(`${error.response.data.message}`)
      res.status(error.response.status).json({
        status: error.response.status,
        message: error.response.statusText,
        error: error.response.data.message,
      });
    }
  },
  getUserIdentityNumber: async (req, res, next) => {
    try {
      const api = await apiAdapter(URL_SERVICE_GET);
      api.defaults.headers.token = req.headers.token;
      const user = await api.get(`/user/identity/${req.params.identityNumber}`);

      res.status(200).json({
        status: "Success",
        message: "Success",
        data: user.data.data,
      });
    } catch (error) {
      // res.status(500).send(`${error.response.data.message}`)
      res.status(error.response.status).json({
        status: error.response.status,
        message: error.response.statusText,
        error: error.response.data.message,
      });
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const api = await apiAdapter(URL_SERVICE_UPDATE);
      api.defaults.headers.token = req.headers.token;
      const user = await api.put(`/user/${req.params.id}`, req.body);

      res.status(202).json({
        status: "Success",
        message: "Success",
        data: user.data.data,
      });
    } catch (error) {
      // res.status(500).send(`${error.response.data.message}`)
      res.status(error.response.status).json({
        status: error.response.status,
        message: error.response.statusText,
        error: error.response.data.message,
      });
    }
  },
  destroyUser: async (req, res, next) => {
    try {
      const api = await apiAdapter(URL_SERVICE_DELETE);
      // api.defaults.headers.token= req.headers.token
      const user = await api.delete(`/user/${req.params.id}`);

      res.status(202).json({
        status: "Success",
        message: "Success",
        data: user.data.data,
      });
    } catch (error) {
      // res.status(500).send(`${error.response.data.message}`)
      res.status(error.response.status).json({
        status: error.response.status,
        message: error.response.statusText,
        error: error.response.data.message,
      });
    }
  },
};
