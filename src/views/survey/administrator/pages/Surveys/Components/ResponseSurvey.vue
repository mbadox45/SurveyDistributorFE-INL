<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute  } from 'vue-router';

// API
import SurveyService from '@/api/SurveyService';
import { FormPreview } from '@/api/DataVariable';

const router = useRouter();
const route = useRoute();
const judul = ref(null);
const deskipsi = ref(null);
const survey_pertanyaan = ref([]);

const params = route.params.id;

const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/home' });
const breadcrumbItems = ref([{ label: 'Home', to:'/home' }, { label: 'Management', to:'#' },  { label: 'Survey', to:'/survey'},  { label: params, to:`/response-survey/${params}`}, { label: 'Response Survey', class:'font-bold', disabled:true  }]);

const listSurvey = ref([]);


onMounted(() => {
    loadSurvey()
});

const bcItems = () => {
    judul.value = 'Form Add Survey';
    deskipsi.value = 'Silahkan buat survey pertanyaan anda untuk user.';
    breadcrumbItems.value = [
        { label: 'Home', to:'/home' }, { label: 'Management', to:'#' },  { label: 'Survey', to:'/survey'},  { label: params, to:`/response-survey/${params}`}, { label: 'Response Survey', class:'font-bold', disabled:true  }
    ]
}

const loadSurvey = async () => {
    try {
        const response = await SurveyService.getAnswerSurveyByID(params)
        const load = response.data
        console.log(load);
        const survey = load.survey;
        const sp = load.survey_pertanyaans;

        judul.value = survey.title.toUpperCase();
        deskipsi.value = survey.desc;

        survey_pertanyaan.value = sp;
        console.log(sp);
    } catch (error) {
        console.log(error.response.data)
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
                <div class="grid">
                    <div class="col-6 md:col-6 sm:col-6">
                        <strong class="text-blue-800 text-2xl font-semibold">{{judul}}</strong><br/>
                        <small>{{ deskipsi }}</small>
                    </div>
                    <div class="col-6 md:col-6 sm:col-6 text-right">
                        <Button :icon="'pi pi-download'" class="mb-2" :severity="'success'" label="Export Data" outlined size="small"></Button>
                    </div>
                </div>
                <Divider type="dotted"/>
                <div class="grid">
                    <div class="col-12 md:col-12 sm:col-12">
                        <div v-for="list in survey_pertanyaan" :key="list.id">
                            <Divider align="left" type="solid">
                                <strong class="text-xl text-pink-600">{{ list.value }}</strong>
                            </Divider>
                            <div v-for="questions in list.questions" :key="questions.questionId" class="ml-5 md:ml-5 sm:ml-3 my-3">
                                <div class="grid">
                                    <div class="col-9 md:col-9 sm:col-9">
                                        <strong class="font-semibold">{{ questions.questionValue }}</strong>
                                    </div>
                                    <div class="col-3 md:col-3 sm:col-3 text-right">
                                        <div class="flex justify-content-end">
                                            <img :alt="questions.questionType" :src="questions.questionType == 'checkbox' ? '/layout/icon/checkbox.png' : questions.questionType == 'number' ? '/layout/icon/number.png' : questions.questionType == 'radio' ? '/layout/icon/radio.png' : questions.questionType == 'dropdown' ? '/layout/icon/dropdown.png' : questions.questionType == 'file' ? '/layout/icon/file.png' : questions.questionType == 'range' ? '/layout/icon/range.png' : '/layout/icon/textinput.png'" :class="`mr-2`" style="width: 18px" /><small class="text-indigo-600">{{ questions.questionType.charAt(0).toUpperCase() + questions.questionType.slice(1) }}</small>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="questions.persentasi !== null">
                                    <ul>
                                        <li v-for="answare in questions.answers" :key="answare.optionId">{{ answare.description }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>