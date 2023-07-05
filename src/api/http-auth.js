import axios from "axios";

const http = axios.create({
    baseURL:'http://192.168.1.223:8084/api/',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('usertoken')}`,
        'Access-Control-Allow-Methods':'*',
    }
})

export default http;