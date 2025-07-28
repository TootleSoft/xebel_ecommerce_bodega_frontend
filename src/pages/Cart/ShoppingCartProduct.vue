<template>
    <div v-if="cartStore.cart.length === 0" class="grid justify-center items-center h-64 w-full">
        <img src="@/images/icons/empty-cart.svg" alt="Carrito vacío" class=" img-empty-cart w-full">
        <span class="empty-title w-full">Tu carrito de compras est&aacute; vac&iacute;o</span>
        <span class="go-back" @click="router.push('/')"><i class="pi pi-arrow-left mr-3"></i>Ir al inicio y empezar a comprar</span>
    </div>
    <li 
        v-else 
        v-if="!loading" 
        v-for="(product, i) in cartStore.cart" 
        :key="i"
        class="py-6 px-4 border rounded-lg shadow-md bg-white flex flex-col md:flex-row gap-4" 
        style="
        padding: 1rem 1rem 1rem 0rem !important;
    ">
       <!-- CONTENEDOR PRINCIPAL -->
       <div class="flex flex-col md:flex-row w-full gap-0 items-start">
            <div class="w-full md:w-auto flex justify-center md:justify-start">
                <!-- Imagen del producto -->
                <img v-if="!product.is_bundle || product.is_bundle == undefined"
                    :src="imgroute(product.id, product.barcode, product.id_brand)"
                    class="w-12rem h-12rem flex-shrink-0 mx-auto md:mx-0" alt="imagen del articulo"
                    />
                <img
                    v-if="product.is_bundle"
                    :src="imgBundle(product.id)"
                    class="w-48 h-48 md:w-40 md:h-40 flex-shrink-0 mx-auto md:mx-0 rounded-lg shadow-md"
                    alt="shopping-cart-2-1"
                />
            </div>
            <!-- CONTENEDOR DE INFORMACIÓN EN FILAS-->
            <div class="grid grid-cols-1 gap-4 w-full border-4 border-yellow-400 p-0" style="margin: 0rem 0rem 0rem 0rem !important; padding: 0rem 0rem 0rem 1rem !important">
                <!-- Fila 1: Nombre -->
                 <div class="w-full">
                    <span class="text-900 text-lg font-medium" 
                        style="font-family: 'Montbold'; color: #0c3e66 !important">{{ product.name }}
                    </span>
                 </div>
                 <!-- Fila 2: SKU -->
                 <div class="w-full" v-if="!product.is_bundle || product.is_bundle == undefined">
                    <span class="text-700 text-sm" 
                    style="font-family: 'Montbold'">SKU: {{ product.barcode }}</span>
                 </div>

                 <!-- Fila 3: Detalles de bundle -->
                 <div v-if="product.is_bundle" class="w-full grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <ul class="py-0 pl-3 m-0 text-600">
                        <li v-for="(item, j) in products[product.id_numberBundle-1]" :key="j">{{ products[product.id_numberBundle-1][j].quantity }}
                        </li>
                    </ul>
                    <ul class="py-0 pl-3 m-0 text-600">
                        <li v-for="(item, j) in products[product.id_numberBundle-1]" :key="j">{{ products[product.id_numberBundle-1][j].barcode }}
                        </li>
                    </ul>
                 </div>
                 <!-- Fila 4: Cantidad + Precio -->
                 <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-0 items-center" style="margin: 0rem 0rem 0rem 0rem !important">
                    <div class="flex items-center gap-0 w-full">
                        <!-- Cantidad -->
                        <InputNumber 
                            v-if="!loading" 
                            showButtons 
                            buttonLayout="horizontal" 
                            :min="1" 
                            :max="getMax(product.id_numberItem,product.id_branch)"
                            inputClass="w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                            v-model="product.quantity" 
                            class="border-1 surface-border border-round h-3rem w-full sm:w-auto"
                            decrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                            incrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                            incrementButtonIcon="pi pi-plus" 
                            decrementButtonIcon="pi pi-minus"
                        >
                        </InputNumber>
                    </div>

                    <!-- Precios -->
                    <div class="text-right sm:text-end w-full">
                        <!-- Precios -->
                        <!-- <div v-if="!product.original_price" class="text-900 text-md font-medium mb-2 sm:mb-3">
                            ${{ product.price_tax.toFixed(2) }}
                        </div> -->
                        <div v-if="product.original_price" class="text-gray-500 line-through text-md">
                            ${{ product.original_price.toFixed(2) }}
                        </div>
                        <div v-if="product.original_price" class="text-red-600 font-semibold text-xl">
                            ${{ product.price_tax.toFixed(2) }}
                        </div>
                        <div class="font-bold text-lg">
                            ${{ (product.quantity * product.price_tax).toFixed(2)}}
                        </div>
                    </div>
                 </div>
                 <!-- Fila 5: Botón eliminar -->
                 <div class="w-full text-end">
                    <!-- Botón eliminar -->
                    <a 
                        v-if="!product.is_bundle || product.is_bundle == undefined" 
                        @click="removeProduct(product.id, product.subarticle, product.id_branch, product.id_numberItem)"
                        class="cursor-pointer text-red-500 hover:text-pink-600 transition-colors transition-duration-300">
                        <i class="pi pi-trash mr-0" style="color: red; font-size: 1.2rem"></i>
                    </a>
                    <a 
                        v-if="product.is_bundle" 
                        @click="removeBundle(product.id, product.id_numberBundle, product.id_branch)" 
                        class="cursor-pointer text-red-500 hover:text-pink-600 transition-colors transition-duration-300">
                        <i class="pi pi-trash mr-0" style="color: red; font-size: 1.2rem"></i>
                    </a>
                 </div>     
            </div>
        </div>
        <!-- Contenido de los detalles del producto
        <div class="flex-auto py-3 md:pl-1" style="border: 4px solid blue">
            <div class="flex flex-wrap align-items-start sm:align-items-center sm:flex-row sm:justify-content-between surface-border pb-6">

                Información de cantidad, precios y total 
                <div class="w-full sm:w-6 flex align-items-start justify-content-between mt-3 sm:mt-0">
                     Precios
                    <div class="flex flex-column sm:align-items-end" style="border: 1px solid red">

                         Botón de eliminar 

                    </div>
                </div>
            </div>

             Información adicional (Sucursal, existencia)
            <div class="flex flex-column" style="border: 1px solid red">
                <div class="w-full sm:w-4 flex flex-column">
                    <span class="field text-700 mr-2" style="font-family: 'Montserrat';">Sucursal.</span>
                    <Dropdown v-if="!product.is_bundle || product.is_bundle == undefined" v-model="product.id_branch"
                        :options="branches" optionValue="id_branch" :optionLabel="'branch_name'"
                        class="align-items-center mb-3"></Dropdown>
                    <Dropdown v-if="product.is_bundle" v-model="product.id_branch" :options="branches"
                        optionValue="id_branch" :optionLabel="'branch_name'" class="align-items-center mb-3" :disabled=true ></Dropdown>
                </div>

                <span v-if="showStock == 1" class="inline-flex align-items-center mb-3">
                    <span v-if="!product.is_bundle || product.is_bundle == undefined" class="text-700 mr-2" style="font-family: 'Montserrat'">
                        Existencia: {{ getExistence(product.id_numberItem,product.id_branch) }}
                    </span>
                    <span v-if="product.is_bundle && (products.length % 2 === 0 || products.length == 1)" class="text-700 mr-2" style="font-family: 'Montserrat'">
                        Existencia: {{ array[(product.id_numberBundle-1)+(products.length-1)]}}
                    </span>
                    <span v-if="product.is_bundle && products.length % 2 !== 0 && products.length > 1" class="text-700 mr-2" style="font-family: 'Montserrat';">
                        Existencia: {{ array[(product.id_numberBundle-1)+(products.length)]}}
                    </span>
                </span>
            </div> 
        </div>-->
    </li>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useCartStore } from '../../stores/cart';
import {OrderData} from '../Cart/Function/OrderData';
import axios from 'axios';
import { useRouter } from 'vue-router';
const cartStore = useCartStore();
import { useToast } from "primevue/usetoast";
const toast = useToast();
const entity = new OrderData();
const productExistence = ref<any[]>([]);
const cartproduct = ref<any[]>([]);
const branches = ref<any[]>([]);
const stock = ref<any>();
const bundles = ref<any[]>([]);
const array = ref<any[]>([]);
const products = ref<any[]>([]);
const loading = ref<boolean>(true);
const is_deleted = ref<boolean>(false);
const is_deletedBundle = ref<boolean>(false);
const showStock = ref<number>(0);
const router = useRouter();

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
    console.log(JSON.stringify(id_numberItem))
    console.log(JSON.stringify(id_branch))
    if(id_numberItem == undefined || id_branch == undefined){
        return 999
    }else{
        console.log(JSON.stringify(id_numberItem,id_branch))
        console.log(productExistence.value[id_numberItem-1])
        const filteredBranch = productExistence.value[id_numberItem-1].filter(branch => branch.id_branch === id_branch);
        return filteredBranch[0].stock == 0 ? 1 : filteredBranch[0].stock;
    }
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
<style>
.img-empty-cart {
    width: 15rem;
    height: 15rem;
}
.empty-title {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 2rem;
    color: #ff5202;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    margin-top: 1rem;
}
.go-back:hover {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
}
</style>