import http from "./http-common";
import { baseURL, header } from "./http-auth2";

class LocationService {
    async getProv(){
        // return await fetch(`${baseURL}load/prov`, {
        //     headers:header
        // })
        // .then((res) => res.json())
        // .then((d) => d.data);
        return await http.get('load/prov');
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