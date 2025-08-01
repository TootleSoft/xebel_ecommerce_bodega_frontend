<script setup lang="ts">
import Sidebar from 'primevue/sidebar';
import { usePrimeVue } from 'primevue/config';
import { ref, watch, computed, onMounted } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import axios from 'axios';
 import { useAuthStore } from '../stores/auth';

defineProps({
    simple: {
        type: Boolean,
        default: false
    }
});

const $primevue = usePrimeVue();
const authStore = useAuthStore();
const rippleActive = computed(() => $primevue.config.ripple);
const phone = ref<string>();

const { setScale, layoutConfig, layoutState, onConfigSidebarToggle } = useLayout();
const themes = ref([
    { name: 'blue', color: '#0F8BFD' },
    { name: 'green', color: '#0BD18A' },
    { name: 'magenta', color: '#EC4DBC' },
    { name: 'orange', color: '#FD9214' },
    { name: 'purple', color: '#873EFE' },
    { name: 'red', color: '#FC6161' },
    { name: 'teal', color: '#00D0DE' },
    { name: 'yellow', color: '#EEE500' }
]);

const scales = ref([12, 13, 14, 15, 16]);

watch(layoutConfig.menuMode, (newVal) => {
    if (newVal === 'static') {
        layoutState.staticMenuDesktopInactive.value = false;
    }
});

const colorScheme = ref(layoutConfig.colorScheme.value);

const changeColorScheme = (colorScheme) => {
    const themeLink = document.getElementById('theme-link');
    const themeLinkHref = themeLink.getAttribute('href');
    const currentColorScheme = 'theme-' + layoutConfig.colorScheme.value.toString();
    const newColorScheme = 'theme-' + colorScheme;
    const newHref = themeLinkHref.replace(currentColorScheme, newColorScheme);
    replaceLink(themeLink, newHref, () => {
        layoutConfig.colorScheme.value = colorScheme;
    });
};

const changeTheme = (theme) => {
    const themeLink = document.getElementById('theme-link');
    const themeHref = themeLink.getAttribute('href');
    const newHref = themeHref.replace(layoutConfig.theme.value, theme);

    replaceLink(themeLink, newHref, () => {
        layoutConfig.theme.value = theme;
    });
};

const replaceLink = (linkElement, href, onComplete) => {
    if (!linkElement || !href) {
        return;
    }

    const id = linkElement.getAttribute('id');
    const cloneLinkElement = linkElement.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();

        const element = document.getElementById(id);
        element && element.remove();

        cloneLinkElement.setAttribute('id', id);
        onComplete && onComplete();
    });
};
const decrementScale = () => {
    setScale(layoutConfig.scale.value - 1);
    applyScale();
};
const incrementScale = () => {
    setScale(layoutConfig.scale.value + 1);
    applyScale();
};

const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale.value + 'px';
};

const onRippleChange = (value) => {
    $primevue.config.ripple = value;
};

const chat = () =>{
    console.log("usuario", authStore)
    window.open("https://wa.me/" + phone.value +"?text=Hola,%20me%20gustaría%20saber%20más%20información%20sobre%20alguno%20de%20sus%20productos.", "_blank"); 
}

const getBranchPhone = async () => {
    phone.value=import.meta.env.VITE_PHONE_NUMBER;
    // if(authStore.id_usuario == undefined){
    //     let response  = await axios.get("Inventory/Ecomerce/getBranchPhone/" + 1);
    //     phone.value = response.data[0];
    //     console.log("telefono", phone.value)
    // }else{
    //     let user = await axios.get("Inventory/Ecomerce/getUserInfo/" + authStore.id_usuario);
    //     let info = user.data;
    //     let response  = await axios.get("Inventory/Ecomerce/getBranchPhone/" + info[0]);
    //     phone.value = response.data[0];
    //     console.log("telefono", phone.value)
    // }
}

onMounted(async () => {
    await refresh();
});
const refresh = async () => {
    try{
       await getBranchPhone();
    }catch {
        console.log("No se cargaron los datos")
    }
}

</script>

<template>
    <!-- <Button class="layout-config-button p-link" @click="onConfigSidebarToggle()" style="cursor: pointer">
        <i class="pi pi-cog"></i>
    </Button> -->
    <Button class="layout-config-button" @click="chat()" severity="success">
        <i class="pi pi-whatsapp"></i>
    </Button>

    <Sidebar v-model:visible="layoutState.configSidebarVisible.value" position="right" class="layout-config-sidebar w-18rem">
        <h5>Themes</h5>
        <div class="flex flex-wrap row-gap-3">
            <div v-for="(theme, i) in themes" :key="i" class="w-3">
                <Button
                    :autoFocus="layoutConfig.theme === theme.name"
                    class="cursor-pointer p-link w-2rem h-2rem border-circle flex-shrink-0 flex align-items-center justify-content-center"
                    @click="() => changeTheme(theme.name)"
                    :style="{ 'background-color': theme.color }"
                >
                    <i v-if="theme.name === layoutConfig.theme.value" class="pi pi-check text-white"></i>
                </Button>
            </div>
        </div>
        <h5>Scale</h5>
        <div class="flex align-items-center">
            <Button icon="pi pi-minus" type="button" @click="decrementScale()" class="w-2rem h-2rem mr-2" text rounded :disabled="layoutConfig.scale.value === scales[0]"></Button>
            <div class="flex gap-2 align-items-center">
                <i class="pi pi-circle-fill text-300" v-for="s in scales" :key="s" :class="{ 'text-primary-500': s === layoutConfig.scale.value }"></i>
            </div>
            <Button icon="pi pi-plus" type="button" @click="incrementScale()" class="w-2rem h-2rem ml-2" text rounded :disabled="layoutConfig.scale.value === scales[scales.length - 1]"></Button>
        </div>

        <template v-if="!simple">
            <h5>Menu Type</h5>
            <div class="flex flex-wrap row-gap-3">
                <div class="flex align-items-center gap-2 w-6">
                    <RadioButton name="menuMode" value="static" v-model="layoutConfig.menuMode.value" inputId="mode1"></RadioButton>
                    <label for="mode1">Static</label>
                </div>

                <div class="flex align-items-center gap-2 w-6 pl-2">
                    <RadioButton name="menuMode" value="overlay" v-model="layoutConfig.menuMode.value" inputId="mode2"></RadioButton>
                    <label for="mode2">Overlay</label>
                </div>
                <div class="flex align-items-center gap-2 w-6">
                    <RadioButton name="menuMode" value="slim" v-model="layoutConfig.menuMode.value" inputId="mode3"></RadioButton>
                    <label for="mode3">Slim</label>
                </div>
                <div class="flex align-items-center gap-2 w-6 pl-2">
                    <RadioButton name="menuMode" value="slim-plus" v-model="layoutConfig.menuMode.value" inputId="mode4"></RadioButton>
                    <label for="mode4">Slim+</label>
                </div>
                <div class="flex align-items-center gap-2 w-6">
                    <RadioButton name="menuMode" value="horizontal" v-model="layoutConfig.menuMode.value" inputId="mode5"></RadioButton>
                    <label for="mode5">Horizontal</label>
                </div>
                <div class="flex align-items-center gap-2 w-6 pl-2">
                    <RadioButton name="menuMode" value="reveal" v-model="layoutConfig.menuMode.value" inputId="mode6"></RadioButton>
                    <label for="mode6">Reveal</label>
                </div>
                <div class="flex align-items-center gap-2 w-6">
                    <RadioButton name="menuMode" value="drawer" v-model="layoutConfig.menuMode.value" inputId="mode7"></RadioButton>
                    <label for="mode7">Drawer</label>
                </div>
            </div>
            <h5>Color Scheme</h5>

            <div class="field-radiobutton">
                <RadioButton name="colorScheme" value="light" v-model="colorScheme" id="theme3" @change="changeColorScheme('light')"></RadioButton>
                <label for="theme3">Light</label>
            </div>
            <div class="field-radiobutton">
                <RadioButton name="colorScheme" value="dark" v-model="colorScheme" id="theme1" @change="changeColorScheme('dark')"></RadioButton>
                <label for="theme1">Dark</label>
            </div>
        </template>

        <template v-if="!simple">
            <h5>Ripple Effect</h5>
            <InputSwitch :modelValue="rippleActive" @update:modelValue="onRippleChange"></InputSwitch>
        </template>
    </Sidebar>
</template>
