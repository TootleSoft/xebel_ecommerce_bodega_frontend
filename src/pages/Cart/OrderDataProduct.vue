<template>
    <li v-if="!loading" v-for="(product, i) in cartStore.cart" :key="i"
        class="flex flex-column md:flex-row py-6 border-top-1 border-bottom-1 surface-border md:align-items-center">
        <img v-if="!product.is_bundle || product.is_bundle == undefined"
            :src="imgroute(product.id, product.barcode, product.id_brand)"
            class="w-12rem h-12rem flex-shrink-0 mx-auto md:mx-0" alt="shopping-cart-2-1" />
        <img v-if="product.is_bundle" :src="imgBundle(product.id)" class="w-12rem h-12rem flex-shrink-0 mx-auto md:mx-0"
            alt="shopping-cart-2-1" />
            <div class="flex-auto py-5 md:pl-5">
            <div
                class="flex flex-wrap align-items-start sm:align-items-center sm:flex-row sm:justify-content-between surface-border pb-6">
                <div class="w-full sm:w-6 flex flex-column">
                    <span class="text-900 text-xl font-medium mb-3">{{ product.name }}</span>
                    <span class="text-900 text-md font-medium mb-3">{{ product.key_name }}</span>
                    <span v-if="!product.is_bundle || product.is_bundle == undefined"
                        class="text-700 text-sm">{{ product.barcode }}</span>
                    <div  class="grid">
                        <div class="col-12 lg:col-1">
                            <ul v-if="product.is_bundle" class="py-0 pl-3 m-0 text-600 mb-3">
                                <li class="mb-2" v-for="(item, j) in products[product.id_numberBundle-1]" :key="j">{{ products[product.id_numberBundle-1][j].quantity }}</li>
                            </ul>
                        </div>
                        <div class="col-12 lg:col-1">
                            <ul v-if="product.is_bundle" class="py-0 pl-3 m-0 text-600 mb-3">
                                <li class="mb-2" v-for="(item, j) in products[product.id_numberBundle-1]" :key="j">{{ products[product.id_numberBundle-1][j].barcode }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="w-full sm:w-6 flex align-items-start justify-content-between mt-3 sm:mt-0">
                    <!-- <div>
                        &nbsp
                        <Dropdown :options="quantityOptions" v-model="selectedQuantity" optionLabel="label"></Dropdown>
                        <InputNumber showButtons buttonLayout="horizontal" :min="1"
                            inputClass="w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                            v-model="product.quantity" class="border-1 surface-border border-round"
                            decrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                            incrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                            incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"></InputNumber>
                    </div> -->
                    <div class="flex flex-column sm:align-items-end">
                        <span v-if="!product.original_price" class="text-900 text-xl font-medium mb-2 sm:mb-3"><label
                                class="text-900 font-bold">P.U. + IVA</label>&nbsp&nbsp&nbsp${{ product.price_tax.toFixed(2) }}</span>
                        <span v-if="product.original_price"
                            class="text-900 text-xl font-medium mb-2 sm:mb-3 line-through"><label
                                class="text-900 font-bold">P.U. + IVA</label>&nbsp&nbsp&nbsp${{ product.original_price.toFixed(2) }}</span>
                        <span v-if="product.original_price"
                            class="text-900 text-xl font-medium mb-2 sm:mb-3 text-red-500"><label
                                class="text-red-500 text-900 font-bold">P.U. + IVA</label>&nbsp&nbsp&nbsp${{ product.price_tax.toFixed(2) }}</span>
                        <span class="text-900 text-xl font-medium mb-2 sm:mb-3"><label
                                class="text-900 font-bold">TOTAL</label>&nbsp&nbsp&nbsp${{ product.quantity * Number(product.price_tax.toFixed(2)) }}</span>
                        <!-- <a v-if="!product.is_bundle || product.is_bundle == undefined" @click="removeProduct(product.id, product.subarticle, product.id_branch, product.id_numberItem)"
                            class="cursor-pointer text-pink-500 font-medium text-sm hover:text-pink-600 transition-colors transition-duration-300"
                            tabindex="0"> Remove </a>
                        <a v-if="product.is_bundle" @click="removeBundle(product.id, product.id_numberBundle, product.id_branch)" class="cursor-pointer text-pink-500 font-medium text-sm hover:text-pink-600 transition-colors transition-duration-300"
                            tabindex="0"> Remove </a> -->
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useCartStore } from '../../stores/cart';
import axios from 'axios';
import { useToast } from "primevue/usetoast";

const toast = useToast();
const cartStore = useCartStore();
const cartproduct = ref<any[]>([]);
const branches = ref<any[]>([]);
const products = ref<any[]>([]);
const loading = ref<boolean>(false)
const is_deleted = ref<boolean>(false);
const is_deletedBundle = ref<boolean>(false);
const items = ref <any[]>([]);
const flattenedArray = ref <any[]>([]);


import { defineEmits } from 'vue';

const emits = defineEmits<{
  (e: 'update:flattenedArray', value: any[]): void;
}>();

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
        cartproduct.value = cartStore.cart
        for (const product of cartStore.cart) {
            let branch = await axios.get('General/Branch/', {
                headers: {
                    company: 1
                }
            })
            branches.value = branch.data;
            if (product.is_bundle) {
                let bundle = await axios.get('Inventory/EComerce/getBundleInfo', {
                    headers: {
                        id: product.id,
                        branch: product.id_branch
                    }
                });
                products.value.push(bundle.data);
                items.value.push(bundle.data);
            } else{
                product.id_article = product.id;
                items.value.push(product)
            }
            sendData();
        }
    }catch{

    }finally{
        loading.value = false
    }
}

const removeProduct = (id, subarticle, id_branch) => {
    // const index = cartStore.cart.findIndex(item => item.id === id && item.subarticle === subarticle && item.id_branch === id_branch);
    cartStore.cart = cartStore.cart.filter(item => !(item.id === id && item.subarticle === subarticle && item.id_branch === id_branch));
    cartStore.updateCart(is_deleted.value, is_deletedBundle.value)
}

const sendData = () => {
    flattenedArray.value = items.value.flat();   
    emits('update:flattenedArray', flattenedArray.value);
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