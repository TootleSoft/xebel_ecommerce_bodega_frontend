
<template>
    <div class="full-width">
        <div class="p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap">
            <div class="align-items-center hidden lg:flex">
                <span class="line-height-4">
                    <i class="pi pi-box"></i>
                    Recuerda que tenemos envíos a todo México
                </span>
            </div>
        </div>
    </div>
    <div class="p-grid crud-demo MegaMenuBackground">
        <div class="col-12">
            <div class="grid formgrid p-fluid">
                <div class="field col-12 sm:col-8 md:col-2 xl:col-2 flex align-items-center justify-content-center" style="cursor: pointer;">
                    <img :src="'/src/images/logo/appname-' + (layoutConfig.colorScheme.value === 'light' ? 'dark' : 'light') + '.png'"
                        class="app-logo-small h-10rem" @click="router.push('/');"/>
                </div>
                
                    
                <div class="field col-12 sm:col-12 md:col-6 xl:col-6">
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <FloatLabel>
                        <AutoComplete
                            v-model="serch"
                            @item-select="selectSuggestion"
                            inputId="serch"
                            optionLabel="name"
                            :suggestions="filteredArticles"
                            @complete="search"
                            class="text-lg custom-border"
                            v-on:keyup.enter="router.push('/products/s/'+serch)"
                        />
                        <label class="placeholder" for="serch">
                            Buscador por productos...
                        </label>
                        <i class="pi pi-search search-icon"></i> <!-- Ícono de búsqueda -->
                    </FloatLabel>
                </div>
                <!-- <div class="field col-12 sm:col-12 md:col-1 xl:col-1">
                </div> -->
                <div v-if="authStore.id_usuario != undefined" class="field col-2">
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <Button icon="pi pi-user icon-large" label="Mi Cuenta" severity="contrast" class="label-button-user"  outlined @click="tuser" />
                    <TieredMenu ref="muser" class="tiered-menu-class" id="overlay_tmenu" :model="user" popup />
                </div>
                <div v-if="authStore.id_usuario == undefined" class="field col-2">
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <Button class="label-button-user" icon="pi pi-user icon-large" label="Ingresar" severity="contrast" outlined
                        @click="tlogin" />
                    <TieredMenu ref="mlogin" class="tiered-menu-class" id="overlay_tmenu" :model="login" popup />
                </div>
                <div class="field col-2">
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <Button class="label-button-user" @click="shoppingCart" icon="pi pi-shopping-cart icon-large"
                        :label="`Mi Carrito (${cartStore.cart.length})`" severity="contrast" outlined />
                </div>

                <!-- <div class="field col-12 sm:col-12 md:col-1 xl:col-1">
                        <Button icon="pi pi-bell" label='Alertas' severity="contrast" outlined/>
                    </div> -->
                <div class="field-nav col-12 sm:col-12 md:col-12 xl:col-12">
                    <Menubar :model="items" class="MegaMenuBar">

                        <template #item="{item}">

                            <a v-if="item.to == '#finalcontacto'" 
                                class="flex align-items-center px-3 py-2 overflow-hidden relative font-semibold text-lg uppercase"
                                @click="scrollToFinalContacto()">
                                <span class="MegaMenuText">{{ item.label }}</span>
                            </a>

                            <a v-else-if="item.root && item.items_type == 0"
                                class="flex align-items-center px-3 py-2 overflow-hidden relative font-semibold text-lg uppercase"
                                @click="navigateToExternal(item.to)">
                                <span class="MegaMenuText">{{ item.label }}</span>
                            </a>

                            <a v-else-if="item.root"
                                class="flex align-items-center px-3 py-2 overflow-hidden relative font-semibold text-lg uppercase"
                                @click="router.push(item.to)">
                                <span class="MegaMenuText">{{ item.label }}</span>
                            </a>

                            <a v-else class="flex align-items-center p-3 cursor-pointer mb-2 gap-3"
                                @click="router.push(item.to)">
                                <span class="text-submenu">{{ item.label }}</span>
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
    
    }catch {
        console.log("No se cargaron los datos")
    }
}

const selectSuggestion = (payload) =>{
    console.log(JSON.stringify(payload))
    serch.value = payload.value.name;
}

const scrollToFinalContacto = () => {
    router.push('/');
    setTimeout((): void =>{
        const finalContactoElement = document.getElementById('finalcontacto');
        if (finalContactoElement) {
            finalContactoElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, 200)
}

const search = (event) => {
    console.log(JSON.stringify(article_names.value))
    filteredArticles.value =  article_names.value.filter(x => { return (x.name || '').toLowerCase().includes((event.query || '').toLowerCase())})
}

//Arreglos para el menu
const login = ref<any[]>([
    {
        label: 'Iniciar Sesión',
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
        label: 'Cerrar Sesión',
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
<style scoped>
.MegaMenuBar a:not(.cursor-pointer) {
  background-color: white !important;
  cursor: pointer;
}
a {
    background-color: transparent !important;
}
a:hover {
    background-color: white !important;
}
a:active {
    background-color: white !important;
}
.text-submenu {
    font-weight: bold;
    padding: 0px;
}
.text-submenu:active {
    color: #0eabbd !important;
}
.text-submenu:hover {
    color: white;
}
a.flex.cursor-pointer:hover {
    color: white;
    background-color: #0eabbd !important;
    padding: 0px;
}
a.flex.cursor-pointer-nav:active {
    color: white;
    background-color: white !important;
    padding: 0px;
}

.field-nav {
    display: flex;
    justify-content: center;
    align-items: center;
}
.MegaMenuBar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1200px;
}
.MegaMenuBar .p-menubar-list {
    display: flex;
    justify-content: center;
    width: 100%;
}
.MegaMenuText {
    font-weight: 800;
}
.MegaMenuText:hover {
    color: #11BACC;
}
.placeholder {
    color: #aaaaaf;
    font-weight: bold;
    font-size: 1.3rem;
    padding-left: 10px;
}
.custom-border .p-inputtext {
    background-color: #ffffff !important;
    font-size: 1.4rem;
    padding-left: 15px;
    padding-right: 40px;
    height: 50px;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-style: italic !important;
}

.custom-border .p-inputtext:hover {
    border-color: #ccc; /* Color de borde en hover */
    background-color: #fff !important; /* Fondo blanco en hover */
}

.custom-border .p-inputtext:focus {
    border-color: #007bff;
    background-color: #fff !important;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
}
@media (max-width: 760px) {
    .custom-border .p-inputtext {
        width: 80%; /* Hace que la barra de búsqueda ocupe el 80% del contenedor */
        max-width: 350px; /* Limita el ancho máximo para que no ocupe toda la pantalla */
        margin: 0 auto; /* Centra la barra de búsqueda en la pantalla */
        font-size: 1.2rem; /* Ajusta el tamaño de la fuente para pantallas pequeñas */
        padding-left: 10px; /* Reduce el padding izquierdo para mejorar la estética */
        padding-right: 30px; /* Reduce el padding derecho */
        height: 45px; /* Ajusta la altura del input */
    }
    .field.col-12.sm\:col-12.md\:col-6.xl\:col-6 {
        text-align: center; /* Centra la barra de búsqueda dentro del contenedor */
    }
} 
.custom-border .p-float-label {
    font-size: 1rem;
    color: #666;
}

/* Agregar un fondo blanco específico cuando el campo no tiene foco */
.custom-border .p-inputtext:not(:focus) {
    background-color: #fff !important; /* Asegura que el fondo siempre sea blanco */
}
.icon-large {
    font-size: 1.5rem;
}
.search-icon {
    position: absolute;
    right: 15px; /* Ubica el ícono hacia la derecha */
    top: 50%;
    transform: translateY(-50%);
    color: #11bacc; /* Color azul del ícono */
    pointer-events: none; /* No permite hacer clic en el ícono */
    font-size: 1.4rem; /* Tamaño del ícono */
}
/* Ajusta el tamaño del label (texto de ayuda) */
.custom-border .p-float-label {
    font-size: 1rem; /* Tamaño de la etiqueta flotante */
    color: #666; /* Color del texto de la etiqueta */
}

/* Cambia el color al pasar el mouse sobre el campo de búsqueda */
.custom-border .p-inputtext:hover {
    border-color: white; /* Color más oscuro cuando el campo está en hover */
    
}

/* Cuando el campo está enfocado */
/* .custom-border .p-inputtext:focus {
    border-color: #007bff;  Color de borde cuando se hace foco 
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25); 
} */

.tiered-menu-class {
  border: none;
}


</style>