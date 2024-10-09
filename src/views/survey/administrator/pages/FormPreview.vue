<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute  } from 'vue-router';
import { useToast } from 'primevue/usetoast';

// API
import SurveyService from '@/api/SurveyService';
import {loadByID_SurveyController, postSubmit_SurveyController, loadAnswared_SurveyController} from '@/controllers/SurveyController';
import { FormPreview } from '@/api/DataVariable';

const toast = useToast();
const router = useRouter();
const route = useRoute();
const time = ref(3000)

const surveys = ref({from: '', to:'', title:'', desc:'', id:0});
const pertanyaan = ref([]);
const answare = ref([{id_pertanyaan:null, type:'',value:null}]);
const selectedCategories = ref()
const payload = JSON.parse(localStorage.getItem('payload'));
const roles = localStorage.getItem('roles');
const loading = ref(false)

// Kondisi form sudah di submit(true) jika belum (false)
const finished = ref('-');

const listPertanyaan = ref(FormPreview)

const params = route.params.id;
const judul = route.query.title;
const deskipsi = route.query.desc;

onMounted(() => {
    loadSurvey()
});

const loadSurvey = async() => {
    loading.value = true
    try {
        const answared = await loadAnswared_SurveyController()
        if (answared != null) {
            const filter_ans = answared.find(item => item.id == params);
            if (filter_ans != null) {
                finished.value = 'sudah'
                loading.value = false
            }
        } else {
            const response = await loadByID_SurveyController(params);
            surveys.value = {
                from: response.from,
                to: response.to,
                desc: response.desc,
                title: response.title,
                id: response.id,
            }
            const sp = response.survey_pertanyaans
            const list = []
            for (let i = 0; i < sp.length; i++) {
                const question = sp[i].questions;
                const questions = [];

                question.sort((a, b) => a.id - b.id);
                // Proses penambahan v-model yaitu "model" sebagai media input komponen form
                for (let a = 0; a < question.length; a++) {
                    let model;
                    let extra;
                    if (question[a].type == 'checkbox') {
                        model = [];
                        extra = '';
                    } else if (question[a].type == 'number') {
                        model = 0;
                        extra = '';
                    } else if (question[a].type == 'radio') {
                        model = '';
                        extra = '';
                    } else {
                        model = '';
                        extra = '';
                    }
                    const options = question[a].options
                    options.sort((a, b) => a.id - b.id);
                    questions[a] = {
                        category_id: question[a].category_id,
                        question: question[a].question,
                        require: question[a].require,
                        status: question[a].status,
                        type: question[a].type,
                        id: question[a].id,
                        options: options,
                        pivot: question[a].pivot,
                        model: model,
                        model_extra: extra,
                    }
                }
                list[i] = {
                    id: sp[i].id,
                    value: sp[i].value,
                    question: questions,
                }
            }
            loading.value = false
            pertanyaan.value = list
        }
    } catch (error) {
        loading.value = false
        surveys.value = {from: '', to:'', title:'', desc:'', id:0}
    }
}

const submitForm = async () => {
    const response = await postSubmit_SurveyController(params, pertanyaan.value)
    finished.value = response.finish
    toast.add({ severity: response.severity, summary: 'Info', detail: response.message, life: 5000 });
}

const link = () => {
    router.back();
}

</script>

<template>
    <div class="flex justify-content-center min-h-screen overflow-hidden pb-6 bg-contain" style="background-image: url('/layout/bg4.jpg');">
        <Toast position="top-center"/>
        <div class="flex align-items-center justify-content-center mb-3" v-if="loading == true">
            <div class="">
                <ProgressSpinner aria-label="Loading" style="width: 50px; height: 50px" />
            </div>
            <div class="font-semibold">Please wait ...</div>
        </div>
        <div class="grid w-full justify-content-center" v-else>
            <div class="col-12 md:col-8 sm:col-8 bg-white mt-6 border-round-md" v-show="finished == '-'">
                <div class="flex justify-content-between py-6 px-4 bg-no-repeat bg-cover border-round-md shadow-2" style="background-image: url('/layout/bg2.jpg');">
                    <div class="">
                        <div class="font-bold text-3xl md:text-3xl sm:text-xl mb-1 p-1 bg-cyan-50 border-round-md">{{surveys.title.toLocaleUpperCase()}}</div>
                        <div class="text-gray-500 font-semibold text-md">{{surveys.desc}}</div>
                    </div>
                    <div class="">
                        <img src="/layout/inl.png" alt="PT. Industri Nabati Lestari" class="mr-3 w-5rem">
                        <img src="/layout/n3.png" alt="PT. Perkebunan Nusantara" class="w-5rem">
                    </div>
                </div>
                <!-- <div class="">
                    <h6 class="text-md"><i class="pi pi-user font-semibold mr-2"></i>{{ payload.name }}</h6>
                    <span><i class="pi pi-envelope font-semibold mr-2"></i>{{ payload.email }}</span>
                </div> -->
                <Divider/>
                <div class="card shadow-3" v-for="list in pertanyaan" :key="list.id">
                    <div class="bg-orange-100 border-round-md pt-2 px-2">
                        <span class="text-cyan-800" v-html="list.value"></span>
                        <Divider/>
                    </div>
                    <div v-for="question in list.question" :key="question.id" class="my-4">
                        <div class="grid align-items-center">
                            <div class="">
                                <pre class="font-medium md:text-lg sm:text-xs" style="font-family: Arial, Helvetica, sans-serif; white-space: pre-wrap;" v-html="`${question.question}`"></pre>
                            </div>
                            <div class="">
                                <span class="text-red-600 font-bold text-sm mx-2" v-show="question.require==true">(*)</span>
                            </div>
                        </div>
                        <div v-show="question.type == 'checkbox'">
                            <div v-for="options in question.options" :key="options.id" class="my-1 flex align-items-center">
                                <div class="flex flex-column gap-2 w-full">
                                    <div class="flex gap-2">
                                        <Checkbox :value="options.id" v-model="question.model" />
                                        <label class="ml-2">{{ options.description }}</label>
                                    </div>
                                    <div class="flex w-full" v-if="options.extra_answer == '1'">
                                        <InputText type="text" v-model="question.model_extra" :placeholder="`Jika ${options.description}, berikan alasannya`" class="w-full"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-show="question.type == 'text'">
                            <InputText type="text" class="w-full my-2" v-model="question.model"/>
                        </div>
                        <div v-show="question.type == 'radio'" class="my-1">
                            <div v-for="options in question.options" :key="options.id" class="my-1">
                                <div class="flex align-items-center">
                                    <RadioButton name="pizza" :value="options.id" v-model="question.model"/>
                                    <label class="ml-2">{{ options.description }}</label>
                                </div>
                                <div class="mt-2">
                                    <InputText :placeholder="`Jika ${options.description}, berikan alasannya`" v-model="question.model_extra" v-show="options.extra_answer == '1'" class="w-full"/>
                                </div>
                            </div>
                        </div>
                        <div v-show="question.type == 'range'" class="my-2">
                            <SelectButton :options="question.options" optionLabel="description" optionValue="id" v-model="question.model"/>
                        </div>
                        <div v-show="question.type == 'dropdown'">
                            <Dropdown :options="question.options" optionLabel="description" optionValue="id" placeholder="Select a Answare" class="w-full" v-model="question.model"/>
                        </div>
                        <div v-show="question.type == 'number'">
                            <InputNumber class="w-full my-2" v-model="question.model"/>
                        </div>
                    </div>
                </div>
                <div class="card shadow-3 bg-gray-300">
                    <h6 class="text-xl"><i class="text-xl pi pi-user font-semibold mr-2"></i>{{ payload.name }}</h6>
                    <span class="text-xl"><i class="text-xl pi pi-envelope font-semibold mr-2"></i>{{ payload.email }}</span>
                </div>
                <div class="flex justify-content-between">
                    <Button label="BACK" severity="danger" icon="pi pi-arrow-left" size="small" @click="link"></Button>
                    <Button label="SUBMIT" severity="primary" size="small" :disabled="roles == 'admin' ? true : false" @click="submitForm"></Button>
                </div>
                <Divider/>
                <div class="flex-1 ">
                    <div class="w-full text-right text-lg"><strong>SURVEY - INL</strong></div>
                    <div class="w-full text-right text-lg"><strong>ICT Development</strong> &copy; 2023 - PT. Industri Nabati Lestari</div>
                </div>
            </div>
            <div class="col-12 md:col-8 sm:col-8 bg-white mt-6 border-round-md" v-show="finished == 'sukses'">
                <div class="flex justify-content-between py-6 px-4 bg-no-repeat bg-cover border-round-md shadow-2 mb-8" style="background-image: url('/layout/bg2.jpg');">
                    <div class="">
                        <div class="text-3xl md:text-3xl sm:text-lg mb-1 p-1 bg-cyan-50 border-round-md"><span class="font-bold mr-2">{{ payload.name }}</span> <span class="font-thin">({{ payload.email }})</span></div>
                        <div class="text-gray-600 text-md mt-2">By <strong>PT. Industri Nabati Lestari</strong></div>
                    </div>
                    <div class="">
                        <img src="/layout/inl.png" alt="PT. Industri Nabati Lestari" class="mr-3 w-5rem">
                        <img src="/layout/n3.png" alt="PT. Perkebunan Nusantara" class="w-5rem">
                    </div>
                </div>
                <div class="mt-8 text-center">
                    <h1 class="font-normal">Terimakasih telah mengisi data survey dari kami</h1>
                    <h5 class="font-bold mb-6">{{surveys.title}}</h5>
                    <Button label="Back to the list survey page" severity="warning" outlined size="small" @click="link"></Button>
                </div>
            </div>
            <div class="col-12 md:col-8 sm:col-8 bg-white mt-6 border-round-md" v-show="finished == 'sudah'">
                <div class="flex justify-content-between py-6 px-4 bg-no-repeat bg-cover border-round-md shadow-2 mb-8" style="background-image: url('/layout/bg2.jpg');">
                    <div class="">
                        <div class="text-3xl md:text-3xl sm:text-lg mb-1 p-1 bg-cyan-50 border-round-md"><span class="font-bold mr-2">{{ payload.name }}</span> <span class="font-thin">({{ payload.email }})</span></div>
                        <div class="text-gray-600 text-md mt-2">By <strong>PT. Industri Nabati Lestari</strong></div>
                    </div>
                    <div class="">
                        <img src="/layout/inl.png" alt="PT. Industri Nabati Lestari" class="mr-3 w-5rem">
                        <img src="/layout/n3.png" alt="PT. Perkebunan Nusantara" class="w-5rem">
                    </div>
                </div>
                <div class="mt-8 text-center">
                    <h1 class="font-normal">Pengisian form telah berakhir, <br/> terimakasih telah berpartisipasi.</h1>
                    <h5 class="font-bold text-bluegray-200 mb-6">{{surveys.title}}</h5>
                    <Button label="Back to the list survey page" severity="warning" outlined size="small" @click="link"></Button>
                </div>
            </div>
        </div>
    </div>
</template>