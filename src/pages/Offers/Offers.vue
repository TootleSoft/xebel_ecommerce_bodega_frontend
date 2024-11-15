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
                                    <span class="text-8xl font-bold" style="font-family: 'Montbold'">
                                        {{ pagetitle.toUpperCase() }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Filtro en pantallas grandes -->
                <div class="field hidden sm:block col-2">
                    <span class="text-900 font-medium text-xs mb-4">{{ products.length }} Productos Relacionados</span>
                    <BasicFilterSelection @v-model="getfilterprices" :key="componentKey" :allcategories="priceorder" filtername="Filtro por Precios" pickone :selected="filterpriceselection"/>
                </div>

                <!-- Filtro en pantallas pequeñas (Sidebar) -->
                <div class="field block sm:hidden col-12">
                    <Sidebar v-model:visible="visible">
                        <span class="text-900 font-medium text-4xl mb-4" style="font-family: 'Montbold'">{{ pagetitle }}</span>
                        <span class="text-900 font-medium text-xs mb-4">{{ products.length }} Productos Relacionados</span>
                        <BasicFilterSelection @v-model="getfilterprices" :key="componentKey" :allcategories="priceorder" filtername="Filtro por Precios" pickone :selected="filterpriceselection"/>
                    </Sidebar>
                    <Button icon="pi pi-filter" class="filtter-menu-button border-transparent border-1 shadow-3" @click="visible = true" />
                </div>

                <!-- Contenedor de productos -->
                <div class="field col-12 sm:col-10">
                    <div class="card p-4 shadow-2 border-round mb-6">
                        <BasicOffersGrid :allproducts="products" :pagesize="40" :pagetitle="pagetitle" :key="productsKey"/>
                    </div>
                </div>
            </div>
        </div>
        <!-- Paginación -->
        <div class="field col-12 sm:col-12 md:col-12 xl:col-12">
            <Paginator v-model:first="first" :rows="10" :totalRecords="products.length/(pagesize/10)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BasicOffersGrid from '../../components/general/BasicOffertsGrid.vue';
import BasicFilterSelection from '../../components/general/BasicFilterSelection.vue';
import ProductSkeleton from '../../components/general/ProductSkeleton.vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const pagetitle = ref<string>("Ofertas");
const products = ref<any[]>([]);
const skeleton = ref<boolean>(true);
const loading = ref<boolean>(true);
const productsKey = ref<number>(0);
const allproducts = ref<any[]>([]);
const filterpriceselection = ref<number[]>([]);
const priceorder = ref<any[]>([{"id": 1, "name": "Menor a Mayor"},{"id": 2, "name": "Mayor a Menor"}]);
const componentKey = ref<number>(0);
const visible = ref<boolean>(false)

onMounted(async () => {
    await refresh();
});

const refresh = async () => {
    loading.value=true;
    try{
        let response = await axios.get('Inventory/EComerce/offers');
        products.value = response.data;
        allproducts.value = products.value;
        console.log(`ofertas`,allproducts.value)
    } catch{
        throw "No se cargaron los datos";
    } finally{
        skeleton.value=false
        loading.value = false;
    }
}

watch(filterpriceselection, (newvalue)=>{
    if(newvalue[0] == 1){
        products.value = products.value.sort((a,b) => a.price_tax - b.price_tax)
    }else if(newvalue[0] == 2){
        products.value = products.value.sort((a,b) => b.price_tax - a.price_tax)
    }
    productsKey.value = productsKey.value+1;
    componentKey.value = componentKey.value+1;
})

watch(router.currentRoute, async ()=>{
    await refresh();
})

const getfilterprices = (model) =>{
    filterpriceselection.value = model;
}
</script>

<style scoped>
/* Fondo de encabezado */
.full-width-sm-index {
    background-image: url('/public/demo/images/pages/fondo dental-01.jpg');
    background-size: cover;
    background-position: center;
    padding: 60px 20px; /* Ajuste en padding para mejor apariencia */
    color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

/* Estilo para el título */
.text-8xl {
    font-size: 3rem;
    font-family: 'Montbold', sans-serif;
    font-weight: bold;
    color: #ffffff;
}

/* Estilo general de la tarjeta */
.card {
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

/* Estilo para el filtro de precios */
.BasicFilterSelection {
    font-family: 'Montserrat', sans-serif;
}

/* Estilo para los filtros en pantalla pequeña */
.filtter-menu-button {
    background-color: #193a62;
    color: #fff;
    border-radius: 8px;
    padding: 10px;
    font-size: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Ajuste de los botones de cantidad */
.p-inputnumber {
    border-radius: 8px;
    background-color: #f1f1f1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    width: 80px;
}

.p-button {
    border-radius: 50%;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s ease;
}

.p-button:hover {
    background-color: #0056b3;
}

/* Estilos adicionales para los botones de agregar al carrito */
.add-to-cart-button {
    background-color: #28a745;
    border-radius: 8px;
    color: white;
    padding: 10px 20px;
    margin-top: 15px;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.add-to-cart-button:hover {
    background-color: #218838;
}

/* Para mejorar el espaciado entre los elementos de los productos */
.product-card {
    padding: 15px;
    margin-bottom: 20px;
}

/* Estilos del filtro de precios */
.text-xs {
    font-size: 0.875rem;
    font-family: 'Montserrat', sans-serif;
}

.text-4xl {
    font-size: 2rem;
    font-family: 'Montbold', sans-serif;
}

/* Estilo general de la columna de filtros */
.field {
    margin-bottom: 15px;
}

/* Estilo de las imágenes de los productos */
.product-image {
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
}

/* Fondo de sidebar */
.sidebar {
    background-color: #f8f9fa;
}
</style>
