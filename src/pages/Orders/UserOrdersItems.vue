<template>
    <li v-if="!loading" v-for="(product, i) in products" :key="i"
        class="flex flex-column md:flex-row border-top-1 border-bottom-1 surface-border md:align-items-center pl-2 pr-2">
        <img v-if="!product.is_bundle || product.is_bundle == undefined"
            :src="imgroute(product.id, product.barcode, product.id_brand)"
            class="w-12rem h-12rem flex-shrink-0 mx-auto md:mx-0" alt="shopping-cart-2-1" />
        <div class="flex-auto  md:pl-5">
            <div
                class="flex flex-wrap align-items-start sm:align-items-center sm:flex-row sm:justify-content-between surface-border pb-6">
                <div class="w-full sm:w-6 flex flex-column">
                    <span class="text-900 text-xl font-medium mb-3">{{ product.name }}</span>
                    <span class="text-900 text-md font-medium mb-3">{{ product.key_name }}</span>
                    <span class="text-700 text-sm">{{ product.barcode }}</span>
                </div>
                <div class="w-full sm:w-6 flex align-items-center justify-content-center mt-3 sm:mt-0">
                    <span class="text-900 text-xl font-medium mb-3">Cantidad: {{ product.quantity }}</span>
                </div>
            </div>
        </div>
    </li>
        <div v-if="allproducts.length > 3" class="flex align-items-center justify-content-center">
            <br>
            <br>
            <Button v-if="!ViewMoreLess && allproducts.length > 3" label=" Ver Mas" link @click="viewmore"/>
            <Button v-if="ViewMoreLess" label=" Ver Menos" link @click="viewless"/>
        </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Props {
    id_order?: number;
}
const props = withDefaults(defineProps<Props>(),{
    id_order: undefined,
})


const allproducts = ref<any[]>([]);
const products = ref<any[]>([]);
const loading = ref<boolean>(false);
const ViewMoreLess = ref<boolean>(false);


const imgroute = (id, sku, brand) => {
    sku = sku.replace(/\//g, "--").replace(/ñ/g, "nnn").replace(/Ñ/g, "nnn").replace(/#/g, '----')
    return import.meta.env.VITE_API_ROUTE + 'Inventory/Ecomerce/image/' + id + '_' + sku + '_1/' + brand;
}

const refresh = async () => {
    loading.value = true
    try{
        let response = await axios.get('Comercial/ECommerceOrder/OrderDetail/' + props.id_order)
        allproducts.value = response.data;
        products.value = response.data;
        console.log(products.value.length > 3)
        if(products.value.length > 3){
            console.log(JSON.stringify(products.value.slice(0,2)))
            products.value = allproducts.value.slice(0, 3);
        }
    }catch(error){
        console.log("Error en detalle del pedido: ",error)
    }finally{
        loading.value = false
    }
}

const viewmore = () => {
    products.value = allproducts.value;
    ViewMoreLess.value = true;
}
const viewless = () => {
    products.value = allproducts.value.slice(0, 3);
    ViewMoreLess.value = false;
}

onMounted(async () => {
    await refresh();
});
</script>