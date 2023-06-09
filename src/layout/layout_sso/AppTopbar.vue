<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout2';
import { useRouter } from 'vue-router';

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();
const payload = JSON.parse(localStorage.getItem('payload'));

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};
const onTopBarMenuButton2 = () => {
    localStorage.removeItem('usertoken');
    localStorage.removeItem('payload');
    router.push('/auth/login')
};
// const onSettingsClick = () => {
//     topbarMenuActive.value = false;
//     router.push('/documentation');
// };
const onSettingsClick = (link) => {
    router.push(link);
};
const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
    <div class="layout-topbar bg-[#138D75]">
        <router-link to="/home" class="layout-topbar-logo sm:flex hidden">
            <!-- <img src="demo/images/avatar/inl-ori2.png" alt="logo" width="50" /> -->
            <img :src="logoUrl" alt="logo" />
            <span>Portal SSO</span>
        </router-link>

        <div class="text-gray-500">
            <span class="text-md sm:text-xl font-bold">{{payload.name}}</span>
            <span class="text-xs sm:text-sm flex">{{payload.jabatan}} - Div. {{payload.divisi}}</span>
            <!-- <span class="text-xl font-bold">{{payload.name}}</span> -->
            <!-- <img src="demo/images/avatar/inl.png" alt="logo" width="40" /> -->
            <!-- <i class="pi pi-user"></i> -->
            <!-- <span>Test</span> -->
        </div>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <div class="px-3 py-2">
                <span class="block sm:hidden font-bold text-lg">{{payload.name}}</span>
                <span class="block sm:hidden font-light text-xs">{{payload.jabatan}}</span>
            </div>
            <!-- <button class="layout-topbar-button">
            </button> -->
            <button @click="onSettingsClick('/home')" class="p-link layout-topbar-button" title="Home">
                <i class="pi pi-home"></i>
                <span>Home</span>
            </button>
            <button @click="onSettingsClick('/user-profile')" class="p-link layout-topbar-button" title="User Profile">
                <i class="pi pi-user"></i>
                <span>User Profile</span>
            </button>
            <button @click="onSettingsClick('/management-user')" class="p-link layout-topbar-button" title="Management User">
                <i class="pi pi-sitemap"></i>
                <span>Management User</span>
            </button>
            <button @click="onSettingsClick('/master-apps')" class="p-link layout-topbar-button" title="Master Apps">
                <i class="pi pi-desktop"></i>
                <span>Master Apps</span>
            </button>
            <button @click="onTopBarMenuButton2()" class="p-link layout-topbar-button" title="Sign Out">
                <i class="pi pi-sign-out"></i>
                <span>Sign Out</span>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
