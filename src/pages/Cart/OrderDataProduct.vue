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
                        <div v-if="product.is_bundle" class="col-12 lg:col-1">
                            <ul v-if="product.is_bundle" class="py-0 pl-3 m-0 text-600 mb-3">
                                <li class="mb-2" v-for="(item, j) in products[i]" :key="j">{{ products[i][j].quantity }}</li>
                            </ul>
                        </div>
                        <div class="col-12 lg:col-1">
                            <ul v-if="product.is_bundle" class="py-0 pl-3 m-0 text-600 mb-3">
                                <li class="mb-2" v-for="(item, j) in products[i]" :key="j">{{ products[i][j].barcode }}</li>
                            </ul>
                        </div>
                        <div class="col-12 lg:col-1">
                            &nbsp
                            <!-- <Dropdown :options="quantityOptions" v-model="selectedQuantity" optionLabel="label"></Dropdown> -->
                            <InputNumber showButtons buttonLayout="horizontal" :min="1"
                                inputClass="w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                                v-model="product.quantity" class="border-1 surface-border border-round"
                                decrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                                incrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"></InputNumber>
                        </div>
                    </div>
                </div>
                <div class="w-full sm:w-6 flex align-items-start justify-content-between mt-3 sm:mt-0">
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
                        <a @click="removeProduct(product.id, product.subarticle, product.id_branch)"
                            class="cursor-pointer text-pink-500 font-medium text-sm hover:text-pink-600 transition-colors transition-duration-300"
                            tabindex="0"> Remove </a>
                    </div>
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
import { isArrayTypeNode } from 'typescript';

const toast = useToast();
const productExistence = ref<any[]>([]);
const cartproduct = ref<any[]>([]);
const branches = ref<any[]>([]);
const stock = ref<any>();
const bundles = ref<any[]>([]);
const bundles2 = ref<any[]>([]);
const array = ref<any[]>([]);
const products = ref<any[]>([]);
const loading = ref<boolean>(false)

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
            if (!product.is_bundle || product.is_bundle == undefined) {
                let resposnse = await axios.get('Inventory/EComerce/GetProductExistences/' + product.id + '/' + product.id_subarticle)
                //productExistence.value.push(resposnse.data)
                productExistence.value = resposnse.data;
            } else if (product.is_bundle) {
                let bundle = await axios.get('Inventory/EComerce/getBundleInfo', {
                    headers: {
                        id: product.id,
                        branch: product.id_branch
                    }
                });
                products.value.push(bundle.data);
                for (let i = 0; i < products.value.length; i++) {
                    stock.value = undefined;
                    bundles.value = [];
                    const a = products.value[i];
                    for(let j = 0; j < a.length; j++){
                        const b = a[j];
                        const pack = Math.floor(b.stock / b.quantity); //obtiene el número de paquetes que se completan dependiendo del stock disponible
                        bundles.value.push(pack); //se agrega a otro arreglo bundles para ir guardando cuantos paquetes se completan de cada artículo
                    }
                    bundles2.value.push(bundles.value);
                    //return;
                }
                console.log("paquetes", bundles2.value.slice(-products.value.length).length)
                
                //se valida que todos los artículos completen el mismo número de paquetes, si no se completan los mismos, se toma como stock el que complete menos paquetes
                if(bundles2.value.slice(-products.value.length).length == products.value.length){
                    for (let k = 0; k < bundles2.value.slice(-products.value.length).length; k++) {
                    let menorValor = bundles2.value.slice(-products.value.length)[k][0];
                    // console.log("menor valor", menorValor)
                    // for(let l = 0; l < bundles2.value[k].slice(-products.value.length).length; l++){
                    //     if (bundles2.value[k][l] < menorValor) {
                    //         menorValor = bundles2.value[k][l];
                    //         stock.value = menorValor;
                    //     }
                    // }
                    array.value.push(menorValor);
                    console.log("array", array.value)
                }
                }
            }
        }
    }catch{

    }finally{
        loading.value = false
    }
}

const removeProduct = (id, subarticle, id_branch) => {
    // const index = cartStore.cart.findIndex(item => item.id === id && item.subarticle === subarticle && item.id_branch === id_branch);
    cartStore.cart = cartStore.cart.filter(item => !(item.id === id && item.subarticle === subarticle && item.id_branch === id_branch));
    cartStore.updateCart()
}

const getExistence = (id_branch) => computed(() => {
    for (let i = 0; i < productExistence.value.length; i++) {
        const filteredBranch = productExistence.value.filter(branch => branch.id_branch === id_branch);
        if (filteredBranch.length > 0) {
            return filteredBranch[0].stock;
        } else {
            return 'Sin stock';
        }
    }
});

// const getStockBundle = (id, id_branch) => computed(() => {
//     try{
//         //getBundleInfo(id, id_branch);
//         stock.value = undefined;
//         bundles.value = [];
//         for (let i = 0; i < products.value.length; i++) {
//             const a = products.value[i];
//             for(let j = 0; j < a.length; j++){
//                 const b = a[j];
//                 const pack = Math.floor(b.stock / b.quantity); //obtiene el número de paquetes que se completan dependiendo del stock disponible
//                 bundles.value.push(pack); //se agrega a otro arreglo bundles para ir guardando cuantos paquetes se completan de cada artículo
//             }
//             //se valida que todos los artículos completen el mismo número de paquetes, si no se completan los mismos, se toma como stock el que complete menos paquetes
//             let menorValor = bundles.value[0];
//             for (let i = 0; i < bundles.value.length; i++) {
//                 if (bundles.value[i] < menorValor) {
//                     menorValor = bundles.value[i];
//                 }
//             }
//             if(menorValor > 0){
//                 stock.value = menorValor;
//             }else{
//                 stock.value = "Sin stock";
//             }
//         }
//     }catch{

//     }finally{
//         loading.value = false;
//     }  
// });

watch(cartStore.cart, () => {
    console.log(JSON.stringify(cartStore.cart))
    let is_duplicate = cartStore.updateCart()
    if (is_duplicate == true) {
        toast.add({ severity: 'error', summary: 'Sucursal Duplicada', detail: 'El mismo producto ya se esta pidiendo en la sucursal seleccionada', life: 7500 });
    }
})

onMounted(async () => {
    await refresh();
});
</script>