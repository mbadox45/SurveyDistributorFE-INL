<script setup>
import { onMounted, ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';


// API
import {formSurvey, listSurvey} from '@/api/DataVariable';
import SurveyService from '@/api/SurveyService';
import {loadAll_SurveyController} from '@/controllers/SurveyController';
import moment from 'moment';


// Variable
const searchKeyword = ref('');
const layout = ref('list');
const sortKey = ref(null);
const sortOrder = ref(null);
const sortField = ref(null);
const checked = ref([]);

const dialogs = ref(false)
const titledialogs = ref(null);
const forms = ref(formSurvey);
const date = new Date();
const statusdialog = ref(null);
const list_Survey = ref([]);
const loadings = ref(true)
const titles = ref()
const descs = ref()

const payload = JSON.parse(localStorage.getItem('payload'));
const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/home' });
const breadcrumbItems = ref([{ label: 'Home', to:'/home' }, { label: 'Management', to:'/survey' }, { label: 'Survey', class:'font-bold', disabled:true  }]);

const toast = useToast();
const router = useRouter();

// Given accsess public funtion
onMounted(() => {
    loadSurvey();
});

const onCheck = (id) => {
    console.log(checked.value[id]);
}

const linked = (cond, id) => {
    if (cond == 'add') {
        router.push(`/form-survey/${cond}`);
    } else {
        router.push(`/form-survey/${cond}?id=${id}`);
    }
}

const previewQuestion = (id, path) => {
    router.push({path:`${path}${id}`, target: '_blank'})
    // router.push({path:`/form/preview/${id}`, query:{title: title, desc:desc}, target: '_blank'});
}

const previewQuestion2 = (path) => {
    router.push({path:`${path}${statusdialog.value}`, query:{title: titles.value, desc:descs.value}, target: '_blank'})
    // router.push({path:`/form/preview/${id}`, query:{title: title, desc:desc}, target: '_blank'});
}

const loadSurvey = async() => {
    try {
        const response = await loadAll_SurveyController();
        const list = [];
        for (let i = 0; i < response.length; i++) {
            const froms = Number(moment(response[i].from).format('YYYYMMDD'));
            const to = Number(moment(response[i].to).format('YYYYMMDD'));
            const now = Number(moment().format('YYYYMMDD'));
            list[i] = {
                id: response[i].id,
                title: response[i].title.toUpperCase(),
                desc: response[i].desc,
                from: response[i].from,
                to: response[i].to,
                status: response[i].status,
                // kondisi: response[i].status == "0" ? "Non Active" : from,
                kondisi: response[i].status == "0" 
                ? "Non Active" 
                : (froms <= now && to >= now) 
                    ? "Active" 
                    : "Expired",
            }
        }
        console.log(list)
        list_Survey.value = list;
        loadings.value = false;
    } catch (error) {
        list_Survey.value = [];
        loadings.value = false;
    }
}

const filteredList = computed(() => {
    return list_Survey.value.filter(item =>
        item.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
});

const resetForm = () => {
    forms.value = {
        id: 0,
        desc: '',
        title: '',
        from: date,
        to: date,
    }
}

const showDialog = (id, title, desc) => {
    dialogs.value = true;
    titledialogs.value = 'Response Survey';
    statusdialog.value = id;
    titles.value = title;
    descs.value = desc;
}

const postDialog = () => {
    console.log(forms.value)
    dialogs.value = false;
    if (statusdialog.value == 'add') {
        console.log(statusdialog.value)
        toast.add({ severity: 'success', summary: 'Successfully', detail: `Data saved successfully`, life: 3000 });
    } else {
        console.log(statusdialog.value)
        toast.add({ severity: 'success', summary: 'Successfully', detail: `Updated successfully`, life: 3000 });
    }
}

</script>

<template>
    <div class="grid">
        <Toast/>
        <Dialog v-model:visible="dialogs" :style="{ width: '650px' }" :modal="true">
            <template #header>
                <h4>{{titledialogs}}</h4>
            </template>
            <div class="p-fluid formgrid grid">
                <div class="field col-6 md:col-6">
                    <label for="lastname2">By Survey</label>
                    <Button label="Go to response by survey" @click="previewQuestion2('/response-survey/')" icon="pi pi-link" class="p-button-outlined p-button-info" />
                </div>
                <div class="field col-6 md:col-6">
                    <label for="lastname2">By User</label>
                    <Button label="Go to response by user" icon="pi pi-link" class="p-button-outlined p-button-success" @click="previewQuestion2('/response-survey-byuser/')"/>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="dialogs = false" class="p-button-outlined p-button-danger" />
            </template>
        </Dialog>
        <div class="col-12 md:col-12">
            <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" class="bg-gray-300" />
        </div>
        <div class="col-12 md:col-12">
            <div class="card">
                <div class="grid">
                    <div class="col-6 md:col-6 sm:col-6">
                        <h5>List Survey</h5>
                    </div>
                    <div class="col-6 md:col-6 sm:col-6 text-right">
                        <Button severity="info" size="small" icon="pi pi-plus" outlined label="Add Survey" @click="linked('add','')" />
                    </div>
                </div>
                <DataView :value="filteredList" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField" v-if="list_Survey.length > 0">
                    <template #header>
                        <div class="grid grid-nogutter">
                            <div class="col-12 text-left">
                                <InputText v-model="searchKeyword" placeholder="Search by title" style="width: 100%" />
                            </div>
                        </div>
                    </template>
                    <template #list="slotProps">
                        <div class="col-12">
                            <div class="flex flex-column md:flex-row align-items-center p-3 w-full">
                                <img :src="'/survey3.png'" :alt="slotProps.data.title" class="my-4 md:my-0 w-9 md:w-8rem mr-5" />
                                <div class="flex-1 text-center md:text-left">
                                    <div class="font-bold text-2xl">{{ slotProps.data.title }}</div>
                                    <div class="mb-3">{{ slotProps.data.desc }}</div>
                                    <Chip class="pl-0 pr-3 mb-2 cursor-pointer">
                                        <span class="border-circle w-2rem h-2rem flex align-items-center justify-content-center" :class="slotProps.data.kondisi == 'Active' ? 'bg-primary' : 'bg-red-500 text-white'"><i class="pi pi-check" v-if="slotProps.data.kondisi == 'Active'"></i><i class="pi pi-times" v-else></i></span>
                                        <span class="ml-2 font-medium">{{slotProps.data.kondisi}}</span>
                                    </Chip>
                                    <!-- <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" class="mb-2"></Rating> -->
                                    <div class="flex align-items-center">
                                        <i class="pi pi-clock mr-2"></i>
                                        <span class="font-semibold">{{ slotProps.data.from }} - {{ slotProps.data.to }}</span>
                                    </div>
                                </div>
                                <div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                                    <Button icon="pi pi-pencil" v-tooltip.left="'Edit Survey'" class="mb-2" severity="warning" size="small" rounded @click="linked('edit',slotProps.data.id)"></Button>
                                    <Button icon="pi pi-external-link" class="mb-2" v-tooltip.left="'Preview'" severity="success" size="small" rounded @click="previewQuestion(slotProps.data.id, '/form/preview/')"></Button>
                                    <!-- <Button icon="pi pi-percentage" class="mb-2" v-tooltip.left="'Respon'" severity="primary" size="small" rounded @click="previewQuestion(slotProps.data.id, '/response-survey/')"></Button> -->
                                    <Button icon="pi pi-percentage" class="mb-2" v-tooltip.left="'Respon'" severity="primary" size="small" rounded @click="showDialog(slotProps.data.id, slotProps.data.title, slotProps.data.desc)"></Button>
                                </div>
                            </div>
                        </div>
                    </template>
                </DataView>
                <div class="text-center mb-5 mt-2" v-else>
                    <span class="text-lg">{{ loadings == true ? '' : 'Data not found' }} </span>
                </div>
                <div class="flex align-items-center justify-content-center mb-3" v-if="loadings == true">
                    <div class="">
                        <ProgressSpinner aria-label="Loading" style="width: 50px; height: 50px" />
                    </div>
                    <div class="text-gray-500 font-semibold">Please wait ...</div>
                </div>
            </div>
        </div>
    </div>
</template>