<template>
    <ProgressSpinner v-if="loading" class="loading-overlay"/>
    <ProductSkeleton :skeleton="skeleton"/>
    <div class="p-grid crud-demo" v-if="!skeleton">
        <div class="col-12">
            <div class="grid formgrid p-fluid">
                <div class="field col-12 hidden md:block">
                    <div class="field w-full">
                        <div class=" full-width-sm-index">
                        <div class="p-3 flex justify-content-center align-items-center flex-wrap">
                            <div class="justify-content-center align-items-center flex">
                                <span class="w-full text-8xl">
                                    {{ pagetitle.toUpperCase() }}
                                </span>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <!-- <div class="field hidden md:block col-12 xl:col-2">
                    Definitivamente hacerlo componente
                    <span class="text-900 font-medium text-4xl mb-4">{{ pagetitle }}</span>
                    <br>
                    <span class="text-900 font-medium text-xs mb-4">{{  products.length }} Productos Relacionados</span>
                    <br>
                    <br>
                    <BasicFilterSelection @v-model="getfilterprices" :key="componentKey" :allcategories="priceorder" filtername="Filtro por Precios" pickone/>
                </div> -->
                <div class="field hidden sm:block col-2">
                    <!-- Definitivamente hacerlo componente -->
                    <br>
                    <span class="text-900 font-medium text-xs mb-4">{{ products.length }} Productos Relacionados</span>
                    <br>
                    <br>
                    <BasicFilterSelection @v-model="getfilterprices" :key="componentKey" :allcategories="priceorder" filtername="Filtro por Precios" pickone
                    :selected="filterpriceselection"/>
                </div>
                <div class="field block sm:hidden col-12">
                    <Sidebar v-model:visible="visible">
                        <span class="text-900 font-medium text-4xl mb-4">{{ pagetitle }}</span>
                        <br>
                        <span class="text-900 font-medium text-xs mb-4">{{ products.length }} Productos Relacionados</span>
                        <br>
                        <br>
                        <BasicFilterSelection @v-model="getfilterprices" :key="componentKey" :allcategories="priceorder" filtername="Filtro por Precios" pickone
                        :selected="filterpriceselection"/>
                    </Sidebar>
                    <Button icon="pi pi-filter" class="filtter-menu-button border-transparent border-1 shadow-3" @click="visible = true" />
                </div>
                <div class="field col-12 sm:col-10">
                    <div class="card">
                        <br>
                        <!-- Agregar paginator obligatorio -->
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
import {OrderData} from '../Cart/Function/OrderData';
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
const visible = ref<boolean>(false)

onMounted(async () => {
    await refresh();
});

const refresh = async () => {
    loading.value=true;
    try{
        let response = await axios.get('Inventory/EComerce/bundles');
        products.value = response.data;
        allproducts.value = products.value;
        if(cartStore.order.length == 1)
            await entity.newOrder();
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

<style>
    .full-width-sm-index {
  background-image: url('/public/demo/images/pages/fondo dental-01.jpg');
  background-size: cover;
  background-position: center;
  padding: 50px 20px; /* Reducir padding en pantallas pequeñas */
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column; /* Cambiar a columna para centrar verticalmente en pantallas pequeñas */
  align-items: center; /* Center horizontally */
  text-align: center; /* Center text within each column */
    }
</style>
