import http from './http-auth';

// class UserService {
//     getUserLogin(){
//         return http.get(`user/login`);
//     }
//     getUserID(id){
//         return http.get(`user/get/${id}`);
//     }
//     getUser(){
//         return http.get(`user`);
//     }

//     addUser(data){
//         return http.post(`user/add`, data);
//     }
//     logOut(){
//         return http.post(`logout`);
//     }
// }

// export default new UserService;


// Versi Fetch API
import { baseURL, headerAuth } from "./http-auth2";

class UserService {
    getUserLogin(){
        return fetch(`${baseURL}user/login`, {
            headers:headerAuth
        })
        .then((res) => res.json())
        .then((d) => d.data);
    }
    async getUserID(id){
        return await fetch(`${baseURL}user/get/${id}`, {
            headers:headerAuth
        })
        .then((res) => res.json())
        .then((d) => d.data);
    }
    getUser(){
        return fetch(`${baseURL}user`, {
            headers:headerAuth
        })
        .then((res) => res.json())
        .then((d) => d.data);
        // return http.post(`user/add`, data);
    }

    addUser(data){
        return http.post(`user/add`, data);
    }
    updateUser(id,data){
        return http.post(`user/update/${id}`, data);
    }
    logOut(){
        return fetch(`${baseURL}logout`, {
            method: 'POST',
            headers:headerAuth,
        })
        .then((res) => res.json())
        .then((d) => d.data);
    }

    addPasswordUpdate(data){
        return http.post(`password/update`, data);
    }
}

export default new UserService;