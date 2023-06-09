export const listKelamin = [
    { name: 'Pria', code: 'LK' },
    { name: 'Wanita', code: 'PR' },
]

export const listStatusKawin = [
    { name: 'Belum Kawin', code: 'belum menikah' },
    { name: 'Kawin', code: 'menikah' },
]

export const listAgama = [
    { name: 'Islam', code: 'islam' },
    { name: 'Protestan', code: 'protestan' },
    { name: 'Khatolik', code: 'khatolik' },
    { name: 'Hindu', code: 'hindu' },
    { name: 'Budha', code: 'budha' },
    { name: 'Konghucu', code: 'konghucu' },
]

export const listPendidikan = [
    { name: 'SD', code: 'sd' },
    { name: 'SMP', code: 'smp' },
    { name: 'SLTA Sederajat', code: 'sma' },
    { name: 'D3', code: 'd3' },
    { name: 'D4/S1', code: 's1' },
    { name: 'S2', code: 's2' },
    { name: 'S3', code: 's3' },
]

export const formUser = {
    id:0,
    nik:'',
    nama:'',
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
    status_karyawan:'',                
    tgl_masuk:'',                
    tgl_sampai:'',   

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
}