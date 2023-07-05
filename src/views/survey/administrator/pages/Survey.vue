<script setup>
import { onMounted, ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';


// API
import {formSurvey, listSurvey} from '@/api/DataVariable';


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

const editQuestion = (id, title, desc) => {
    router.push(`/edit-question/${id}?title=${title}&desc=${desc}`);
}

const previewQuestion = (id, title, desc) => {
    console.log(router.push({path:`/form/preview/${id}`, query:{title: title, desc:desc}, target: '_blank'}))
    // router.push({path:`/form/preview/${id}`, query:{title: title, desc:desc}, target: '_blank'});
}

const loadSurvey = () => {
    const list = []
    for (let i = 0; i < listSurvey.length; i++) {
        list[i] = {
            id: listSurvey[i].id,
            title: listSurvey[i].title,
            desc: listSurvey[i].desc,
            from: listSurvey[i].from,
            to: listSurvey[i].to,
            status: listSurvey[i].status,
        };
        // checked.value[id]
    }
    list_Survey.value = list;
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

const showDialog = (status, id) => {
    dialogs.value = true;
    if (status == 'add') {
        titledialogs.value = 'Create Survey';
        statusdialog.value = status
        resetForm()
    } else {
        titledialogs.value = 'Edit Survey';
    }
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
                <div class="field col-12 md:col-12">
                    <label for="firstname2">Judul</label>
                    <InputText id="email" type="email" v-model="forms.title"/>
                </div>
                <div class="field col-12 md:col-12">
                    <label for="firstname2">Deskripsi</label>
                    <Textarea v-model="forms.desc" autoResize rows="5" cols="30" />
                </div>
                <div class="field col-12 md:col-12">
                    <strong>Tanggal Berlaku</strong>
                </div>
                <div class="field col-6 md:col-6">
                    <label for="lastname2">Mulai</label>
                    <Calendar inputId="calendar" v-model="forms.from"></Calendar>
                </div>
                <div class="field col-6 md:col-6">
                    <label for="lastname2">Sampai</label>
                    <Calendar inputId="calendar" v-model="forms.to"></Calendar>
                </div>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="dialogs = false" class="p-button-outlined p-button-danger" />
                <Button label="Save" icon="pi pi-save" @click="postDialog" class="p-button-outlined p-button-success" autofocus :disabled="disablebtnchangepass" />
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
                        <Button severity="info" size="small" icon="pi pi-plus" outlined label="Add Survey" @click="showDialog('add','')" />
                    </div>
                </div>
                <DataView :value="filteredList" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField" >
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
                                        <span class="border-circle w-2rem h-2rem flex align-items-center justify-content-center" :class="slotProps.data.status == true ? 'bg-primary' : 'bg-red-500 text-white'"><i class="pi pi-check" v-if="slotProps.data.status == true"></i><i class="pi pi-times" v-else></i></span>
                                        <span class="ml-2 font-medium">{{slotProps.data.status == true ? 'Active' : 'Non Active'}}</span>
                                    </Chip>
                                    <!-- <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" class="mb-2"></Rating> -->
                                    <div class="flex align-items-center">
                                        <i class="pi pi-clock mr-2"></i>
                                        <span class="font-semibold">{{ slotProps.data.from }} - {{ slotProps.data.to }}</span>
                                    </div>
                                </div>
                                <div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                                    <Button icon="pi pi-check" v-tooltip.left="'Edit Survey'" class="mb-2" severity="secondary" size="small" rounded></Button>
                                    <Button icon="pi pi-question" class="mb-2" v-tooltip.left="'Edit Pertanyaan'" severity="warning" size="small" rounded @click="editQuestion(slotProps.data.id, slotProps.data.title, slotProps.data.desc)"></Button>
                                    <Button icon="pi pi-eye" class="mb-2" v-tooltip.left="'Preview'" severity="success" size="small" rounded @click="previewQuestion(slotProps.data.id, slotProps.data.title, slotProps.data.desc)"></Button>
                                    <!-- <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">{{ slotProps.data.inventoryStatus }}</span> -->
                                </div>
                            </div>
                        </div>
                    </template>

                    <template #grid="slotProps">
                        <div class="col-12 md:col-4">
                            <div class="card m-3 border-1 surface-border">
                                <div class="flex align-items-center justify-content-between">
                                    <div class="flex align-items-center">
                                        <i class="pi pi-tag mr-2"></i>
                                        <span class="font-semibold">{{ slotProps.data.category }}</span>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <img :src="'/survey3.png'" :alt="slotProps.data.title" class="w-9 shadow-2 my-3 mx-0" />
                                    <div class="text-2xl font-bold">{{ slotProps.data.title }}</div>
                                    <div class="mb-3">{{ slotProps.data.desc }}</div>
                                </div>
                                <div class="flex align-items-center justify-content-between">
                                    <Button icon="pi pi-check" label="Edit Survey" severity="secondary" size="small"></Button>
                                    <Button icon="pi pi-pencil" label="Edit Question" severity="info" outlined size="small"></Button>
                                    <Button icon="pi pi-eye" label="Preview" severity="success" size="small"></Button>
                                </div>
                            </div>
                        </div>
                    </template>
                </DataView>
            </div>
        </div>
    </div>
</template>