import axios from "axios";

let axiosI = null;

function getAxiosInstance() {
    if (axiosI === null) {
        axiosI = axios.create();
    }
    return axios;
}

export default getAxiosInstance();