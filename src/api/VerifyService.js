import axios from "axios";

const http = axios.create({
    // baseURL:'http://36.92.181.10:4763/api/',
    baseURL:'http://localhost:8000/api/',
})

class VerifyService{
    getUser(id,headers){
        return http.get(`user/get/${id}`, headers);
    }
}

export default new VerifyService;