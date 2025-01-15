import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

//Создаем interceptor на запрос
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

//interceptor на ответ с сервера
$api.interceptors.response.use((config) => {
    //Если ошибок нет, то просто возвращаем конфиг
    return config;
}, async(error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && !error.config._isRetry) {
        //Указываем, что один перезапрос уже был, чтобы не было цикла
        originalRequest._isRetry = true;
        try {
            //В случае ошибки авторизации делаем перезапрос токена
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            //Делаем перезапрос на сервер
            return $api.request(originalRequest);
        } catch (error) {
            console.log(error);
        }
    }
    //В случае другой ошибки, прокидываем ее наверх
    throw error;
})

export default $api;