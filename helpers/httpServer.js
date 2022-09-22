import axios from "axios";

const axiosApiIntances = axios.create({
    baseURL: 'https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/'
})

export default axiosApiIntances