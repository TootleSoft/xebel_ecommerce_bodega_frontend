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
                    <div>
                        &nbsp
                        <!-- <Dropdown :options="quantityOptions" v-model="selectedQuantity" optionLabel="label"></Dropdown> -->
                        <InputNumber v-if="!loading" showButtons buttonLayout="horizontal" :min="1" :max="getMax(product.id_numberItem,product.id_branch)"
                            inputClass="w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                            v-model="product.quantity" class="border-1 surface-border border-round"
                            decrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                            incrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                            incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"></InputNumber>
                    </div>
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
                        <a v-if="!product.is_bundle || product.is_bundle == undefined" @click="removeProduct(product.id, product.subarticle, product.id_branch, product.id_numberItem)"
                            class="cursor-pointer text-pink-500 font-medium text-sm hover:text-pink-600 transition-colors transition-duration-300"
                            tabindex="0"> Remove </a>
                        <a v-if="product.is_bundle" @click="removeBundle(product.id, product.id_numberBundle, product.id_branch)" class="cursor-pointer text-pink-500 font-medium text-sm hover:text-pink-600 transition-colors transition-duration-300"
                            tabindex="0"> Remove </a>
                    </div>
                </div>
            </div>
            <div class="flex flex-column">
                <div class="w-full sm:w-4 flex flex-column">
                    <span class="field text-700 mr-2">Sucursal.</span>
                    <Dropdown v-if="!product.is_bundle || product.is_bundle == undefined" v-model="product.id_branch"
                        :options="branches" optionValue="id_branch" :optionLabel="'branch_name'"
                        class="align-items-center mb-3"></Dropdown>
                    <Dropdown v-if="product.is_bundle" v-model="product.id_branch" :options="branches"
                        optionValue="id_branch" :optionLabel="'branch_name'" class="align-items-center mb-3" :disabled=true ></Dropdown>
                </div>
                <span v-if="showStock == 1" class="inline-flex align-items-center mb-3">
                    <span v-if="!product.is_bundle || product.is_bundle == undefined" class="text-700 mr-2">Existencia: {{ getExistence(product.id_numberItem,product.id_branch) }}</span>
                    <span v-if="product.is_bundle && (products.length % 2 === 0 || products.length == 1)" class="text-700 mr-2" >Existencia: {{ array[(product.id_numberBundle-1)+(products.length-1)]}}</span>
                    <span v-if="product.is_bundle && products.length % 2 !== 0 && products.length > 1" class="text-700 mr-2" >Existencia: {{ array[(product.id_numberBundle-1)+(products.length)]}}</span>
                </span>
            </div>
        </div>
    </li>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useCartStore } from '../../stores/cart';
import {OrderData} from '../Cart/Function/OrderData';
import axios from 'axios';
const cartStore = useCartStore();
import { useToast } from "primevue/usetoast";
const toast = useToast();
const entity = new OrderData();
const productExistence = ref<any[]>([]);
const cartproduct = ref<any[]>([]);
const branches = ref<any[]>([]);
const stock = ref<any>();
const bundles = ref<any[]>([]);
const items = ref<any[]>([]);
const array = ref<any[]>([]);
const products = ref<any[]>([]);
const loading = ref<boolean>(true);
const is_deleted = ref<boolean>(false);
const is_deletedBundle = ref<boolean>(false);
const showStock = ref<number>(0);


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
        showStock.value = import.meta.env.VITE_SHOW_STOCK;
        cartproduct.value = cartStore.cart
        if(cartStore.order.length == 1)
            await entity.newOrder();
        for (const product of cartStore.cart) {
            let branch = await axios.get('General/Branch/', {
                headers: {
                    company: 1
                }
            })
            branches.value = branch.data;
            if (!product.is_bundle || product.is_bundle == undefined) {
                let resposnse = await axios.get('Inventory/EComerce/GetProductExistences/' + product.id + '/' + product.id_subarticle)
                productExistence.value.push(resposnse.data)
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
                    //se valida que todos los artículos completen el mismo número de paquetes, si no se completan los mismos, se toma como stock el que complete menos paquetes
                    let menorValor = bundles.value[0];
                    for (let k = 0; k < bundles.value.length; k++) {
                        if (bundles.value[k] < menorValor) {
                            menorValor = bundles.value[k];
                        }
                    }
                    array.value.push(menorValor);
                }
            }
        }
    }catch{

    }finally{
        loading.value = false
    }
}

const removeProduct = (id, subarticle, id_branch, id_numberItem) => {
    try{
        // const index = cartStore.cart.findIndex(item => item.id === id && item.subarticle === subarticle && item.id_branch === id_branch);
        cartStore.cart.forEach((x) => {
            x.id_numberItem = x.id_numberItem > id_numberItem ? x.id_numberItem - 1 : x.id_numberItem;
        });
        is_deleted.value = true;
        cartStore.cart = cartStore.cart.filter(item => !(item.id === id && item.subarticle === subarticle && item.id_branch === id_branch));
        cartStore.updateCart(is_deleted.value, is_deletedBundle.value)
        refresh();
    }catch{

    }finally{
        is_deleted.value = false;
        is_deletedBundle.value = false;
    }
}

const removeBundle = (id, id_numberBundle, id_branch) => {
    try{
        cartStore.cart.forEach((x) => {
            x.id_numberBundle = x.id_numberBundle > id_numberBundle ? x.id_numberBundle - 1 : x.id_numberBundle;
        });
        is_deletedBundle.value = true;
        cartStore.cart = cartStore.cart.filter(item => !(item.id === id && item.id_branch === id_branch));
        cartStore.updateCart(is_deleted.value, is_deletedBundle.value);
        refresh();
    }catch{

    }finally{
        is_deleted.value = false;
        is_deletedBundle.value = false;
    }
}

const getExistence = (id_numberItem,id_branch) => computed(() => {
    console.log(productExistence.value[id_numberItem-1])
    if (productExistence.value[id_numberItem-1]) {
        const filteredBranch = productExistence.value[id_numberItem-1].filter(branch => branch.id_branch === id_branch);
        if (filteredBranch.length > 0) {
            return filteredBranch[0].stock;
        } else {
            return 'Stock no encontrado';
        }
    } else {
        return 'Existencia no cargada';
    }
});
const getMax = (id_numberItem,id_branch) => {
    console.log(productExistence.value[id_numberItem-1])
    const filteredBranch = productExistence.value[id_numberItem-1].filter(branch => branch.id_branch === id_branch);
    return filteredBranch[0].stock == 0 ? 1 : filteredBranch[0].stock;
    // if (productExistence.value[id_numberItem-1]) {
    //     const filteredBranch = productExistence.value[id_numberItem-1].filter(branch => branch.id_branch === id_branch);
    //     if (filteredBranch.length > 0) {
    //         return filteredBranch[0].stock;
    //     } else {
    //         return 'Stock no encontrado';
    //     }
    // } else {
    //     return 'Existencia no cargada';
    // }
};

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