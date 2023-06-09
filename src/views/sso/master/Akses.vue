<script setup>

import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { onMounted, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import AppService from '@/api/AppService';
import UserService from '@/api/UserService';

const apps  = ref(null);
const users  = ref(null);
const userid = ref(null);
const akses_user = ref(null);
const filters1 = ref(null);

const countries = ref([]);
const filteredCountries = ref(null);

const calculateCustomerTotal = (name) => {
    let total = 0;
    if (customer3.value) {
        for (let customer of customer3.value) {
            if (customer.representative.name === name) {
                total++;
            }
        }
    }

    return total;
};

const searchCountry = (event) => {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered = [];
    const query = event.query;
    for (let i = 0; i < countries.value.length; i++) {
        const country = countries.value[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }
    filteredCountries.value = filtered;
};

const loadSelected = async () => {
    if (users.value.name != null) {
        console.log(users.value);

        const akses_promise = AppService.getAppByUserID(users.value.code);
        const user_promise = UserService.getUserID(users.value.code);
        const [Access, UsersID] = await Promise.all([akses_promise, user_promise]);

        console.log(Access)
        console.log(UsersID)
        
        // AppService.getAppByUserID(users.value.code).then(res => {
        //     const load = res.data;
        //     if (load.code == 200) {
        //         akses_user.value = load.data
        //     } else {
        //         userid.value = null;
        //     }
        // })
        
        // UserService.getUserID(users.value.code).then(res => {
        //     const load = res.data;
        //     if (load.code == 200) {
        //         userid.value = load.data
        //     } else {
        //         userid.value = null;
        //     }
        // })
        
    } 
}

const loadAppID = async (id) => {
    const res = await AppService.getAppByID(id);
    const load = res.data;
    let data;
    if (load.code == 200) {
        data = load.data;
    } else {
        data = null
    }
    return data;
}

const loadUser = () => {
    UserService.getUser().then(res => {
        const load = res.data;
        if (load.code == 200) {
            const data = load.data;
            const list = [];
            for (let i = 0; i < data.length; i++) {
                list[i] = {
                    name: data[i].name,
                    code: data[i].id,
                }
            }
            countries.value = list;
            // console.log(list)
        } else {
            console.log('tidak ada')
        }
    })
}

const loadApp = () => {
    AppService.getApp().then(res => {
        const load = res.data;
        if (load.code == 200) {
            const data = load.data;
            const list = [];
            for (let i = 0; i < data.length; i++) {
                list[i] = {
                    no: i+1,
                    app_id: data[i].app_id,
                    nama_app: data[i].nama_app,
                    url_app: data[i].url_app,
                    logo_app: data[i].logo_app,
                    status_app: data[i].status_app,
                }
            }
            apps.value = list;
            console.log(list)
        } else {
            console.log('tidak ada')
        }
    })
}

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
};

onBeforeMount(() => {
    initFilters1()
});

onMounted(() => {
    // loadApp();
    // countryService.getCountries().then((data) => (countries.value = data));
    // searchCountry()
    // searchCountry()
    loadUser();
});
// export default {
//     setup(){
//         const payload = JSON.parse(localStorage.getItem('payload'));
//         const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/home' });
//         const breadcrumbItems = ref([{ label: 'Home', to:'/home' }, { label: 'Management User', class:'font-bold' }]);
        
//         const apps  = ref(null);
//         const users  = ref(null);
//         const filters1 = ref(null);

//         const countries = ref([]);
//         const filteredCountries = ref(null);
//         const countryService = new CountryService();

//         const searchCountry = (event) => {
//             //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
//             const filtered = [];
//             const query = event.query;
//             for (let i = 0; i < countries.value.length; i++) {
//                 const country = countries.value[i];
//                 if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
//                     filtered.push(country);
//                 }
//             }
//             filteredCountries.value = filtered;
//         };

//         const loadApp = () => {
//             AppService.getApp().then(res => {
//                 const load = res.data;
//                 if (load.code == 200) {
//                     const data = load.data;
//                     const list = [];
//                     for (let i = 0; i < data.length; i++) {
//                         list[i] = {
//                             no: i+1,
//                             app_id: data[i].app_id,
//                             nama_app: data[i].nama_app,
//                             url_app: data[i].url_app,
//                             logo_app: data[i].logo_app,
//                             status_app: data[i].status_app,
//                         }
//                     }
//                     apps.value = list;
//                     console.log(list)
//                 } else {
//                     console.log('tidak ada')
//                 }
//             })
//         }

//         const initFilters1 = () => {
//             filters1.value = {
//                 global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//             };
//         };

//         onBeforeMount(() => {
//             initFilters1()
//         });

//         onMounted(() => {
//             loadApp();
//             countryService.getCountries().then((data) => (countries.value = data));
//             // searchCountry()
//             // searchCountry()
//             // loadUser();
//         });

//         return{
//             payload, breadcrumbHome, breadcrumbItems, apps, filters1, users, filteredCountries, countries
//         }
//     }
// }
</script>

<template>
    <div class="grid">
        <div class="col-12 md:col-12">
            <div class="card p-fluid">
                <span class="p-float-label">
                    <AutoComplete id="autocomplete" v-model="users" :suggestions="filteredCountries" @complete="searchCountry($event)" @change="loadSelected" field="name"></AutoComplete>
                    <label for="autocomplete">Select User</label>
                </span>
                <div class="grid mt-4" v-if="userid != null">
                    <div class="col-12 md:col-6">
                        <h6> <i class="pi pi-user"></i> {{userid.name}}</h6>
                        <h6>Test</h6>
                        <h6>Test</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>