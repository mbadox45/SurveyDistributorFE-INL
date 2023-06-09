<script setup>
import { onMounted, ref } from 'vue';

// Variable
const payload = JSON.parse(localStorage.getItem('payload'));
const form_disabled = ref(true);
const btn_label = ref('Edit Profile');
const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/home' });
const breadcrumbItems = ref([{ label: 'Home', to:'/home' }, { label: 'User Profile', class:'font-bold' }]);
const loadKelamin = ref(listKelamin);
const selectedKelamin = ref(null);
const loadAgama = ref(listAgama);
const loadPendidikan = ref(listPendidikan);
const loadStatusKawin = ref(listStatusKawin);
const loadProv = ref([]);
const form_user = ref(formUser);
const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);
const dropdownItem = ref(null);


// API
import UserService from '@/api/UserService';
import LocationService from '@/api/LocationService';
import {listKelamin, listAgama, formUser, listPendidikan, listStatusKawin} from '@/api/DataVariable';

// Given accsess public funtion
onMounted(() => {
    loadUsers();
    // loadDataProv();
    // funcSelected();
});

// Function
const loadUsers = async () => {
    UserService.getUserID(payload.sub).then(res => {
        const load = res.data;
        if (load.code == 200) {
            const data  = load.data
            form_user.value = {
                id:data.id,
                nik:data.nik,
                nama:data.name,
                email:data.email,

                // Lahir
                tgl_lahir:data.tgl_lahir,
                prov_lahir:data.prov_lahir,
                kabkot_lahir:data.kabkot_lahir,
                kelamin:data.kelamin,
                statuskawin:data.statuskawin,
                noHP:data.noHP,
                pendidikan:data.pendidikan,
                jurusan:data.jurusan,
                agama:data.agama,
                domisili:data.domisili,

                // Alamat KTP
                prov_ktp:data.prov_ktp,
                kabkot_ktp:data.kabkot_ktp,
                kec_ktp:data.kec_ktp,
                kel_ktp:data.kel_ktp,
                alamat_ktp:data.alamat_ktp,

                // Alamat Domisili
                prov_domisili:data.prov_domisili,
                kabkot_domisili:data.kabkot_domisili,
                kec_domisili:data.kec_domisili,
                kel_domisili:data.kel_domisili,
                alamat_domisili:data.alamat_domisili,

                // Data Pekerjaan
                nrk:data.nrk,
                npwp:data.npwp,
                jabatan:data.jabatan,
                divisi:data.divisi,
                departemen:data.departemen,
                job_level:data.job_level,
                tanggungan:data.tanggungan,
                training:data.training,
                office:data.office,
                status:data.status,
                tgl_masuk:data.tgl_masuk,
                tgl_sampai:data.tgl_keluar,
                status_karyawan:data.status_karyawan,

                // Fasilitas Pekerjaan
                bpjs_kesehatan:data.bpjs_kesehatan,
                bpjs_ketenagakerjaan:data.bpjs_ketenagakerjaan,
                norek:data.no_rekening,
                rek:data.rekening,
                faskes1:data.faskes1,
                gaji:data.gaji_pokok,
                tunjangan_t:data.tunjangan_tetap,
                tunjangan_tt:data.tunjangan_tidak_tetap,
                keterangan:data.keterangan,
            }
            console.log(data);
        } else {
            console.log(load.message);
        }
    })
};

const loadDataProv = async () => {
    LocationService.getProv().then(res => {
        const load = res.data.provinsi;
        const list = [];
        for (let i = 0; i < load.length; i++) {
            list[i] = {
                code: load[i].id,
                name: load[i].nama
            }
        }
        loadProv.value = list;
    })
}

const formatCurrency = (dis) => {
    if (dis == true) {
        form_disabled.value = true
        btn_label.value = 'Edit Profile'
    } else {
        form_disabled.value = false
        btn_label.value = 'Batal'
    }
    console.log(form_disabled.value)
};

const funcLoadKelamin = () => {
    // Watch for changes in form_user.kelamin and get the selected option
    watch(() => form_user.kelamin, (newValue) => {
      selectedKelamin.value = loadKelamin.value.find((option) => option.code === newValue);
    });

    return {selectedKelamin}
}

const funcSelected = () => {
    funcLoadKelamin();
}

</script>

<template>
    <div class="grid">
        <div class="col-12 md:col-12">
            <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" class="bg-gray-300" />
        </div>
        <div class="col-12 md:col-4">
            <div class="card p-fluid">
                <div class="surface-section">
                    <div class="text-700 text-center">
                        <span class="p-5 shadow-2 mb-3 inline-block surface-card border-circle">
                            <i class="pi pi-user text-8xl text-blue-500"></i>
                        </span>
                        <div class="text-900 font-bold text-2xl mb-3">{{payload.name}}</div>
                        <div class="text-700 text-gray-400 text-xl mb-5">{{payload.jabatan}}</div>
                        <hr>
                        <div class="text-700 text-md font-semibold mb-5">{{payload.departemen}}</div>
                        <Button @click="formatCurrency(!form_disabled)" :label="btn_label" :icon="form_disabled == true ? 'pi pi-pencil':'pi pi-times'" :class="form_disabled == true ? 'p-button-secondary ':'p-button-danger'" class="font-bold px-5 py-3 p-button-rounded white-space-nowrap"></Button>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 md:col-8">
            <div class="card">
                <h5>IDENTITAS USER</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-12">
                        <label for="firstname2">Alamat Email</label>
                        <InputText id="email" type="email" :disabled="form_disabled" v-model="form_user.email"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Nama</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.nama"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">NIK</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.nik"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Jenis Kelamin</label>
                        <Dropdown v-model="form_user.kelamin" :value="form_user.kelamin.code" :options="loadKelamin" :disabled="form_disabled" optionLabel="name" placeholder="Jenis Kelamin" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Agama</label>
                        <Dropdown v-model="form_user.agama" :options="loadKelamin" :disabled="form_disabled" optionLabel="name" placeholder="Agama" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Pendidikan Terakhir</label>
                        <Dropdown v-model="form_user.pendidikan" :options="loadPendidikan" :disabled="form_disabled" optionLabel="name" placeholder="Pendidikan Terakhir" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Jurusan</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.jurusan"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Status Kawin</label>
                        <Dropdown v-model="form_user.statuskawin" :options="loadStatusKawin" :disabled="form_disabled" optionLabel="name" placeholder="Pendidikan Terakhir" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">No. HP</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.noHP"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Tgl Lahir</label>
                        <Calendar inputId="calendar" v-model="form_user.tgl_lahir" :disabled="form_disabled"></Calendar>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Provinsi Lahir</label>
                        <Dropdown v-model="form_user.prov_lahir" :options="loadProv" :disabled="form_disabled" optionLabel="name" placeholder="Provinsi Lahir" />
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Kab/Kota Lahir</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.noHP"/>
                    </div>
                    <div class="field col-12">
                        <label for="address">Address</label>
                        <Textarea id="address" rows="4" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="city">City</label>
                        <InputText id="city" type="text" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="state">State</label>
                        <Dropdown id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="zip">Zip</label>
                        <InputText id="zip" type="text" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
