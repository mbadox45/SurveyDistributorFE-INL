import http from "./http-auth";

class AppService {
    // Get Methods
    getApp(){
        return http.get('app');
    }
    getAppByID(id){
        return http.get(`app/get/${id}`);
    }
    getPostUnpostApp(id){
        return http.get(`app/post/${id}`);
    }
    getAppByAppByID(id){
        return http.get(`/akses/app/get/${id}`);
    }
    getAppByUserID(id){
        return http.get(`/akses/user/get/${id}`);
    }

    // Post Methods
    addApp(data){
        return http.post(`app/add`, data);
    }
    updateApp(id,data){
        return http.post(`app/update/${id}`, data);
    }
}

export default new AppService;