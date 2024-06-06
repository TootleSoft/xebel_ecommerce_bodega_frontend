<template>
    <li v-for="(product, i) in cartStore.cart" :key="i" class="flex flex-column md:flex-row py-6 border-top-1 border-bottom-1 surface-border md:align-items-center">
        <img :src="imgroute(product.id, product.barcode, product.id_brand)" class="w-12rem h-12rem flex-shrink-0 mx-auto md:mx-0" alt="shopping-cart-2-1" />
        <div class="flex-auto py-5 md:pl-5">
            <div class="flex flex-wrap align-items-start sm:align-items-center sm:flex-row sm:justify-content-between surface-border pb-6">
                <div class="w-full sm:w-6 flex flex-column">
                    <span class="text-900 text-xl font-medium mb-3">{{ product.name }}</span>
                    <span class="text-900 text-md font-medium mb-3">{{ product.key_name }}</span>
                    <span class="text-700 text-sm">{{product.barcode}}</span>
                </div>
                <div class="w-full sm:w-6 flex align-items-start justify-content-between mt-3 sm:mt-0">
                    <div>
                        &nbsp
                        <!-- <Dropdown :options="quantityOptions" v-model="selectedQuantity" optionLabel="label"></Dropdown> -->
                        <InputNumber
                        showButtons
                        buttonLayout="horizontal"
                        :min="1"
                        inputClass="w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                        v-model="product.quantity"
                        class="border-1 surface-border border-round"
                        decrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                        incrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                        incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus"
                    ></InputNumber>
                    </div>
                    <div class="flex flex-column sm:align-items-end">
                        <span v-if="!product.original_price" class="text-900 text-xl font-medium mb-2 sm:mb-3"><label class="text-900 font-bold">P.U. + IVA</label>&nbsp&nbsp&nbsp${{ product.price_tax.toFixed(2) }}</span>
                        <span v-if="product.original_price" class="text-900 text-xl font-medium mb-2 sm:mb-3 line-through"><label class="text-900 font-bold">P.U. + IVA</label>&nbsp&nbsp&nbsp${{ product.original_price.toFixed(2) }}</span>
                        <span v-if="product.original_price" class="text-900 text-xl font-medium mb-2 sm:mb-3 text-red-500"><label class="text-red-500 text-900 font-bold">P.U. + IVA</label>&nbsp&nbsp&nbsp${{ product.price_tax.toFixed(2) }}</span>   
                        <span class="text-900 text-xl font-medium mb-2 sm:mb-3"><label class="text-900 font-bold">TOTAL</label>&nbsp&nbsp&nbsp${{ product.quantity*Number(product.price_tax.toFixed(2))}}</span>                     
                        <a @click="removeProduct(product.id, product.subarticle, product.id_branch)" class="cursor-pointer text-pink-500 font-medium text-sm hover:text-pink-600 transition-colors transition-duration-300" tabindex="0"> Remove </a>
                    </div>
                </div>
            </div>
            <div class="flex flex-column">
                <div class="w-full sm:w-4 flex flex-column">
                    <span class="field text-700 mr-2">Sucursal.</span>
                    <Dropdown v-model="product.id_branch" :options="productExistence[i]" optionValue="id_branch" :optionLabel="'branch_name'" class="align-items-center mb-3"></Dropdown>
                </div>
                <span class="inline-flex align-items-center mb-3">
                    <i class="pi pi-envelope text-700 mr-2"></i>
                    <span class="text-700 mr-2">{{  }}</span>
                </span>
                <span class="inline-flex align-items-center mb-3">
                    <i class="pi pi-send text-700 mr-2"></i>
                    <span class="text-700 mr-2"> Delivery by <span class="font-bold">Dec 23.</span> </span>
                </span>
                <span class="flex align-items-center">
                    <i class="pi pi-exclamation-triangle text-700 mr-2"></i>
                    <span class="text-700">Only 8 Available.</span>
                </span>
            </div>
        </div>
    </li>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useCartStore } from '../../stores/cart';
import axios from 'axios';
const cartStore = useCartStore();

const productExistence = ref<any[]>([]);
const cartproduct = ref<any[]>([]);

const imgroute = (id, sku, brand) => {
        sku= sku.replace(/\//g, "--").replace(/ñ/g, "nnn").replace(/Ñ/g, "nnn").replace(/#/g, '----')
        return import.meta.env.VITE_API_ROUTE+'Inventory/Ecomerce/image/'+id+'_'+sku+'_1/'+brand;
    }

const refresh = async () =>  {
    cartproduct.value = cartStore.cart
    for(const product of cartStore.cart){
        let resposnse = await axios.get('Inventory/EComerce/GetProductExistences/'+product.id+'/'+product.id_subarticle)
        productExistence.value.push(resposnse.data)
    }
    console.log(JSON.stringify(productExistence.value))
}

const removeProduct = (id, subarticle, id_branch) => {
    // const index = cartStore.cart.findIndex(item => item.id === id && item.subarticle === subarticle && item.id_branch === id_branch);
    cartStore.cart = cartStore.cart.filter(item => !(item.id === id && item.subarticle === subarticle && item.id_branch === id_branch));
    cartStore.updateCart()
}

watch(cartStore.cart, ()=>{
    console.log(JSON.stringify(cartStore.cart))
    cartStore.updateCart()
})

onMounted(async () => {
    await refresh();
});
</script>