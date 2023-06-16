<script setup>
import { onMounted, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

// API
import UserService from '@/api/UserService';
import LocationService from '@/api/LocationService';
import {listKelamin, listAgama, formUser, listPendidikan, listStatusKawin, listDivisi, listDept, listKantor, listStatusKaryawan} from '@/api/DataVariable';

// Variable
const toast = useToast();
const router = useRouter();
const payload = JSON.parse(localStorage.getItem('payload'));
const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/home' });
const breadcrumbItems = ref(null);
const form_disabled = ref(false);
const btn_label = ref('Edit Profile');

const loadKelamin = ref(listKelamin);
const loadAgama = ref(listAgama);
const loadPendidikan = ref(listPendidikan);
const loadStatusKawin = ref(listStatusKawin);
const loadDivisi = ref(listDivisi)
const loadDept = ref(listDept)
const loadKantor = ref(listKantor)
const loadStatusKaryawan = ref(listStatusKaryawan)

const loadProv = ref([]);
const loadProvKTP = ref([]);
const loadProvDomisili = ref([]);
const loadKabKot = ref([]);
const loadKabKotKTP = ref([]);
const loadKabKotDomisili = ref([]);
const loadKecKTP = ref([]);
const loadKecDomisili = ref([]);
const loadKelKTP = ref([]);
const loadKelDomisili = ref([]);

const form_user = ref(formUser);
const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);
const dropdownItem = ref(null);

// Given accsess public funtion
onBeforeMount(() => {
    loadDataProv();
    loadBreadCrumbs();
    setTimeout(function() {
        loadUsers();
    }, 500);
});

onMounted(() => {
})

// Function

const loadBreadCrumbs = () => {
    const params = router.currentRoute.value.params;
    if (params.id == null) {
        breadcrumbItems.value = [{ label: 'Home', to:'/home' }, { label: 'Management User', to:'/management-user' }, { label: 'Add User', class:'font-bold', disabled:true }]
    } else {
        breadcrumbItems.value = [{ label: 'Home', to:'/home' }, { label: 'Management User', to:'/management-user' }, { label: 'Edit User', disabled:true }, { label: params.id, class:'font-bold', disabled:true }]
    }
}

const loadUsers = async () => {
    const params = router.currentRoute.value.params;
    if (params.id == null) {
        resetForm();
    } else {
        UserService.getUserID(params.id).then(res => {
            const load = res;
            console.log(load)
            const data  = load
            form_user.value = {
                id:data.id,
                nik:data.nik,
                name:data.name,
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
                status:data.status_karyawan,
                tgl_masuk:data.tgl_masuk,
                tgl_sampai:data.tgl_keluar,
    
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
        })
    }
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
        loadProvKTP.value = list;
        loadProvDomisili.value = list;
    })
}

const loadDataKabKot = async (cheking) => {
    let provinsi;
    if (cheking == 'lahir') {
        provinsi  = form_user.value.prov_lahir;
    } else if (cheking == 'ktp') {
        provinsi  = form_user.value.prov_ktp;
    } else {
        provinsi  = form_user.value.prov_domisili;
    }
    // console.log(provinsi)
    LocationService.getKabKot(provinsi.code).then(res => {
        const load = res.data.kota_kabupaten;
        const list = [];
        for (let i = 0; i < load.length; i++) {
            list[i] = {
                code: load[i].id,
                name: load[i].nama
            }
        }
        if (cheking == 'lahir') {
            loadKabKot.value = list;
        } else if (cheking == 'ktp') {
            loadKabKotKTP.value = list;
        } else {
            loadKabKotDomisili.value = list;
        }
    })
}

const loadDataKec = async (cheking) => {
    let kabkots;
    if (cheking == 'ktp') {
        kabkots  = form_user.value.kabkot_ktp;
    } else {
        kabkots  = form_user.value.kabkot_domisili;
    }
    // console.log(provinsi)
    LocationService.getKec(kabkots.code).then(res => {
        const load = res.data.kecamatan;
        const list = [];
        for (let i = 0; i < load.length; i++) {
            list[i] = {
                code: load[i].id,
                name: load[i].nama
            }
        }
        if (cheking == 'ktp') {
            loadKecKTP.value = list;
        } else {
            loadKecDomisili.value = list;
        }
    })
}

const loadDataKel = async (cheking) => {
    let kelurahan;
    if (cheking == 'ktp') {
        kelurahan  = form_user.value.kec_ktp;
    } else {
        kelurahan  = form_user.value.kec_domisili;
    }
    // console.log(provinsi)
    LocationService.getKel(kelurahan.code).then(res => {
        const load = res.data.kelurahan;
        const list = [];
        for (let i = 0; i < load.length; i++) {
            list[i] = {
                code: load[i].id,
                name: load[i].nama
            }
        }
        if (cheking == 'ktp') {
            loadKelKTP.value = list;
        } else {
            loadKelDomisili.value = list;
        }
    })
}

const submitData = () => {
    const params = router.currentRoute.value.params;

    if (
        form_user.value.prov_lahir.code &&
        form_user.value.kabkot_lahir.code &&
        form_user.value.prov_domisili.code &&
        form_user.value.kabkot_domisili.code &&
        form_user.value.kel_domisili.code &&
        form_user.value.kec_domisili.code &&
        form_user.value.prov_ktp.code &&
        form_user.value.kabkot_ktp.code &&
        form_user.value.kec_ktp.code &&
        form_user.value.kel_ktp.code &&
        form_user.value.kelamin.code &&
        form_user.value.pendidikan.code &&
        form_user.value.statuskawin.code &&
        form_user.value.agama.code &&
        form_user.value.divisi.code &&
        form_user.value.office.code &&
        form_user.value.departemen.code
    ) {
        form_user.value.domisili = 'lokal'
        form_user.value.prov_lahir = form_user.value.prov_lahir.code
        form_user.value.kabkot_lahir = form_user.value.kabkot_lahir.code
        form_user.value.prov_domisili = form_user.value.prov_domisili.code
        form_user.value.kabkot_domisili = form_user.value.kabkot_domisili.code
        form_user.value.kel_domisili = form_user.value.kel_domisili.code
        form_user.value.kec_domisili = form_user.value.kec_domisili.code
        form_user.value.prov_ktp = form_user.value.prov_ktp.code
        form_user.value.kabkot_ktp = form_user.value.kabkot_ktp.code
        form_user.value.kec_ktp = form_user.value.kec_ktp.code
        form_user.value.kel_ktp = form_user.value.kel_ktp.code
        form_user.value.kelamin = form_user.value.kelamin.code
        form_user.value.pendidikan = form_user.value.pendidikan.code
        form_user.value.statuskawin = form_user.value.statuskawin.code
        form_user.value.agama = form_user.value.agama.code
        form_user.value.office = form_user.value.office.code
        form_user.value.divisi = form_user.value.divisi.code
        form_user.value.departemen = form_user.value.departemen.code
        
        if (params.id == null) {
            console.log('Add User');
            // console.log(form_user.value)
            UserService.addUser(form_user.value).then(res => {
                const load = res.data;
                // console.log(load);
                if (load.code == 200) {
                    toast.add({ severity: 'success', summary: 'Successfully', detail: 'Data saved successfully', life: 3000 });
                    setTimeout(function() {
                        linkDirection('/management-user');
                    }, 3000);
                } else {
                    toast.add({ severity: 'error', summary: 'Failed', detail: 'Post data failed', life: 3000 });
                }
            })
        } else {
            console.log('Update User');
            // console.log(form_user.value)
            UserService.updateUser(form_user.value.id, form_user.value).then(res => {
                const load = res.data;
                // console.log(load);
                if (load.code == 200) {
                    toast.add({ severity: 'success', summary: 'Successfully', detail: 'Data saved successfully', life: 3000 });
                    setTimeout(function() {
                        linkDirection('/management-user');
                    }, 3000);
                } else {
                    toast.add({ severity: 'error', summary: 'Failed', detail: 'Post data failed', life: 3000 });
                }
            })
        }
    } else {
        console.log('Harap Dilengkapi');
        toast.add({ severity: 'warn', summary: 'Confirmed', detail: 'Please complete the data', life: 3000 });
    }

}

const resetForm = () => {
    form_user.value = {
        id:0,
        nik:'',
        name:'',
        email:'',
        // Lahir                
        tgl_lahir:'',                
        prov_lahir:'',                
        kabkot_lahir:'',                
        kelamin:'',                
        statuskawin:'',                
        noHP:'',                
        pendidikan:'',                
        jurusan:'',                
        agama:'',                
        domisili:'', 

        // Alamat KTP                
        prov_ktp:'',                
        kabkot_ktp:'',                
        kec_ktp:'',                
        kel_ktp:'',                
        alamat_ktp:'',   

        // Alamat Domisili                
        prov_domisili:'',                
        kabkot_domisili:'',                
        kec_domisili:'',                
        kel_domisili:'',                
        alamat_domisili:'',   

        // Data Pekerjaan                
        nrk:'',                
        npwp:'',                
        jabatan:'',                
        divisi:'',                
        departemen:'',                
        job_level:'',                
        tanggungan:'',                
        training:'',                
        office:'',                
        status:'',                
        tgl_masuk:'',                
        tgl_sampai:'',   
        masa_kerja:'1 thn',

        // Fasilitas Pekerjaan                
        bpjs_kesehatan:'',                
        bpjs_ketenagakerjaan:'',                
        norek:'',                
        rek:'',                
        faskes1:'',                
        gaji:'',                
        tunjangan_t:'',                
        tunjangan_tt:'',                
        keterangan:'',
    };
}

const linkDirection = (link) => {
    router.push(link);
    // displayConfirmation.value = true;
};

</script>

<template>
    <div class="grid">
        <div class="col-12 md:col-12">
            <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" class="bg-gray-300" />
        </div>

        <div class="col-12 md:col-12">
            <Toast position="top-center" />
            <div class="card">
                <h5>IDENTITAS USER</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-4">
                        <label for="firstname2">Alamat Email</label>
                        <InputText id="email" type="email" :disabled="form_disabled" v-model="form_user.email"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Nama</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.name"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">NIK</label>
                        <InputText id="lastname2" type="number" :disabled="form_disabled" v-model="form_user.nik"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Jenis Kelamin</label>
                        <Dropdown v-model="form_user.kelamin" :options="loadKelamin" optionValue="kelamin" :disabled="form_disabled" optionLabel="name" placeholder="Jenis Kelamin" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Agama</label>
                        <Dropdown v-model="form_user.agama" :options="loadAgama" optionValue="agama" :disabled="form_disabled" optionLabel="name" placeholder="Agama" />
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
                        <Dropdown v-model="form_user.statuskawin" :options="loadStatusKawin" :disabled="form_disabled" optionLabel="name" placeholder="Status Kawin" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">No. HP</label>
                        <InputText id="lastname2" type="number" :disabled="form_disabled" v-model="form_user.noHP"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Tgl Lahir</label>
                        <Calendar inputId="calendar" v-model="form_user.tgl_lahir" :disabled="form_disabled"></Calendar>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Provinsi Lahir</label>
                        <Dropdown v-model="form_user.prov_lahir" :options="loadProv" :disabled="form_disabled" optionLabel="name" @change="loadDataKabKot('lahir')" placeholder="Provinsi Lahir" />
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Kab/Kota Lahir</label>
                        <Dropdown v-model="form_user.kabkot_lahir" :options="loadKabKot" :disabled="form_disabled" optionLabel="name" placeholder="Kabupaten/Kota" />
                    </div>
                </div>
                <hr/>
                <h5>ALAMAT KTP</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Provinsi</label>
                        <Dropdown v-model="form_user.prov_ktp" :options="loadProvKTP" :disabled="form_disabled" @change="loadDataKabKot('ktp')" optionLabel="name" placeholder="Provinsi" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Kabupaten/Kota</label>
                        <Dropdown v-model="form_user.kabkot_ktp" :options="loadKabKotKTP" :disabled="form_disabled" optionLabel="name" @change="loadDataKec('ktp')" placeholder="Kabupaten/Kota" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Kecamatan</label>
                        <Dropdown v-model="form_user.kec_ktp" :options="loadKecKTP" :disabled="form_disabled" optionLabel="name" @change="loadDataKel('ktp')" placeholder="Kecamatan" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Kelurahan</label>
                        <Dropdown v-model="form_user.kel_ktp" :options="loadKelKTP" :disabled="form_disabled" optionLabel="name" placeholder="Kelurahan" />
                    </div>
                    <div class="field col-12">
                        <label for="address">Alamat</label>
                        <Textarea id="address" rows="4" v-model="form_user.alamat_ktp" />
                    </div>
                </div>
                <h5>ALAMAT DOMISILI</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Provinsi</label>
                        <Dropdown v-model="form_user.prov_domisili" :options="loadProvDomisili" :disabled="form_disabled" @change="loadDataKabKot('domisili')" optionLabel="name" placeholder="Provinsi" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Kabupaten/Kota</label>
                        <Dropdown v-model="form_user.kabkot_domisili" :options="loadKabKotDomisili" :disabled="form_disabled" optionLabel="name" @change="loadDataKec('domisili')" placeholder="Kabupaten/Kota" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Kecamatan</label>
                        <Dropdown v-model="form_user.kec_domisili" :options="loadKecDomisili" :disabled="form_disabled" optionLabel="name" @change="loadDataKel('domisili')" placeholder="Kecamatan" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Kelurahan</label>
                        <Dropdown v-model="form_user.kel_domisili" :options="loadKelDomisili" :disabled="form_disabled" optionLabel="name" placeholder="Kelurahan" />
                    </div>
                    <div class="field col-12">
                        <label for="address">Alamat</label>
                        <Textarea id="address" v-model="form_user.alamat_domisili" rows="4" />
                    </div>
                </div>
                <hr/>
                <h5>DATA PEGAWAI</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">NRK</label>
                        <InputText id="lastname2" type="number" :disabled="form_disabled" v-model="form_user.nrk"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">NPWP</label>
                        <InputText id="lastname2" type="number" :disabled="form_disabled" v-model="form_user.npwp"/>
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Divisi</label>
                        <Dropdown v-model="form_user.divisi" :options="loadDivisi" :disabled="form_disabled" optionLabel="name" placeholder="Divisi" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Departemen</label>
                        <Dropdown v-model="form_user.departemen" :options="loadDept" :disabled="form_disabled" optionLabel="name" placeholder="Departemen" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Jabatan</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.jabatan"/>
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Job Level</label>
                        <InputText id="lastname2" type="number" :disabled="form_disabled" v-model="form_user.job_level"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Tanggungan</label>
                        <InputText id="lastname2" type="number" :disabled="form_disabled" v-model="form_user.tanggungan"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Training</label>
                        <InputText id="lastname2" type="number" :disabled="form_disabled" v-model="form_user.training"/>
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Penempatan</label>
                        <Dropdown v-model="form_user.office" :options="loadKantor" :disabled="form_disabled" optionLabel="name" placeholder="Penempatan" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Status Karyawan</label>
                        <Dropdown v-model="form_user.pendidikan" :options="loadStatusKaryawan" :disabled="form_disabled" optionLabel="name" placeholder="Status Karyawan" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Tgl Masuk</label>
                        <Calendar inputId="calendar" v-model="form_user.tgl_masuk" :disabled="form_disabled"></Calendar>
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Tgl Keluar</label>
                        <Calendar inputId="calendar" v-model="form_user.tgl_sampai" :disabled="form_disabled"></Calendar>
                    </div>
                </div>
                <h5>FASILITAS PEGAWAI</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">BPJS Kesehatan</label>
                        <InputText id="lastname2" type="number" :disabled="form_disabled" v-model="form_user.bpjs_kesehatan"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Faskes 1</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.faskes1"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">BPJS Ketenagakerjaan</label>
                        <InputText id="lastname2" type="number" :disabled="form_disabled" v-model="form_user.bpjs_ketenagakerjaan"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Nomor Rekening</label>
                        <InputText id="lastname2" type="number" :disabled="form_disabled" v-model="form_user.norek"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Nama Bank</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.rek"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Gaji Pokok</label>
                        <InputText id="lastname2" type="number" :disabled="form_disabled" v-model="form_user.gaji"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Tunjangan Tetap</label>
                        <InputText id="lastname2" type="number" :disabled="form_disabled" v-model="form_user.tunjangan_t"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Tunjangan Tidak Tetap</label>
                        <InputText id="lastname2" type="number" :disabled="form_disabled" v-model="form_user.tunjangan_tt"/>
                    </div>
                    <div class="field col-12 md:col-12">
                        <label for="lastname2">Keterangan</label>
                        <InputText id="lastname2" type="number" :disabled="form_disabled" v-model="form_user.keterangan"/>
                    </div>
                </div>
                <div class="grid">
                    <div class="field col-6">
                        <Button label="Back" class="p-button-danger" @click="linkDirection('/management-user')" />
                    </div>
                    <div class="field col-6 text-right">
                        <Button label="Save" class="p-button-outlined p-button-success mx-2" @click="submitData" />
                        <Button label="Reset" class="p-button-outlined p-button-warning" @click="resetForm" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
