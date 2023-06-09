import http from './http-auth';

class UserService {
    getUserLogin(){
        return http.get(`user/login`);
    }
    getUserID(id){
        return http.get(`user/get/${id}`);
    }
    getUser(){
        return http.get(`user`);
    }

    addUser(data){
        return http.post(`user/add`, data);
    }
    logOut(){
        return http.post(`logout`);
    }
}

export default new UserService;