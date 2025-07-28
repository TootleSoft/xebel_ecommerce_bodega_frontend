<template>
    <ProgressSpinner v-if="loading" class="loading-overlay"/>
    <ProductSkeleton :skeleton="skeleton"/>
    <div class="p-grid crud-demo" v-if="!skeleton">
        <div class="col-12">
            <div class="grid formgrid p-fluid">
                <!-- Título en pantallas grandes -->
                <div class="field col-12 hidden md:block">
                    <div class="field w-full">
                        <div class="full-width-sm-index">
                            <div class="p-3 flex justify-content-center align-items-center flex-wrap">
                                <div class="justify-content-center align-items-center flex">
                                    <span class="text-8xl" style="font-family: 'MontExtraBold'">
                                        {{ pagetitle.toUpperCase() }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Filtro en pantallas grandes -->
                <div class="field hidden sm:block col-2" style="font-family: 'Montbold' !important;">
                    <span class="text-900 text-blue-900 font-medium text-xs mb-4">{{ products.length }}  Productos Relacionados</span>
                    <BasicFilterSelection @v-model="getfilterprices" :key="componentKey" :allcategories="priceorder" filtername="Filtro por Precios" pickone :selected="filterpriceselection"/>
                </div>

                <!-- Filtro en pantallas pequeñas (Sidebar) -->
                <div class="field block sm:hidden col-12" style="font-family: 'Montbold' !important;">
                    <Sidebar v-model:visible="visible">
                        <span class="text-900 text-blue-900 font-medium text-4xl mb-4" style="font-family: 'Montbold'">{{ pagetitle }}</span>
                        <span class="text-900 text-blue-900 font-medium text-xs mb-4">{{ products.length }} Productos Relacionados</span>
                        <BasicFilterSelection @v-model="getfilterprices" :key="componentKey" :allcategories="priceorder" filtername="Filtro por Precios" pickone :selected="filterpriceselection"/>
                    </Sidebar>
                    <Button icon="pi pi-filter" class="filtter-menu-button border-transparent border-1 shadow-3" @click="visible = true" />
                </div>

                <!-- Contenedor de productos -->
                <div class="field col-12 sm:col-10">
                    <div class="card p-4 shadow-2 border-round mb-6">
                        <BasicBundleGrid :allproducts="products" :pagesize="40" :pagetitle="pagetitle" :key="productsKey"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { OrderData } from '../Cart/Function/OrderData';
import { useCartStore } from '../../stores/cart';
import BasicFilterSelection from '../../components/general/BasicFilterSelection.vue';
import ProductSkeleton from '../../components/general/ProductSkeleton.vue';
import BasicBundleGrid from '../../components/general/BasicBundleGrid.vue';
import axios from 'axios';

const pagetitle = ref<string>("Paquetes");
const loading = ref<boolean>(true);
const skeleton = ref<boolean>(true);
const products = ref<any[]>([]);
const productsKey = ref<number>(0);
const filterpriceselection = ref<number[]>([]);
const priceorder = ref<any[]>([{"id": 1, "name": "Menor a Mayor"},{"id": 2, "name": "Mayor a Menor"}]);
const componentKey = ref<number>(0);
const allproducts = ref<any[]>([]);
const route = useRoute();
const router = useRouter();
const entity = new OrderData();
const cartStore = useCartStore();
const visible = ref<boolean>(false);

onMounted(async () => {
    await refresh();
});

const refresh = async () => {
    loading.value = true;
    try {
        let response = await axios.get('Inventory/EComerce/bundles');
        products.value = response.data;
        allproducts.value = products.value;
        if (cartStore.order.length == 1) await entity.newOrder();
    } catch {
        throw "No se cargaron los datos";
    } finally {
        skeleton.value = false;
        loading.value = false;
    }
}

watch(filterpriceselection, (newvalue) => {
    if (newvalue[0] == 1) {
        products.value = products.value.sort((a, b) => a.price_tax - b.price_tax);
    } else if (newvalue[0] == 2) {
        products.value = products.value.sort((a, b) => b.price_tax - a.price_tax);
    }
    productsKey.value = productsKey.value + 1;
    componentKey.value = componentKey.value + 1;
})

watch(router.currentRoute, async () => {
    await refresh();
})

const getfilterprices = (model) => {
    filterpriceselection.value = model;
}
</script>

<style>
/* Fondo para la sección de título */
.full-width-sm-index {
    background-image: url('/public/demo/images/pages/fondo dental-01.jpg');
    background-size: cover;
    background-position: center;
    padding: 80px 20px; /* Se ajusta el padding */
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

/* Estilos para títulos */
.text-8xl {
    font-size: 3rem; /* Tamaño de fuente más grande para el título */
    font-family: 'Montbold', sans-serif;
    font-weight: bold;
}

/* Estilo para los productos */
.card {
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Estilo para el filtro */
.filtter-menu-button {
    background-color: #193a62;
    color: #fff;
    border-radius: 8px;
    padding: 10px;
    font-size: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Estilo de texto de precios */
.text-900 {
    color: #333;
}

.text-xs {
    font-size: 0.75rem;
    font-family: 'Montserrat', sans-serif;
}

.text-4xl {
    font-size: 2rem;
    font-family: 'Montbold', sans-serif;
    font-weight: bold;
}

.text-900 {
    font-family: 'Montserrat', sans-serif;
}

/* Fondo de sidebar */
.sidebar {
    background-color: #f8f9fa;
}

/* Estilo para los filtros */
.field {
    margin-bottom: 20px;
}

/* Estilo del botón del filtro en pantallas pequeñas */
@media (max-width: 768px) {
    .filtter-menu-button {
        width: 100%;
        margin-top: 20px;
    }
}

/* Para el filtro de precios */
.BasicFilterSelection {
    font-family: 'Montserrat', sans-serif;
}
</style>
