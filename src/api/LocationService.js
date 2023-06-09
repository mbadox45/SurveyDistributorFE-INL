import http from "./http-common";

class LocationService {
    getProv(){
        return http.get('load/prov');
    }
    getProvID(id_prov){
        return http.get(`detail/prov/${id_prov}`);
    }

    getKabKot(id_prov){
        return http.get(`load/kabkot/${id_prov}`);
    }
    getKabKotID(id_kabkot){
        return http.get(`detail/kabkot/${id_kabkot}`);
    }

    getKec(id_kabkot){
        return http.get(`load/kec/${id_kabkot}`);
    }
    getKecID(id_kec){
        return http.get(`detail/kec/${id_kec}`);
    }

    getKel(id_kec){
        return http.get(`load/kel/${id_kec}`);
    }
    getKelID(id_kel){
        return http.get(`detail/kel/${id_kel}`);
    }
}

export default new LocationService;