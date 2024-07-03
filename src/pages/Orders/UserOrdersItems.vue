<template>
    <li v-if="!loading" v-for="(product, i) in cartStore.cart" :key="i"
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
                    <span v-if="!product.is_bundle || product.is_bundle == undefined"
                        class="text-700 text-sm">{{ product.barcode }}</span>
                </div>
                <div class="w-full sm:w-6 flex align-items-center justify-content-center mt-3 sm:mt-0">
                    <span class="text-900 text-xl font-medium mb-3">Cantidad: {{ product.quantity }}</span>
                </div>
            </div>
        </div>
    </li>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useCartStore } from '../../stores/cart';
import axios from 'axios';
const cartStore = useCartStore();
import { useToast } from "primevue/usetoast";
const toast = useToast();

interface Props {
    id_order?: number;
}
const props = withDefaults(defineProps<Props>(),{
    id_order: undefined,
})

const productExistence = ref<any[]>([]);
const cartproduct = ref<any[]>([]);
const branches = ref<any[]>([]);
const stock = ref<any>();
const bundles = ref<any[]>([]);
const items = ref<any[]>([]);
const array = ref<any[]>([]);
const products = ref<any[]>([]);
const loading = ref<boolean>(false);
const is_deleted = ref<boolean>(false);
const is_deletedBundle = ref<boolean>(false);


const imgroute = (id, sku, brand) => {
    sku = sku.replace(/\//g, "--").replace(/ñ/g, "nnn").replace(/Ñ/g, "nnn").replace(/#/g, '----')
    return import.meta.env.VITE_API_ROUTE + 'Inventory/Ecomerce/image/' + id + '_' + sku + '_1/' + brand;
}

const imgBundle = (id) => {
    return import.meta.env.VITE_API_ROUTE + 'Inventory/Promotions/image/' + id;
}

const refresh = async () => {
    loading.value = true
    try{
        let resposnse = await axios.get('Comercial/ECommerceOrder/OrderDetail/' + props.id_order)
        console.log(JSON.stringify(resposnse.data))
    }catch(error){
        console.log("Error en detalle del pedido: ",error)
    }finally{
        loading.value = false
    }
}


watch(cartStore.cart, () => {
    console.log(JSON.stringify(cartStore.cart))
    let is_duplicate = cartStore.updateCart(is_deleted.value, is_deletedBundle.value)
    if (is_duplicate == true) {
        toast.add({ severity: 'error', summary: 'Sucursal Duplicada', detail: 'El mismo producto ya se esta pidiendo en la sucursal seleccionada', life: 7500 });
    }
})

onMounted(async () => {
    await refresh();
});
</script>