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
                    <BasicFilterSelection @v-model="getcategories" :key="componentKey" :allcategories="subgroups" filtername="Filtro por Grupos"/>
                    <BasicFilterSelection @v-model="getfilterprices" :key="componentKey" :allcategories="priceorder" filtername="Filtro por Precios" pickone/>
                </div>
                <div class="field col-12 sm:col-12 md:col-12 xl:col-10">
                    <div class="card">
                        <br>
                        <!-- Agregar paginator obligatorio -->
                        <BasicProductGrid :allproducts="products" :pagesize="40" :pagetitle="pagetitle" :key="productsKey"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import BasicProductGrid from '../../components/general/BasicProductGrid.vue';
import BasicFilterSelection from '../../components/general/BasicFilterSelection.vue';
import ProductSkeleton from '../../components/general/ProductSkeleton.vue'

import axios from 'axios';

interface subgrupos{
    id_subgrupo: number | null;
    subgrupo: string | null;
}

const route = useRoute();
const router = useRouter();
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

const refresh = async () => {
    loading.value=true;
    try{
        categoryselection.value = [];

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
})

watch(filterpriceselection, (newvalue)=>{
    if(newvalue[0] == 1){
        products.value = products.value.sort((a,b) => a.price_tax - b.price_tax)
    }else if(newvalue[0] == 2){
        products.value = products.value.sort((a,b) => b.price_tax - a.price_tax)
    }
    productsKey.value = productsKey.value+1;
})

onMounted(async () => {
    await refresh();
});

</script>