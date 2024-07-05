<template>
    <br>
    <div class="card">
        <div class="grid mb-7">
            <div class="col-12 lg:col-5">
                <div class="flex">
                    <div class="pl-3 w-12 flex">
                        <img :alt="'image'" :src="imgRoute(route.params.id)"
                            class="w-full border-2 border-transparent border-round" />
                    </div>
                </div>
            </div>
            <div class="col-12 lg:col-4 py-3 lg:pl-6">
                <div class="font-bold text-900">Sucursal</div>
                <div class="flex">
                    <div class="field col-12 h-3rem">
                        <Dropdown v-model="selectedBranch" :options="branches" optionValue="id_branch" optionLabel="branch_name"
                            placeholder="Seleccione una Sucursal" class="w-full" />
                    </div>
                </div>
                <br>
                <br>
                <br>
                <TabView>
                    <TabPanel header="Descripción">
                        <div class="text-900 font-bold text-3xl mb-4 mt-2">Descripción del paquete</div>
                        <p class="line-height-3 text-600 p-0 mx-0 mt-0 mb-4" v-if="!loading">
                            {{ products[0].key_name }}
                        </p>
                    </TabPanel>
                    <TabPanel header="Detalles">
                        <div class="grid">
                            <div class="col-12 lg:col-2">
                                <span class="text-900 block font-medium mb-3 font-bold">Cantidad</span>
                                <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                    <li class="mb-2" v-if="!loading" v-for="(product, i) in products" :key="i">{{
                            products[i].quantity }}</li>
                                </ul>
                            </div>
                            <div class="col-12 lg:col-2">
                                <span class="text-900 block font-medium mb-3 font-bold">P.U.</span>
                                <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                    <li class="mb-2" v-if="!loading" v-for="(product, i) in products" :key="i">${{
                            products[i].unit_price.toFixed(2) }}</li>
                                </ul>
                            </div>
                            <div class="col-12 lg:col-2">
                                <span class="text-900 block font-medium mb-3 font-bold">SKU</span>
                                <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                    <li class="mb-2" v-if="!loading" v-for="(product, i) in products" :key="i">{{
                            products[i].barcode }}</li>
                                </ul>
                            </div>
                            <div class="col-12 lg:col-6">
                                <span class="text-900 block font-medium mb-3 font-bold">Nombre</span>
                                <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                    <li class="mb-2" v-if="!loading" v-for="(product, i) in products" :key="i">{{
                            products[i].article_name }}</li>
                                </ul>
                            </div>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
            <div class="col-12 lg:col-2 py-3 lg:pl-6">
                <div v-if="!loading" class="flex align-items-center text-2xl font-medium text-900 mb-4"> {{
                            products[0].name }} &nbsp &nbsp <i class="pi text-2xl cursor-pointer"
                        :class="{ 'pi-heart text-600': !liked, 'pi-heart-fill text-orange-500': liked }"
                        @click="liked = !liked"></i></div>
                <div class="flex align-items-center mb-5">
                    <span v-if="!loading" class="text-900 font-medium text-lg block"> ${{ products[0].price_tax.toFixed(2)
                        }}</span>
                    <!-- <span v-if="!loading" class="text-900 font-medium text-lg block line-through"></span>
                    &nbsp &nbsp
                    <span v-if="!loading" class="text-900 font-medium text-lg block text-red-500"></span> -->
                </div>
                <div class="font-bold text-900 mb-3">Stock</div>
                <div class="flex align-items-center mb-5">
                    <label v-if="stock != undefined && stock > 0" class="w-full text-lg text-green-500">{{ stock }}
                        Disponible</label>
                    <label v-if="stock != undefined && stock <= 0" class="w-full text-lg text-red-500">{{ stock }}
                        Disponible</label>
                </div>
                <div class="font-bold text-900 mb-3">Cantidad</div>
                <div class="flex flex-column sm:flex-row sm:align-items-center sm:justify-content-between">
                    <InputNumber showButtons buttonLayout="horizontal" :min="0"
                        inputClass="w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                        v-model="quantity" class="border-1 surface-border border-round"
                        decrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                        incrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"></InputNumber>
                </div>
                <br>
                <div class="col-12">
                    <Button @click="addToCart" label="Añadir al carrito" class="w-full"></Button>
                </div>
                <div class="col-12">
                    <Button label="Pagar Ahora" class="w-full"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { useToast } from "primevue/usetoast";
import { useCartStore } from '../../stores/cart';
import {OrderData} from '../Cart/Function/OrderData';


const loading = ref<boolean>(true);
const selectedBranch = ref<number>(1);
const products = ref<any[]>([]);
const branches = ref<any[]>([]);
const route = useRoute();
const router = useRouter();
const liked = ref(false);
const quantity = ref<number>(1);
const stock = ref<number>();
const bundles = ref<any[]>([]);
const toast = useToast();
const cartStore = useCartStore();
const entity = new OrderData();


onMounted(async () => {
    await refresh();
});

watch(router.currentRoute, async () => {
    await refresh();
})

watch(selectedBranch, (newvalue) => {
    refresh();
})

const refresh = async () => {
    loading.value = true;
    try {
        let branch = await axios.get('General/Branch/', {
            headers: {
                company: 1
            }
        })
        branches.value = branch.data;
        await getBundleInfo();
        if(cartStore.order.length == 1)
            await entity.newOrder();
    } catch {
        console.log("No se cargaron los datos")
    } finally {
        loading.value = false;
    }
}

const imgRoute = (id) => {
    return import.meta.env.VITE_API_ROUTE + 'Inventory/Promotions/image/' + id;
}

const addToCart = async () => {
    try {
        cartStore.addCart(products.value[0], quantity.value, selectedBranch.value, true);
        toast.add({ severity: 'success', summary: 'Añadido al carrito', detail: 'El paquete ' + products.value[0].name + ' se ha añadido al carrito', life: 3000 });
        quantity.value = 1
    } catch {

    }
}

const getBundleInfo = async () => {
    products.value = [];
    let response = await axios.get('Inventory/EComerce/getBundleInfo', {
        headers: {
            id: route.params.id,
            branch: selectedBranch.value
        }
    });
    products.value = response.data;
    if (products.value.length == 0) {
        toast.add({ severity: 'error', summary: 'Sin resultados', detail: 'No existe el paquete en la sucursal seleccionada', life: 3000 });
        let response = await axios.get('Inventory/EComerce/getBundleInfo', {
            headers: {
                id: route.params.id,
                branch: 1
            }
        });
        products.value = response.data;
        selectedBranch.value = 1;
    }
    await getStock();
}

const getStock = async () => {
    stock.value = undefined;
    bundles.value = [];
    for (let i = 0; i < products.value.length; i++) {
        const a = products.value[i];
        const pack = Math.floor(a.stock / a.quantity); //obtiene el número de paquetes que se completan dependiendo del stock disponible
        bundles.value.push(pack); //se agrega a otro arreglo bundles para ir guardando cuantos paquetes se completan de cada artículo
    }
    //se valida que todos los artículos completen el mismo número de paquetes, si no se completan los mismos, se toma como stock el que complete menos paquetes
    let menorValor = bundles.value[0];
    for (let i = 0; i < bundles.value.length; i++) {
        if (bundles.value[i] < menorValor) {
            menorValor = bundles.value[i];
        }
    }
    stock.value = menorValor;
}
</script>