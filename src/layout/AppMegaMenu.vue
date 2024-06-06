
<template>
        <div class="p-grid crud-demo MegaMenuBackground">
            <div class="col-12">
                <div class="grid formgrid p-fluid">
                    <div class="field col-12 sm:col-12 md:col-3 xl:col-3">
                        <img :src="'/layout/images/logo/appname-' + (layoutConfig.colorScheme.value === 'light' ? 'dark' : 'light') + '.png'" class="app-logo-small h-2rem"/>
                    </div>
                    <div class="field col-12 sm:col-12 md:col-6 xl:col-6">
                        <FloatLabel>
                            <AutoComplete v-model="serch" @item-select="selectSuggestion" inputId="serch" optionLabel="name" :suggestions="filteredArticles" @complete="search" class="text-lg" v-on:keyup.enter="router.push('/products/s/'+serch)"/>
                            <label for="serch">
                                <i class="pi pi-search"></i> Buscar
                            </label>
                        </FloatLabel>
                    </div>
                    <div class="field col-12 sm:col-12 md:col-1 xl:col-1">
                    </div>
                    <div v-if="authStore.id_usuario != undefined" class="field col-12 sm:col-12 md:col-1 xl:col-1">
                        <Button icon="pi pi-user" label="Cuenta" severity="contrast" outlined @click="tuser"/>
                        <TieredMenu ref="muser" id="overlay_tmenu" :model="user" popup />
                    </div>
                    <div v-if="authStore.id_usuario == undefined" class="field col-12 sm:col-12 md:col-1 xl:col-1">
                        <Button icon="pi pi-user" label="Ingresar" severity="contrast" outlined @click="tlogin"/>
                        <TieredMenu ref="mlogin" id="overlay_tmenu" :model="login" popup />
                    </div>
                    <div class="field col-12 sm:col-12 md:col-1 xl:col-1">
                        <Button @click="shoppingCart" icon="pi pi-shopping-cart" label="Carrito" severity="contrast" outlined/>
                    </div>
                    <!-- <div class="field col-12 sm:col-12 md:col-1 xl:col-1">
                        <Button icon="pi pi-bell" label='Alertas' severity="contrast" outlined/>
                    </div> -->
                    <div class="field col-12 sm:col-12 md:col-12 xl:col-12">
                        <Menubar :model="items" class="MegaMenuBar">
                            <template #item="{item}">
                                <a v-if="item.root" class="flex align-items-center cursor-pointer px-3 py-2 overflow-hidden relative font-semibold text-lg uppercase"  style="border-radius: 2rem" @click="router.push(item.to)">
                                    <span class="MegaMenuText">{{ item.label }}</span>
                                </a>
                                <a v-else class="flex align-items-center p-3 cursor-pointer mb-2 gap-3" @click="router.push(item.to)">
                                    <span>{{ item.label }}</span>
                                </a>
                            </template>
                        </Menubar>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();


import { useLayout } from '../layout/composables/layout.js';
//import { useLayout } from '@/layout/composables/layout';
import axios from 'axios';
import { LoginStructure, UserStructure, ItemsStructure } from './StructureMenus/Structure';

// variables y constantes
const { layoutConfig } = useLayout();
const router = useRouter();
const mlogin = ref();
const muser = ref();
const serch = ref();
const article_names = ref<any[]>([]);
const filteredArticles = ref<any[]>([]);
const items = ref<any[]>([]);


//funciones
const tlogin = (event) => {
    mlogin.value.toggle(event);
};
const tuser = (event) => {
    muser.value.toggle(event);
};

const shoppingCart = () => {
    if(authStore.id_usuario){
        router.push('/shoppingcart')
    }else{
        router.push('/auth/login')
    }
}

onMounted(async () => {
    await refresh();
});
const refresh = async () => {
    try{
        let response = await axios.get('Inventory/EComerce/articles_names', {
            headers: {
                customer_id: "0",
            }
        })
        article_names.value = response.data; 
        let menu = await axios.get('Inventory/EComerce/get_menu')
        items.value = menu.data;
    
    }catch {
        console.log("No se cargaron los datos")
    }
}

const selectSuggestion = (payload) =>{
    console.log(JSON.stringify(payload))
    serch.value = payload.value.name;
}


const search = (event) => {
    console.log(JSON.stringify(article_names.value))
    filteredArticles.value =  article_names.value.filter(x => { return (x.name || '').toLowerCase().includes((event.query || '').toLowerCase())})
}

//Arreglos para el menu
const login = ref<any[]>([
    {
        label: 'Iniciar Sesion',
        icon: 'pi pi-users',
        command: () => {
            router.push('/auth/login');
        }
    },
    {
        label: 'Crear Cuenta',
        icon: 'pi pi-user-plus',
        command: () => {
            router.push('/auth/singin');
        }
    },
]);
const user = ref<any[]>([
    {
        label: 'Mis Pedidos',
        icon: 'pi pi-inbox',
    },
    // {
    //     label: 'Lista de deseos',
    //     icon: 'pi pi-heart'
    // },
    // {
    //     label: 'Configuracion',
    //     icon: 'pi pi-cog'
    // },
    {
        label: 'Cerrar Sesion',
        icon: 'pi pi-sign-in',
        command: () => {
            authStore.logout();
            router.push('/');
            setTimeout((): void =>{
                window.location.reload();
            }, 200)
        }
    },
]);
</script>