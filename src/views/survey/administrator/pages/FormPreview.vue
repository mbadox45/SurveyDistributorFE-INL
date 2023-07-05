<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute  } from 'vue-router';

// API
import { FormPreview } from '@/api/DataVariable';

const router = useRouter();
const route = useRoute();
const time = ref(3000)

const listPertanyaan = ref(FormPreview)

const params = route.params.id;
const judul = route.query.title;
// const judul = 'Tomy Sayang Dimas';
const deskipsi = route.query.desc;

onMounted(() => {
    // loadParams()
});

</script>

<template>
    <div class="flex justify-content-center pb-4">
        <div class="md:w-6">
            <div class="grid my-3">
                <div class="col-6 md:col-6 lg:col-6">
                    <img src="/layout/inl.png" alt="PT. Industri Nabati Lestari" style="width: 80px;">
                </div>
                <div class="col-6 md:col-6 lg:col-6 text-right">
                    <img src="/layout/n3.png" alt="PT. Perkebunan Nusantara" style="width: 80px;">
                </div>
            </div>
            <div class="card shadow-8 px-3 py-5 md:px-3 lg:px-6">
                <div class="text-700">
                    <Divider align="center" type="dashed">
                        <div class="text-800 font-bold text-lg mb-1 text-center">PENGISIAN FORM SURVEY DISTRIBUTOR</div>
                        <div class="text-400 font-semibold text-md mb-1 text-center">PT. Industri Nabati Lestari</div>
                    </Divider>
                    <Divider/>
                    <div class="text-900 font-medium text-3xl lg:text-3xl sm:text-lg mb-1">{{judul.toLocaleUpperCase()}}</div>
                    <div class="text-500 text-md mb-5">{{deskipsi}}</div>
                </div>
                <div v-for="list in listPertanyaan" :key="list.id" class="my-7 bg-red-50 p-2 rounded">
                    <h4 class="text-red-500 text-2xl lg:text-2xl sm:text-md text-center p-2">{{ list.chapter.toUpperCase() }}</h4>
                    <div v-for="kategori in list.categories" :key="kategori.category_id">
                        <h4 class="bg-yellow-300 p-2">{{ kategori.category }}</h4>
                        <div v-for="survey in kategori.survey" :key="survey.id" class="my-4">
                            <p class="font-medium md:text-lg sm:text-xs text-600" style="font-family: Arial, Helvetica, sans-serif; word-wrap: break-word;">{{ survey.pertanyaan }} <span class="text-red-600 font-bold" v-show="survey.require==1">*</span> </p>
                            <div v-show="survey.type == 'text'">
                                <InputText placeholder="Jawaban: " class="w-full" />
                            </div>
                            <div v-show="survey.type == 'option'">
                                <div class="flex align-items-center my-2" v-for="jawaban in survey.jawaban" :key="jawaban.value">
                                    <RadioButton inputId="ingredient1" name="pizza" :value="jawaban.value" />
                                    <label for="ingredient1" class="ml-2">{{jawaban.desc}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Button label="SUBMIT" severity="primary" size="small"></Button>
                </div>
            </div>
        </div>
    </div>
</template>