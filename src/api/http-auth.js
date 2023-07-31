import axios from "axios";

const http = axios.create({
    // baseURL:'http://localhost:8000/api/',
    baseURL:'http://192.168.1.223:3001/api/',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('usertoken')}`,
        'Access-Control-Allow-Methods':'*',
    }
})

export default http;