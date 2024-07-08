<template>
    <ProgressSpinner v-if="loading" class="loading-overlay"/>
    <ProductSkeleton :skeleton="skeleton"/>
    <div class="p-grid crud-demo" v-if="!skeleton">
        <div class="col-12">
            <div class="grid formgrid p-fluid">
                <div class="field hidden md:block col-12 xl:col-2">
                    <!-- Definitivamente hacerlo componente -->
                    <span class="text-900 font-medium text-4xl mb-4">{{ pagetitle }}</span>
                    <br>
                    <span class="text-900 font-medium text-xs mb-4">{{  products.length }} Productos Relacionados</span>
                    <br>
                    <br>
                    <BasicFilterSelection @v-model="getfilterprices" :key="componentKey" :allcategories="priceorder" filtername="Filtro por Precios" pickone/>
                </div>
                <div class="field col-12 sm:col-12 md:col-12 xl:col-10">
                    <div class="card">
                        <br>
                        <!-- Agregar paginator obligatorio -->
                        <BasicOffersGrid :allproducts="products" :pagesize="40" :pagetitle="pagetitle" :key="productsKey"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
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
        products.value = products.value.sort((a,b) => a.ecomerce_offer_price - b.ecomerce_offer_price)
    }else if(newvalue[0] == 2){
        products.value = products.value.sort((a,b) => b.ecomerce_offer_price - a.ecomerce_offer_price)
    }
    productsKey.value = productsKey.value+1;
})

watch(router.currentRoute, async ()=>{
    await refresh();
})

const getfilterprices = (model) =>{
    filterpriceselection.value = model;
}
</script>
    
<style>
    
</style>