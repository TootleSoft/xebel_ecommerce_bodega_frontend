
<template>
    <!-- <div class="full-width">
        <div class="p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap">
            <div class="align-items-center hidden lg:flex">
                <span class="line-height-4">
                    <i class="pi pi-box"></i>
                    Recuerda que tenemos envíos a todo México
                </span>
            </div>
        </div>
    </div> -->
    <div class="p-grid crud-demo MegaMenuBackground">
        <div class="col-12">
            <div class="grid formgrid p-fluid">
                <div class="col-12 flex justify-content-center align-items-center">
                    <img :src="'/src/images/logo/logo-bdr.svg'"
                        class="app-logo-small h-2rem flex" @click="router.push('/');"/>
                </div>
            </div>
        </div>
    </div>
    <div class="full-width">
        <div class="p-grid crud-demo">
            <div class="col-12 mega-menu-sm-background">
                <div class="grid formgrid p-fluid">
                    <Sidebar v-model:visible="visible">
                        <div class="p-grid crud-demo MegaMenuBackground">
                            <div class="col-12">
                                <div class="grid formgrid p-fluid">
                                    <div class="field col-12 flex justify-content-center align-items-center">
                                        <img :src="'/src/images/logo/logo-bdr.svg'"
                                            class="app-logo-small h-2rem flex" @click="router.push('/');"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <PanelMenu :model="items" unstyled>
                                <template #item="{item, hasSubmenu}">
                                <a v-if="item.to == '#finalcontacto'"
                                    class="flex align-items-center cursor-pointer px-3 py-2 overflow-hidden relative uppercase border-bottom-2"
                                    @click="scrollToFinalContacto()">
                                    <span class="panel-menu-text-class">{{ item.label }}</span>
                                </a>
                                <a v-else-if="item.root && item.items_type == 0"
                                    class="flex align-items-center cursor-pointer px-3 py-2 overflow-hidden relative uppercase border-bottom-2"
                                    @click="navigateToExternal(item.to)">
                                    <span class="panel-menu-text-class">{{ item.label }}</span>
                                </a>
                                <a v-else-if="item.root"
                                    class="flex align-items-center cursor-pointer px-3 py-2 overflow-hidden relative  uppercase border-bottom-2"
                                    @click="goAndClose(item.to)">
                                    <span class="panel-menu-text-class">{{ item.label }}</span>
                                </a>
                                <a v-else-if="!item.root && hasSubmenu" class="flex align-items-center p-3 cursor-pointer mb-2 gap-3" >
                                    <span class="panel-menu-text-class">{{ item.label}}</span>
                                    <i v-if="hasSubmenu" class="pi pi-angle-right ml-auto"></i>
                                </a>
                                <a v-else class="flex align-items-center p-3 cursor-pointer mb-2 gap-3"
                                    @click="goAndClose(item.to)">
                                    <span class="panel-menu-text-class">{{ item.label}}</span>
                                    <i v-if="hasSubmenu" class="pi pi-angle-right ml-auto"></i>
                                </a>
                            </template>
                        </PanelMenu>
                    </Sidebar>
                    <Button icon="pi pi-align-justify" class="col-2 custom-border-siderbar" @click="visible = true"></Button>
                    <div class="col-8">
                        <FloatLabel>
                            <AutoComplete v-model="serch" @item-select="selectSuggestion" inputId="serch" optionLabel="name"
                                :suggestions="filteredArticles" @complete="search" class="custom-border-sm h-2rem"
                                v-on:keyup.enter="router.push('/products/s/'+serch)" />
                            <label class="text-400" for="serch">
                                <i class="pi pi-search"></i> Buscar en bodegaderemate.com
                            </label>
                        </FloatLabel>
                    </div>
                    <Button v-if="authStore.id_usuario != undefined" class="col-1 label-button-user-sm" icon="pi pi-user" severity="contrast" outlined @click="tuser" />
                    <TieredMenu ref="muser" class="tiered-menu-class" id="overlay_tmenu" :model="user" popup />
                    <Button v-if="authStore.id_usuario == undefined" class="col-1 label-button-user-sm" icon="pi pi-user" severity="contrast" outlined
                        @click="tlogin" />
                    <TieredMenu ref="mlogin" class="tiered-menu-class" id="overlay_tmenu" :model="login" popup/>
                    <Button class="col-1 label-button-user-sm" @click="shoppingCart" icon="pi pi-shopping-cart"
                        severity="contrast" outlined />
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
const cartStore = useCartStore();


import { useLayout } from '../layout/composables/layout.js';
//import { useLayout } from '@/layout/composables/layout';
import axios from 'axios';
import { LoginStructure, UserStructure, ItemsStructure } from './StructureMenus/Structure';
import { useCartStore } from '../stores/cart';

// variables y constantes
const { layoutConfig } = useLayout();
const router = useRouter();
const mlogin = ref();
const muser = ref();
const serch = ref();
const article_names = ref<any[]>([]);
const filteredArticles = ref<any[]>([]);
const items = ref<any[]>([]);
const visible = ref<boolean>(false)

//funciones
const tlogin = (event) => {
    mlogin.value.toggle(event);
};
const tuser = (event) => {
    muser.value.toggle(event);
};

const goAndClose = (to) => {
    router.push(to);
    visible.value = false;
}

const shoppingCart = () => {
    if(authStore.id_usuario){
        router.push('/shoppingcart')
    }else{
        router.push('/auth/login')
    }
}

const scrollToFinalContacto = () => {
    router.push('/');
    setTimeout((): void =>{
        const finalContactoElement = document.getElementById('finalcontacto');
        if (finalContactoElement) {
            finalContactoElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, 200)
    visible.value = false;
}

const navigateToExternal = (url) => {
      window.location.href = url;
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
        let menuWithSeparators = [];
        items.value.forEach((item, index) => {
            menuWithSeparators.push(item);
            if (index < items.value.length - 1) {
                menuWithSeparators.push({ separator: true });
            }
        });
        items.value = menuWithSeparators
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
        command: () => {
            router.push('/userorders');
            setTimeout((): void =>{
                window.location.reload();
            }, 200)
        }
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
<style>
.custom-border .p-inputtext {
  border-color:  #161b61; /* Cambia #ff0000 por el color de tu preferencia */
}

.label-button-user-sm {
  font-weight: 700;
  font-size: 100%;
  color: #ffffff;
}

.mega-menu-sm-background {
  background: #08126b;
}

.custom-border-sm .p-inputtext {
  background-color: #ffffff;
}

.custom-border-siderbar{
  border: none; /* Cambia #ff0000 por el color de tu preferencia */
  background: #08126b;
}

.tiered-menu-class {
  border: none;
}

.panel-menu-text-class {
    font-weight: 800;
  font-size: 100%;
  color: #15136d;
}
</style>