<template>
    <!-- <ProgressSpinner v-if="loading" class="loading-overlay"/> -->
    <div v-if="loading" class="layout-preloader-container">
        <img src="/src/assets/demo/resources/webcontent/images/loader.gif" alt="Loading..."
            class="layout-preloader-gif">
    </div>
    <ProductSkeleton :skeleton="skeleton" />
    <div class="p-grid crud-demo" v-if="!skeleton">
        <div class="col-12">
            <div class="grid formgrid p-fluid">
                <div v-if="is_search!=true" class="field col-12 hidden md:block">
                    <div class="field w-full">
                        <div class=" full-width-sm-index">
                        <div class="p-3 flex justify-content-center align-items-center flex-wrap">
                            <div class="justify-content-center align-items-center flex">
                                <span class="w-full text-8xl" style="font-weight: 900; font-family: 'MontExtraBold';">
                                    {{ pagetitle }}
                                </span>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="field hidden sm:block col-2">
                    <!-- Definitivamente hacerlo componente -->
                    <span v-if="is_search==true" class="text-900 font-medium text-4xl mb-4" style="font-family: 'MontExtraBold';">{{ pagetitle }}</span>
                        <br>
                    <span class="text-900 text-blue-900 font-medium text-md mb-2" 
                    style="font-family: 'Montbold';
                    "
                    >{{ products.length }} Productos Relacionados</span>
                        
                    <BasicFilterSelection @v-model="getcategories" :key="componentKey" :allcategories="subgroups"
                        filtername="Filtro por Grupos" :selected="categoryselection"/>
                    <BasicFilterSelection @v-model="getfilterprices" :key="componentKey" :allcategories="priceorder"
                        filtername="Filtro por Precios" pickone :selected="filterpriceselection"/>
                </div>
                <div class="field block sm:hidden col-12">
                    <Sidebar v-model:visible="visible">
                        <span class="text-900 font-medium text-4xl mb-4" style="font-family: 'MontExtraBold';">{{ pagetitle }}</span>
                        <br>
                        <span class="text-900 font-medium text-blue-900 text-xs mb-4">{{  products.length }} Productos Relacionados</span>
                        <br>
                        <br>
                        <BasicFilterSelection @v-model="getcategories" :key="componentKey" :allcategories="subgroups"
                            filtername="Filtro por Grupos" :selected="categoryselection"/>
                        <BasicFilterSelection @v-model="getfilterprices" :key="componentKey" :allcategories="priceorder"
                            filtername="Filtro por Precios" pickone :selected="filterpriceselection"/>
                    </Sidebar>
                    <Button icon="pi pi-filter" class="filtter-menu-button border-transparent border-1 shadow-3" @click="visible = true"></Button>
                </div>
                <div class="field col-12 sm:col-10">
                    <div class="card">
                        <br>
                        <!-- Agregar paginator obligatorio -->
                        <BasicProductGrid :allproducts="products" :pagesize="40" :pagetitle="pagetitle"
                            :key="productsKey"/>
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
import BasicProductGrid from '../../components/general/BasicProductGrid.vue';
import BasicFilterSelection from '../../components/general/BasicFilterSelection.vue';
import ProductSkeleton from '../../components/general/ProductSkeleton.vue'

import axios from 'axios';

interface subgrupos{
    id_subgrupo: number | undefined;
    subgrupo: string | undefined;
}

const route = useRoute();
const router = useRouter();
const entity = new OrderData();
const cartStore = useCartStore();
const customer_id = ref<string>("0");
const pagetitle = ref<string>("");
const products = ref<any[]>([]);
const allproducts = ref<any[]>([]);
const subgroups = ref<any[]>([]);
const skeleton = ref<boolean>(true);
const loading = ref<boolean>(true);
const componentKey = ref<number>(0);
const productsKey = ref<number>(0);
const categoryselection = ref<number[]>([]);
const filterpriceselection = ref<number[]>([]);
const priceorder = ref<any[]>([{"id": 1, "name": "Menor a Mayor"},{"id": 2, "name": "Mayor a Menor"}]);
const subgroup = ref<subgrupos[]>([])
const visible = ref<boolean>(false)
const is_search = ref<boolean>(false)

const refresh = async () => {
    loading.value=true;
    is_search.value=false
    try{
        categoryselection.value = [];
        if(cartStore.order.length == 1)
            await entity.newOrder();
        //La consulta maestra, trae todos los productos que se pueden mostrar en vase a los paramtros que se le mande
        let response = await axios.get('Inventory/EComerce/articles_ecomerce', {
            headers: {
                customer_id: customer_id.value,
                family: route.params.family != undefined ? route.params.family.toString().replace(/ñ/g, "nnn").replace(/Ñ/g, "nnn") : "",
                group: route.params.group != undefined ? route.params.group.toString().replace(/ñ/g, "nnn").replace(/Ñ/g, "nnn") : "",
                type: route.params.type != undefined ? route.params.type.toString().replace(/ñ/g, "nnn").replace(/Ñ/g, "nnn") : "",
                param: route.params.param != undefined ? route.params.param.toString().replace(/ñ/g, "nnn").replace(/Ñ/g, "nnn") : "",
            }
        })
        products.value = response.data; 
        allproducts.value = products.value;
        //Me trae los subgrupos de los articlos que trae la consulta
        subgroups.value = products.value.filter(x => x.id_subgrupo !== null && x.subgrupo !== null)
        .map(x => ({id: x.id_subgrupo!, name: x.subgrupo}))
        .filter((valor, indice, self) => self.findIndex(x => x.id === valor.id) === indice)
        .sort((a,b) => (a.id || 0)-(b.id||0));
        //Da el nombre de lo que se filtro/busco (ejemplo: se selecciona una marca, muestra el nombre de la marca)
        switch(route.params.type.toString()){
            case("c"):
                pagetitle.value = route.params.group.toString().replace(/--/g, " ");
                break;
            case("s"):
                pagetitle.value = route.params.param.toString().replace(/--/g, " ");
                is_search.value = true;
                console.log(is_search.value)
                break;
            case("b"):
                pagetitle.value = route.params.param.toString().replace(/--/g, " ");
                break;
        }
        //Desactiva los esqueletos de carga del sistema
        productsKey.value = productsKey.value+1;
        componentKey.value = componentKey.value+1;
    }catch {
        console.log("No se cargaron los datos")
    }finally{
        skeleton.value=false
        loading.value=false;
    }
}
const getcategories = (model) =>{
    console.log(JSON.stringify(model))
    categoryselection.value = model;
}

const getfilterprices = (model) =>{
    filterpriceselection.value = model;
}

watch(router.currentRoute, async ()=>{
    await refresh();
})

watch(categoryselection, (newvalue)=>{
    if(newvalue.length  == 0){
       products.value = allproducts.value; 
    }else{
        products.value = allproducts.value;
        products.value = products.value.filter(x => newvalue.includes(x.id_subgrupo))
    }
    productsKey.value = productsKey.value+1;
    componentKey.value = componentKey.value+1;
})

watch(filterpriceselection, (newvalue)=>{
    if(newvalue[0] == 1){
        products.value = products.value.sort((a,b) => a.price_tax - b.price_tax)
    }else if(newvalue[0] == 2){
        products.value = products.value.sort((a,b) => b.price_tax - a.price_tax)
    }
    productsKey.value = productsKey.value+1;
    componentKey.value = componentKey.value+1;
})

onMounted(async () => {
    await refresh();
});

</script>

<style>
.filtter-menu-button {
        display: block;
        position: fixed;
        width: 3rem;
        height: 3rem;
        line-height: 3rem;
        background-color: #11BACC;
        text-align: center;
        top: 25%;
        left: 0;
        padding: 0;
        margin-top: -1.5rem;
        transition: background-color var(--transition-duration);
        overflow: hidden;
        cursor: pointer;
        z-index: 999;
        box-shadow: -0.25rem 0 1rem rgba(0, 0, 0, 0.15);
        
        i {
            font-size: 2rem;
            line-height: inherit;
            transform: rotate(0deg);
            transition: transform 1s;
        }
    }
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