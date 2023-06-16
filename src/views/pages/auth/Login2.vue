<script setup>
// Vue Component
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

// HTML Components
import AppConfig from '@/layout/AppConfig.vue';

// API
import AuthService from '@/api/AuthService';

const toast = useToast();
const router = useRouter();
const { layoutConfig } = useLayout();
const email = ref(null);
const password = ref(null);
const checked = ref(false);
const isLoading = ref(false);

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const onSubmit = (e) => {
    e.preventDefault();
    if (email.value && password.value) {
        const post = {
            email: email.value,
            password: password.value,
        }
        isLoading.value = true
        try {
            AuthService.postSignIn(post).then(res => {
                const load = res.data;
                if (load.code == 200) {
                    const token = load.token;
                    const payload = load.payload;
                    localStorage.setItem('usertoken', token);
                    localStorage.setItem('payload', JSON.stringify(payload));
                    router.push('/home');
                } else {
                    console.log(load.message);
                }
            })
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false
        }
    } else {
        toast.add({ severity: 'warn', summary: 'Attention', detail: 'Please complete the data', life: 3000 });
    }
};
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <Toast position="top-center"/>
        <div class="flex flex-column align-items-center justify-content-center">
            <img src="/layout/inl.png" alt="PT.INL" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <!-- <img src="/layout/inl-ori2.png" alt="Image" height="70" class="mb-3" /> -->
                        <div class="text-900 text-3xl font-medium mb-3">Portal SSO</div>
                        <span class="text-600 font-medium">PT. Industri Nabati Lestari</span>
                    </div>

                    <form @submit="onSubmit">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="email" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" autocomplete="off" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <!-- <InputText id="email1" type="password" placeholder="Email address" :toggleMask="true" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" /> -->
                        <Password id="password1" v-model="password" placeholder="Password" :feedback="false" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <!-- <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label> -->
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <label v-if="isLoading == true" class="block text-900 text-xl font-medium mb-2">Loading ...</label>
                        <Button label="Sign In" class="w-full p-3 text-xl" type="submit"></Button>
                        <!-- <Button label="Sign In" class="w-full p-3 text-xl" @click="onSubmit"></Button> -->
                    </form>
                    <!-- <div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    <!-- <AppConfig simple /> -->
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
