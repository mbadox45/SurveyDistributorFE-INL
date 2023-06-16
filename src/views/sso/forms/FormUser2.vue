<script setup>
import { onMounted, onBeforeMount, defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';

// API
import UserService from '@/api/UserService';
import LocationService from '@/api/LocationService';
import {listKelamin, listAgama, formUser, listPendidikan, listStatusKawin} from '@/api/DataVariable';

// Variable
const router = useRouter();
const form_disabled = ref(false);
const loadKelamin = ref(listKelamin);
const selectedKelamin = ref(null);
const loadAgama = ref(listAgama);
const loadPendidikan = ref(listPendidikan);
const loadStatusKawin = ref(listStatusKawin);
const loadProv = ref([]);
const form_user = ref(formUser);

// Given accsess public funtion
onBeforeMount(() => {
    // loadUsers();
    loadDataProv();
});


// Function

const loadUsers = async () => {
    const params = router.currentRoute.value.params;
    if (params.id == null) {
        form_user.value = formUser;
    } else {
        UserService.getUserID(params.id).then(res => {
            const load = res;
            console.log(load)
            const data  = load
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
    })
}

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

const linkDirection = (link) => {
    router.push(link);
    // displayConfirmation.value = true;
};

</script>

<template>
    <div class="grid">
        <div class="col-12 md:col-12">
            <div class="card">
                <h5>IDENTITAS USER</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-4">
                        <label for="firstname2">Alamat Email</label>
                        <InputText id="email" type="email" :disabled="form_disabled" v-model="form_user.email"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Nama</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.nama"/>
                    </div>
                    <div class="field col-12 md:col-4">
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
                </div>
                <hr/>
                <h5>ALAMAT KTP</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Provinsi</label>
                        <Dropdown v-model="form_user.prov_ktp" :value="form_user.kelamin.code" :options="loadKelamin" :disabled="form_disabled" optionLabel="name" placeholder="Provinsi" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Kabupaten/Kota</label>
                        <Dropdown v-model="form_user.kabkot_ktp" :options="loadKelamin" :disabled="form_disabled" optionLabel="name" placeholder="Kabupaten/Kota" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Kecamatan</label>
                        <Dropdown v-model="form_user.kec_ktp" :options="loadPendidikan" :disabled="form_disabled" optionLabel="name" placeholder="Kecamatan" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Kelurahan</label>
                        <Dropdown v-model="form_user.kel_ktp" :options="loadPendidikan" :disabled="form_disabled" optionLabel="name" placeholder="Kelurahan" />
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
                        <Dropdown v-model="form_user.prov_domisili" :value="form_user.kelamin.code" :options="loadKelamin" :disabled="form_disabled" optionLabel="name" placeholder="Provinsi" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Kabupaten/Kota</label>
                        <Dropdown v-model="form_user.kabkot_domisili" :options="loadKelamin" :disabled="form_disabled" optionLabel="name" placeholder="Kabupaten/Kota" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Kecamatan</label>
                        <Dropdown v-model="form_user.kec_domisili" :options="loadPendidikan" :disabled="form_disabled" optionLabel="name" placeholder="Kecamatan" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Kelurahan</label>
                        <Dropdown v-model="form_user.kel_domisili" :options="loadPendidikan" :disabled="form_disabled" optionLabel="name" placeholder="Kelurahan" />
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
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.nrk"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">NPWP</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.npwp"/>
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Divisi</label>
                        <Dropdown v-model="form_user.divisi" :value="form_user.kelamin.code" :options="loadKelamin" :disabled="form_disabled" optionLabel="name" placeholder="Provinsi" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Departemen</label>
                        <Dropdown v-model="form_user.departemen" :options="loadKelamin" :disabled="form_disabled" optionLabel="name" placeholder="Kabupaten/Kota" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Job Level</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.job_level"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Tanggungan</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.tanggungan"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Training</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.training"/>
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Penempatan</label>
                        <Dropdown v-model="form_user.office" :options="loadPendidikan" :disabled="form_disabled" optionLabel="name" placeholder="Kecamatan" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Status Karyawan</label>
                        <Dropdown v-model="form_user.pendidikan" :options="loadPendidikan" :disabled="form_disabled" optionLabel="name" placeholder="Kelurahan" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Tgl Masuk</label>
                        <Calendar inputId="calendar" v-model="form_user.tgl_masuk" :disabled="form_disabled"></Calendar>
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="lastname2">Tgl Keluar</label>
                        <Calendar inputId="calendar" v-model="form_user.tgl_keluar" :disabled="form_disabled"></Calendar>
                    </div>
                </div>
                <h5>FASILITAS PEGAWAI</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">BPJS Kesehatan</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.bpjs_kesehatan"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Faskes 1</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.faskes1"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">BPJS Ketenagakerjaan</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.bpjs_ketenagakerjaan"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Nomor Rekening</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.norek"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Nama Bank</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.rek"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Gaji Pokok</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.gaji"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Tunjangan Tetap</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.tunjangan_t"/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="lastname2">Tunjangan Tidak Tetap</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.tunjangan_tt"/>
                    </div>
                    <div class="field col-12 md:col-12">
                        <label for="lastname2">Keterangan</label>
                        <InputText id="lastname2" type="text" :disabled="form_disabled" v-model="form_user.keterangan"/>
                    </div>
                </div>
                <div class="grid">
                    <div class="field col-6">
                        <Button label="Back" class="p-button-danger" @click="linkDirection('/management-user')" />
                    </div>
                    <div class="field col-6 text-right">
                        <Button label="Save" class="p-button-outlined p-button-success mx-2" />
                        <Button label="Reset" class="p-button-outlined p-button-warning" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
