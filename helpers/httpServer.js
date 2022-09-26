import axios from "axios";

const axiosApiIntances = axios.create({
    baseURL: process.env.REACT_APP_BACK_END_URL
})

export default axiosApiIntances