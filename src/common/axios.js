const axios = require("axios")

let axiosI = null;

function getAxiosInstance() {
    if (axiosI === null) {
        axiosI = axios.create();
    }
    return axios;
}

module.exports = getAxiosInstance()