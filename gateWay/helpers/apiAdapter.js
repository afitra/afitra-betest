const axios = require("axios");

const { API_TIMEOUT } = process.env;

module.exports = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl,
    timeout: parseInt(API_TIMEOUT),
  });
};
