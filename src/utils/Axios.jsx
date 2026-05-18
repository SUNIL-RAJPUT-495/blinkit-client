import axios from "axios";
import { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL : baseURL,
    withCredentials :true
})

Axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('accessToken');
            // If we are not already on the login page, we can alert or redirect.
            if (window.location.pathname !== '/login') {
                alert("Your session has expired. Please login again.");
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default Axios; 