<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import AppService from '@/api/AppService';

const listApp = ref(null)

onMounted(() => {
    // productService.getProductsSmall().then((data) => (products.value = data));
    loadApp()
});

const loadApp = () => {
    const payload = JSON.parse(localStorage.getItem('payload'));
    if (payload.jabatan == 'super_admin') {
        AppService.getApp().then(res => {
            const list = [];
            for (let i = 0; i < res.length; i++) {
                list[i] = {
                    "app_id": res[i].app_id,
                    "nama_app": res[i].nama_app,
                    "url_app": res[i].url_app,
                    "logo_app": res[i].logo_app,
                    "status_app": res[i].status_app,
                }
            }
            listApp.value = list;
            console.log(list);
        })
    } else {
        AppService.getAppByUserID(payload.sub).then(async res => {
            const load = res;
            const list = [];
            for (let i = 0; i < load.length; i++) {
                await AppService.getAppByID(load[i].app_id).then(response =>{
                    list[i] = {
                        "logo_app": response.logo_app,
                        "app_id": load[i].app_id,
                        "nama_app": response.nama_app,
                        "url_app": response.url_app,
                        "status_app": response.status_app,
                    }
                });
            }
            if (list.length > 0) {
                listApp.value = list;
            } else {
                listApp.value = null;
            }
        });
    }
};

const link = (links) => {
    window.open(links);
};
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-12 xl:col-12 hidden sm:block">
            <div class="card mb-0">
                <div class="flex justify-content-between items-center">
                    <div>
                        <h2 class="block text-500 font-medium mb-3">Selamat Datang di, <strong>Portal SSO</strong></h2>
                        <div class="text-900 font-medium text-xl">PT. INDUSTRI NABATI LESTARI</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-circle p-2">
                        <i class="pi pi-globe text-blue-500" style="font-size:5rem;"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3" v-for="list in listApp" :key="list.app_id">
            <div class="card mb-0">
                <div class="flex">
                    <div class="mr-3">
                        <!-- <img src="layout/images/themes/arya-blue.png" alt="Test" width="50" class="shadow-2" /> -->
                        <img :src="list.logo_app" alt="Test" width="70" height="70" />
                        <!-- <i class="pi pi-globe text-blue-500" style="font-size:5rem;"></i> -->
                    </div>
                    <div class="w-full">
                        <span class="block text-500 text-2xl font-medium mb-2">{{list.nama_app}}</span>
                        <div class="text-900 font-medium text-sm">-</div>
                        <div class="text-right w-full mt-3">
                            <Chip label="Go to app.." class="bg-white text-gray-400 hover:text-blue-400 hover:bg-blue-50 ease-in-out duration-300 cursor-pointer" @click="link(list.url_app)"></Chip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-12 xl:col-12 text-center p-6" v-if="listApp == null">
            <p class="text-gray-500 font-semibold text-xl">- Anda belum mendapatkan akses modul aplikasi -</p>
            <p class="text-red-600 font-semibold text-md">Silahkan hubungi tim ICT untuk mendapatkan hak akses aplikasi !</p>
        </div>
    </div>
</template>
