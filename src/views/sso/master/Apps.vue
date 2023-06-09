<script>

import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { onMounted, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppService from '@/api/AppService';

export default {
    setup(){
        const payload = JSON.parse(localStorage.getItem('payload'));
        const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/home' });
        const breadcrumbItems = ref([{ label: 'Home', to:'/home' }, { label: 'Management User', class:'font-bold' }]);
        
        const apps  = ref(null);
        const filters1 = ref(null);

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
            loadApp();
            // loadUser();
        });

        return{
            payload, breadcrumbHome, breadcrumbItems, apps, filters1
        }
    }
}
</script>

<template>
    <div class="grid">
        <div class="col-12 md:col-12">
            <div class="card">
                <h5>List App</h5>
                <DataTable :value="apps" :rows="10" :paginator="true" responsiveLayout="scroll" :filters="filters1" v-model:filters="filters1">
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-plus" label="Add User" class="p-button-outlined mb-2"/>
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%" />
                            </span>
                        </div>
                    </template>
                    <template #empty> No customers found. </template>
                    <template #loading> Loading customers data. Please wait. </template>
                    <Column field="no" header="No" :sortable="false" style="width: 5%"></Column>
                    <Column field="nama_app" header="Nama App" :sortable="true" style="width: 35%"></Column>
                    <Column style="width: 35%">
                        <template #header> Logo </template>
                        <template #body="slotProps">
                            <img :src="slotProps.data.logo_app" :alt="slotProps.data.nama_app" width="50" class="shadow-2" />
                        </template>
                    </Column>
                    <Column style="width: 35%">
                        <template #header> URL </template>
                        <template #body>
                            <Button icon="pi pi-link" label="Link" type="button" class="p-button-text p-button-warning"></Button>
                        </template>
                    </Column>
                    <Column field="status_app" header="Status" :sortable="true" style="width: 35%"></Column>
                    <Column style="width: 20%">
                        <template #header> 
                            <div class="text-center w-full">#</div> 
                        </template>
                        <template #body>
                            <div class="flex">
                                <Button icon="pi pi-pencil" type="button" class="p-button-text p-button-warning"></Button>
                                <Button icon="pi pi-trash" type="button" class="p-button-text p-button-danger"></Button>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>  
</template>