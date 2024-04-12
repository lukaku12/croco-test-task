import axios, {AxiosInstance} from 'axios';
import {fakeAxios, FakeAxiosInstance} from "@/config/axios/fakeAxios.ts";


//      !!!         Only For Test Task             !!!
//      !!!     If We Have Backend Api Working     !!!
//      !!!        We Will Use Real Request        !!!
//      !!!   Else We Will Use Local Fake Request  !!!

let axiosInstance: AxiosInstance | FakeAxiosInstance

if (import.meta.env.VITE_API_BASE_URL) {
    axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "XMLHttpRequest",
        },
    });
} else {
    axiosInstance = fakeAxios;
}


export default axiosInstance;