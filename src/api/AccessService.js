// Versi Fetch API
import { baseURL, headerAuth } from "./http-auth2";
import http from './http-auth';
export default new class AccessService {
    getAccess(){
        return fetch(`${baseURL}akses`, {
            headers:headerAuth
        })
        .then((res) => res.json())
        .then((d) => d.data);
    }
    getAccessByID(id){
        return fetch(`${baseURL}akses/get/${id}`, {
            headers:headerAuth
        })
        .then((res) => res.json())
        .then((d) => d.data);
    }

    // Post Methods
    addAccess(data){
        // return fetch(`${baseURL}akses/add`, {
        //     method: 'POST',
        //     headers:headerAuth,
        //     body: JSON.stringify(data)
        // })
        // .then((res) => res.json())
        // .then((d) => d.data);
        return http.post(`akses/add`, data);
    }
    updateAccess(id,data){
        // return fetch(`${baseURL}akses/update/${id}`, {
        //     method: 'POST',
        //     headers:headerAuth,
        //     body: JSON.stringify(data)
        // })
        // .then((res) => res.json())
        // .then((d) => d.data);
        return http.post(`akses/update/${id}`, data);
    }
}