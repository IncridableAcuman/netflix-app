import axios from 'axios';
import { toast } from 'react-toastify';
const axiosInstance=axios.create({
    withCredentials:true,
    baseURL:"http://localhost:8080/api"
});

axiosInstance.interceptors.request.use(

    config=>{
        const accessToken=localStorage.getItem("accessToken");
        if(accessToken){
            config.headers['Authorization']=`Bearer ${accessToken};`
        }
        return config;
    }
);
axiosInstance.interceptors.response.use(

    config=>config,
    async error=>{
        try {
            const originalRequest=error.config;
            if(error.response.status===401 || !originalRequest._retry){
                originalRequest._retry=true;
                
            }
        } catch (error) {
            console.log(error);
            localStorage.removeItem("accesstoken");
            toast.error(error? response?.message || "Someting  went wrong!");
            window.location.href="/landing";
        }
    }

);

export default axiosInstance;