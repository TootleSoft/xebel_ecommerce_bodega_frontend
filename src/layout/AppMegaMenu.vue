<template>
    <!-- Header principal -->
    <div class="header-wrapper">
        <div v-if="isSearchFocused" class="search-overlay" @click="isSearchFocused = false"></div>
      <!-- Logo -->
      <div class="header-logo" @click="router.push('/')">
        <img :src="'/src/images/logo/logo-test.png'" alt="Logo" />
      </div>
  
      <!-- Buscador -->
      <div class="header-search">
        <FloatLabel>
          <AutoComplete
            v-model="serch"
            @item-select="selectSuggestion"
            @complete="search"
            class="text-lg custom-border"
            v-on:keyup.enter="router.push('/products/s/'+serch)"
            inputId="serch"
            optionLabel="name"
            :suggestions="filteredArticles"
            @focus="isSearchFocused = true"
            @blur="isSearchFocused = false"
          />
          <label class="placeholder" for="serch">Buscar en Bodega de Remate</label>
          <i class="pi pi-search search-icon"></i>
        </FloatLabel>
      </div>
  
      <!-- Usuario y Carrito -->
      <div class="header-actions">
        <div v-if="authStore.id_usuario" class="user-section">
          <Button icon="pi pi-user icon-large" :label="userName" outlined @click="tuser" class="label-button-user" />
          <TieredMenu ref="muser" :model="user" popup class="tiered-menu-class" />
        </div>
        <div v-else class="user-section">
          <Button icon="pi pi-user icon-large" label="Ingresar" outlined @click="tlogin" class="label-button-user" />
          <TieredMenu ref="mlogin" :model="login" popup class="tiered-menu-class" />
        </div>
  
        <div class="cart-button-wrapper" @click="shoppingCart">
            <Button
                icon="pi pi-shopping-cart icon-large"
                label="Carrito"
                outlined
                class="label-button-user"
            />
            <span v-if="totalItemsInCart > 0" class="cart-badge">{{ totalItemsInCart }}</span>
        </div>
      </div>
    </div>
  
    <!-- Barra de navegación -->
    <div class="field-nav">
      <Menubar :model="items" class="MegaMenuBar">
        <template #item="{ item }">
          <a v-if="item.to == '#finalcontacto'" @click="scrollToFinalContacto()" class="menu-link">
            {{ item.label }}
          </a>
          <a v-else-if="item.root && item.items_type == 0" @click="navigateToExternal(item.to)" class="menu-link">
            {{ item.label }}
          </a>
          <a v-else-if="item.root" @click="router.push(item.to)" class="menu-link">
            {{ item.label }}
          </a>
          <a v-else @click="router.push(item.to)" class="submenu-link">
            {{ item.label }}
          </a>
        </template>
      </Menubar>
    </div>
  </template>
  

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
const cartStore = useCartStore();


import { useLayout } from '../layout/composables/layout.js';
//import { useLayout } from '@/layout/composables/layout';
import axios from 'axios';
import { LoginStructure, UserStructure, ItemsStructure } from './StructureMenus/Structure';
import { useCartStore } from '../stores/cart';

//computed 
const totalItemsInCart = computed(() => {
    return cartStore.cart.reduce((total, item) => total + (item.quantity || 1), 0);
});


// variables y constantes
const { layoutConfig } = useLayout();
const router = useRouter();
const mlogin = ref();
const muser = ref();
const serch = ref();
const article_names = ref<any[]>([]);
const filteredArticles = ref<any[]>([]);
const items = ref<any[]>([]);
const userName = ref('');
userName.value = '¡Hola, ' + capitalizeFullName(authStore.usuario) + '!';
const isSearchFocused = ref(false);

//funciones
function capitalizeFullName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .split(' ')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}


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
    //console.log(JSON.stringify(payload))
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
    //console.log(JSON.stringify(article_names.value))
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
            router.push('/UserOrders');
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
<style>
/* ---------- ESTRUCTURA GENERAL ---------- */
.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 1rem;
  padding: 1rem 2rem;
  background-color: rgb(6, 6, 6);
}

.header-logo {
  flex: 0 0 auto;
  height: 50px;
  width: auto;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.header-logo img {
  width: 10rem;
  cursor: pointer;
}
.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); /* tono oscuro */
  z-index: 99; /* debajo del buscador pero encima del resto */
}
.header-search {
  position: relative;
  z-index: 100;
  flex: 1 1 auto;
  max-width: 700px;
  min-width: 200px;
  margin: 0 1rem;
  background-color: #f0f0f0;
  border-radius: 6px;
}

/* Campo de búsqueda */
.custom-border {
  width: 100%;
}
.custom-border .p-inputtext {
  width: 100%;
  padding-right: 2.5rem; /* espacio para la lupa */
}

/* Puedes añadir borde iluminado al input cuando está enfocado */
.custom-border .p-inputtext:focus {
  border-color: #fc7a2f !important;
  box-shadow: 0 0 10px rgba(241, 166, 14, 0.879);
  background-color: #f0f0f0;
}
.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #11bacc;
  font-size: 1.4rem;
  pointer-events: none;
  z-index: 1;
}

/* ---------- ACCIONES (USUARIO Y CARRITO) ---------- */
.header-actions {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 0.90rem;
  white-space: nowrap;
}

.user-name {
  font-size: 1rem;
  font-family: 'Montsemibold';
  text-align: center;
  margin-top: 0.2rem;
}

/* ---------- CARRITO ---------- */
.cart-button-wrapper {
  position: relative;
  display: inline-block;
}

.cart-badge {
  position: absolute;
  left: 84px;
  bottom: 25px;  
  background-color: red;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 3px 7px;
  border-radius: 50%;
  line-height: 1;
  z-index: 1;
  pointer-events: none;
}

/* ---------- MENÚ PRINCIPAL ---------- */
.field-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0rem 0;
  background-color: #fed39a;
}

.menu-link {
  font-family: 'Montbold';
  font-size: 1rem;
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  display: inline-block;
}

.submenu-link {
  font-family: 'Montserrat';
  font-size: 0.9rem;
  padding: 0.3rem 0.8rem;
}

/* ---------- RESPONSIVE ---------- */
@media (max-width: 768px) {
  .header-wrapper {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.2rem;
  }

  .header-search {
    position: relative;
    z-index: 100;
    width: 100%;
    max-width: 90%;
    margin: 0;
  }

  .header-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .field-nav {
    flex-direction: column;
    padding: 0.5rem;
  }
}


</style>