import axios from "axios";

axios.defaults.baseURL = 'https://ecopositive-api-pp5-ba0d580957dc.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

// Interceptors
export const axiosReq = axios.create();
export const axiosRes = axios.create();