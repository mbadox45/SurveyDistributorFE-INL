import axios from "axios";

export default axios.create({
    baseURL:'http://36.92.181.10:4763/api/',
    headers:{
        'Content-Type': 'application/json'
    }
})