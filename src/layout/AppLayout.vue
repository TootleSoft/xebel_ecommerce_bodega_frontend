<script setup>
import { computed, watch, ref, onBeforeUnmount, onMounted } from 'vue';
import { usePrimeVue } from 'primevue/config';
import AppTopbar from './AppTopbar.vue';
import AppConfig from './AppConfig.vue';
import AppProfileMenu from './AppProfileMenu.vue';
import AppBreadCrumb from './AppBreadcrumb.vue';
import { useLayout } from '@/layout/composables/layout';
import AppMegaMenu from './AppMegaMenu.vue';
import AppMegaMenuSm from './AppMegaMenuSm.vue';
import Footer from '../components/general/Footer.vue';
// import { useRouter } from 'vue-router';
// import {OrderData} from '../pages/Cart/Function/OrderData';

// const router = useRouter();
// const entity = new OrderData();

const $primevue = usePrimeVue();
const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref(null);
const topbarRef = ref(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

// onMounted(()=>{
//     console.log("inicio");
//     entity.newOrder();
// });

// watch(router.currentRoute, async ()=>{
//     console.log("cambio de ruta");
//     await entity.newOrder();
// });

const containerClass = computed(() => {
    return [
        {
            'layout-light': layoutConfig.colorScheme.value === 'light',
            'layout-dark': layoutConfig.colorScheme.value === 'dark',
            'layout-overlay': layoutConfig.menuMode.value === 'overlay',
            'layout-static': layoutConfig.menuMode.value === 'static',
            'layout-slim': layoutConfig.menuMode.value === 'slim',
            'layout-slim-plus': layoutConfig.menuMode.value === 'slim-plus',
            'layout-horizontal': layoutConfig.menuMode.value === 'horizontal',
            'layout-reveal': layoutConfig.menuMode.value === 'reveal',
            'layout-drawer': layoutConfig.menuMode.value === 'drawer',
            'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
            'layout-overlay-active': layoutState.overlayMenuActive.value,
            'layout-mobile-active': layoutState.staticMenuMobileActive.value,
            'p-ripple-disabled': $primevue.config.ripple === false,
            'layout-sidebar-active': layoutState.sidebarActive.value,
            'layout-sidebar-anchored': layoutState.anchored.value
        }
    ];
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive.value = false;
                layoutState.overlaySubmenuActive.value = false;
                layoutState.staticMenuMobileActive.value = false;
                layoutState.menuHoverActive.value = false;
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
    if (!topbarRef.value) return;

    const sidebarEl = topbarRef?.value.$el.querySelector('.layout-sidebar');
    const topbarEl = topbarRef?.value.$el.querySelector('.topbar-start > button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>
<template>
    <div class="layout-container" :class="containerClass">
        <!-- Menús y encabezados -->
        <div class="layout-content-wrapper flex-grow">
            <!-- Menús responsivos -->
            <div class="hidden sm:block">
                <AppMegaMenu></AppMegaMenu>
            </div>
            <div class="block sm:hidden">
                <AppMegaMenuSm></AppMegaMenuSm>
            </div>
            <!-- <AppTopbar ref="topbarRef" /> -->
<!-- 
            <div class="content-breadcrumb">
                <AppBreadCrumb />
            </div> -->
            <!-- Contenido principal -->
                <router-view></router-view>
                <!-- Footer fijo al fondo -->
                 <Footer></Footer>
        </div>

        <AppProfileMenu />
        <AppConfig />
        <Toast></Toast>
    </div>
</template>

<style lang="scss">
</style>
