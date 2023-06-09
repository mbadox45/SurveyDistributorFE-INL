<script>

import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { onMounted, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import ProductService from '@/service/ProductService';
import UserService from '@/api/UserService';

export default {
    setup(){
        const payload = JSON.parse(localStorage.getItem('payload'));
        const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/home' });
        const breadcrumbItems = ref([{ label: 'Home', to:'/home' }, { label: 'Management User', class:'font-bold' }]);
        
        const products = ref(null);
        const users = ref(null);
        const filters1 = ref(null);

        const productService = new ProductService();

        const loadUser = () => {
            UserService.getUser().then(res => {
                const load = res.data;
                if (load.code == 200) {
                    const data = load.data;
                    const list = [];
                    for (let i = 0; i < data.length; i++) {
                        list[i] = {
                            no: i+1,
                            nrk: data[i].nrk,
                            name: data[i].name,
                            jabatan: data[i].jabatan,
                            divisi: data[i].divisi,
                            departemen: data[i].departemen,
                        }
                    }
                    users.value = list;
                    console.log(list)
                } else {
                    console.log('tidak ada')
                }
            })
        }

        const Produk = () => {
            productService.getProductsSmall().then((data) => {
                products.value = data
                console.log(data)
            });
            // console.log(products);
        }

        const formatCurrency = (value) => {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        };

        const initFilters1 = () => {
            filters1.value = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            };
        };

        onBeforeMount(() => {
            initFilters1()
        });

        onMounted(() => {
            // Produk();
            loadUser();
            // loadDataProv();
            // funcSelected();
        });

        return{
            payload, breadcrumbHome, breadcrumbItems, users, products, formatCurrency, filters1
        }
    }
}
</script>

<template>
    <div class="grid">
        <div class="col-12 md:col-12">
            <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" class="bg-gray-300" />
        </div>
        <div class="col-12 md:col-12">
            <div class="card">
                <h5>Table Users</h5>
                <DataTable :value="users" :rows="10" :paginator="true" responsiveLayout="scroll" :filters="filters1" v-model:filters="filters1">
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
                    <Column field="nrk" header="ID Karyawan" :sortable="true" style="width: 15%"></Column>
                    <Column field="name" header="Nama" :sortable="true" style="width: 25%"></Column>
                    <Column field="jabatan" header="Jabatan" :sortable="true" style="width: 35%"></Column>
                    <Column field="divisi" header="Divisi" :sortable="true" style="width: 35%"></Column>
                    <Column field="departemen" header="Departemen" :sortable="true" style="width: 35%"></Column>
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