<template>
    <li v-if="!loading" v-for="(product, i) in products" :key="i"
        class="flex flex-column md:flex-row border-top-1 border-bottom-1 surface-border md:align-items-center pl-4 pr-2 py-4">
        <!-- Imagen del producto --> 
        <img v-if="!product.is_bundle || product.is_bundle == undefined"
            :src="imgroute(product.id_article, product.barcode, product.id_brand)"
            class="w-12rem h-12rem flex-shrink-0 mx-auto md:mx-0 rounded-md shadow-md" alt="shopping-cart-2-1" />

        <!-- Contenido del producto -->
        <div class="flex-auto md:pl-5 mt-4 md:mt-0">
            <div class="flex flex-wrap align-items-start sm:align-items-center sm:flex-row sm:justify-content-between surface-border pb-6 pl-4">
                <div class="w-full sm:w-6 flex flex-column">
                    <span class="text-900 text-xl font-medium mb-3" style="font-family: 'Montsemibold'">{{ product.name }}</span>
                    <span class="text-900 text-md font-medium mb-3" style="font-family: 'Montserrat'">{{ product.key_name }}</span>
                    <span class="text-700 text-sm" style="font-family: 'Montserrat'">{{ product.barcode }}</span>
                </div>
                <div class="w-full sm:w-6 flex align-items-center justify-content-center mt-3 sm:mt-0">
                    <span class="text-900 text-xl font-medium mb-3" style="font-family: 'Montsemibold'">Cantidad: {{ product.quantity }}</span>
                </div>
            </div>
        </div>
    </li>

    <!-- Botón de "Ver más" / "Ver menos" --> 
    <div v-if="allproducts.length > 3" class="flex align-items-center justify-content-center mt-4">
        <br>
        <Button v-if="!ViewMoreLess && allproducts.length > 3" label="Ver Más" link @click="viewmore" class="p-button-outlined p-button-rounded p-button-text text-700 hover:text-900" />
        <Button v-if="ViewMoreLess" label="Ver Menos" link @click="viewless" class="p-button-outlined p-button-rounded p-button-text text-700 hover:text-900" />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import {OrderData} from '../Cart/Function/OrderData';
import { useCartStore } from '../../stores/cart';

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
const entity = new OrderData();
const cartStore = useCartStore();



const imgroute = (id, sku, brand) => {
    sku = sku.replace(/\//g, "--").replace(/ñ/g, "nnn").replace(/Ñ/g, "nnn").replace(/#/g, '----')
    return import.meta.env.VITE_API_ROUTE + 'Inventory/Ecomerce/image/' + id + '_' + sku + '_1/' + brand;
}

const refresh = async () => {
    loading.value = true
    try{
        if(cartStore.order.length == 1)
            await entity.newOrder();
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
    console.log('Mounted')
    products.value.forEach((product, i) => {
        console.log(`Product ${i}: ${product.name}`, {
            name: product.name,
            is_bundle: product.is_bundle,
            barcode: product.barcode,
            imgURL: imgroute(product.id, product.barcode, product.id_brand),
        });
    });
});

watch(products, (newProducts) => {
    newProducts.forEach((product, i) => {
        console.log('watch');
        console.log(`Producto #${i}:`, {
            name: product.name,
            is_bundle: product.is_bundle,
            barcode: product.barcode,
            imgURL: imgroute(product.id, product.barcode, product.id_brand),
        });
    });
});

</script>
<style scoped>
/* Estilos adicionales para mejorar la presentación */
li {
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

li:hover {
    background-color: #f5f5f5;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

img {
    transition: transform 0.3s ease;
}

img:hover {
    transform: scale(1.05);
}

.text-900 {
    color: #333333;
}

.text-700 {
    color: #555555;
}

.text-md {
    font-size: 1rem;
}

.text-xl {
    font-size: 1.25rem;
}

.text-sm {
    font-size: 0.875rem;
}

.flex {
    display: flex;
}

.align-items-center {
    align-items: center;
}

.justify-content-center {
    justify-content: center;
}

.pl-2, .pr-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.md\\:pl-5 {
    padding-left: 1.25rem;
}

.mb-3 {
    margin-bottom: 1rem;
}

.mt-3 {
    margin-top: 1rem;
}

.mt-4 {
    margin-top: 1.5rem;
}

.pb-6 {
    padding-bottom: 1.5rem;
}

.w-full {
    width: 100%;
}

.sm\\:w-6 {
    width: 50%;
}

.rounded-md {
    border-radius: 0.375rem;
}

.shadow-md {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.p-button-outlined {
    border: 1px solid #007bff;
}

.p-button-rounded {
    border-radius: 50px;
}

.p-button-text {
    color: #007bff;
}

.p-button-outlined:hover, .p-button-text:hover {
    color: #0056b3;
    border-color: #0056b3;
}
</style>