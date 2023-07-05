import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
// import AppLayout2 from '@/layout/layout_sso/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            redirect:'/home',
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/views/survey/administrator/pages/Home.vue'),
                    meta:{
                        requiresAuth: true,
                    }
                },
                {
                    path: '/users',
                    name: 'users',
                    component: () => import('@/views/survey/administrator/pages/Users.vue'),
                    meta:{
                        requiresAuth: true,
                    }
                },
                {
                    path: '/categories',
                    name: 'categories',
                    component: () => import('@/views/survey/administrator/pages/Categories.vue'),
                    meta:{
                        requiresAuth: true,
                    }
                },
                {
                    path: '/questions',
                    name: 'questions',
                    component: () => import('@/views/survey/administrator/pages/Questions.vue'),
                    meta:{
                        requiresAuth: true,
                    }
                },
                {
                    path: '/survey',
                    name: 'survey',
                    component: () => import('@/views/survey/administrator/pages/Survey.vue'),
                    meta:{
                        requiresAuth: true,
                    }
                },
                {
                    path: '/edit-question/:id',
                    name: 'edit-question',
                    component: () => import('@/views/survey/administrator/pages/EditQuestion.vue'),
                    meta:{
                        requiresAuth: true,
                    }
                },
            ]
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login2.vue'),
            meta:{
                guestOnly:true,
            }
        },
        {
            path: '/verify/:id',
            name: 'verify',
            component: () => import('@/views/survey/administrator/sign/Verify.vue'),
            meta:{
                guestOnly:true,
            }
        },
        {
            path: '/form/preview/:id',
            name: 'preview',
            component: () => import('@/views/survey/administrator/pages/FormPreview.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notfound',
            component: () => import('@/views/survey/administrator/sign/NotFound.vue')
        },
    ]
});

router.beforeEach((to, from, next) => {
    const tokens = localStorage.getItem('usertoken') != null;

    if (to.matched.some((route) => route.meta.requiresAuth)) {
        if (tokens) {
            next();
        } else {
            next('/auth/login');
        }
    } else if (to.matched.some((route) => route.meta.guestOnly)) {
        if (tokens) {
            next('/home');
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router;
