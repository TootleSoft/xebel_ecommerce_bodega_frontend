import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const routes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/',
                name: 'home',
                meta: {
                    breadcrumb: ['E-Commerce Dashboard']
                },
                component: () => import('@/pages/Home/HomeMenu.vue')
            },
            {
                name: 'Categorias',
                path: '/products/:type/:family/:group',
                component: () => import('@/pages/Products/Products.vue')
            },
            {
                name: 'Parametro',
                path: '/products/:type/:param',
                component: () => import('@/pages/Products/Products.vue')
            },
            {
                name: 'Marcas',
                path: '/products/b/brands',
                component: () => import('@/pages/GeneralPages/Brands.vue')
            },
            {
                name: 'Producto',
                path: '/product/:id_article/:id_subarticle',
                component: () => import ('@/pages/Products/Product.vue'),
            },
            {
                name: 'Paquetes',
                path: '/bundles',
                component: () => import ('@/pages/Bundles/Bundles.vue'),
            },
            {
                name: 'Carrito',
                path: '/shoppingcart',
                component: () => import ('@/pages/Cart/ShoppingCart.vue'),
            },
            {
                name: 'Paquete',
                path: '/bundle/:id',
                component: () => import ('@/pages/Bundles/Bundle.vue')
            },
            {
                name: 'DatosPedido',
                path: '/orderdata',
                component: () => import ('@/pages/Cart/OrderData.vue')
            },
            {
                name: 'Pedidos',
                path: '/userorders',
                component: () => import ('@/pages/Orders/UserOrders.vue'),
            },
        ]
    },
    {
        path: '/auth/singin',
        name: 'register',
        component: () => import('@/pages/Auth/SingIn.vue')
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/pages/Auth/login.vue')
    },
    {
        path: '/confirmation/:order',
        name: 'confirmorder',
        component: () => import('@/pages/Cart/ConfirmOrder.vue')
    },
    {
        path: '/landing',
        name: 'landing',
        component: () => import('@/views/pages/Landing.vue')
    },
    {
        path: '/pages/notfound',
        name: 'notfound',
        component: () => import('@/views/pages/NotFound.vue')
    },
    {
        path: '/auth/access',
        name: 'accessDenied',
        component: () => import('@/views/pages/auth/AccessDenied.vue')
    },
    {
        path: '/auth/error',
        name: 'error',
        component: () => import('@/views/pages/auth/Error.vue')
    },
    {
        path: '/auth/forgotpassword',
        name: 'forgotpassword',
        component: () => import('@/views/pages/auth/ForgotPassword.vue')
    },
    {
        path: '/auth/newpassword',
        name: 'newpassword',
        component: () => import('@/views/pages/auth/NewPassword.vue')
    },
    {
        path: '/auth/verification',
        name: 'verification',
        component: () => import('@/views/pages/auth/Verification.vue')
    },
    {
        path: '/auth/lockscreen',
        name: 'lockscreen',
        component: () => import('@/views/pages/auth/LockScreen.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/views/pages/NotFound.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    }
});

export default router;
