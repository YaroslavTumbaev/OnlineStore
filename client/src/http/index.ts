import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const $host: AxiosInstance = axios.create({
    baseURL: 'http://localhost:4800'
})

const $AuthHost: AxiosInstance = axios.create({
    baseURL: 'http://localhost:4800'
})

const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers = config.headers || {};
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

$AuthHost.interceptors.request.use(authInterceptor)


export {$AuthHost, $host}