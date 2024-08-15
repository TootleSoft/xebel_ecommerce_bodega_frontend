<template>
    <div class="grid -mt-3 -ml-3 -mr-3">
            <div class="col-12">
                <div class="grid formgrid p-fluid">
                    <div class="field col-12 sm:col-12 md:col-8 xl:col-8"></div>
                    <div class="field col-12 sm:col-12 md:col-4 xl:col-4">
                        <FloatLabel>
                            <AutoComplete v-model="filterproductname" @item-select="selectSuggestion" inputId="filter" optionLabel="description" :suggestions="suggest" @complete="search" v-on:keyup.enter="filteredserch(filterproductname)">
                            </AutoComplete>
                            <label for="filter">
                                <i class="pi pi-filter"></i> Busqueda Filtrada en {{ pagetitle }}
                            </label>
                        </FloatLabel>
                    </div>
                </div>
            </div>
            <div v-for="(product, i) in products.slice(first/10*pagesize,first/10*pagesize+pagesize)" :key="i" class="col-12 md:col-5 lg:col-3 mb-5 lg:mb-0">
                <div class="mb-1 relative">
                    <!-- <img :src="'/demo/images/ecommerce/product-list/product-list-4-1.png'" class="w-full" :alt="String(i)" @click="router.push('/product/'+product.id+'/'+product.id_subarticle)"/> -->
                    <img :src="imgroute(product.id, product.barcode, product.id_brand)" class="w-full h-auto shadow-8" :alt="String(i)" @click="router.push('/product/'+product.id+'/'+product.id_subarticle)"/>
                    <span v-if="product.existence == 'EN EXISTENCIA'" class="surface-card text-900 shadow-2 px-3 py-2 absolute border-round-3xl text-green-500 font-bold" :style="{ left: '1rem', top: '1rem' }"> {{ product.existence }} </span>
                    <span v-if="product.existence == 'POCA EXISTENCIA'" class="surface-card text-900 shadow-2 px-3 py-2 absolute border-round-3xl text-orange-500 font-bold" :style="{ left: '1rem', top: '1rem' }"> {{ product.existence }} </span>
                    <span v-if="product.existence == 'SOLO DE VENTA EN TIENDA'" class="surface-card text-900 shadow-2 px-3 py-2 absolute border-round-3xl text-green-500 font-bold" :style="{ left: '1rem', top: '1rem' }"> {{ product.existence }} </span>
                    <span v-if="product.existence == 'SIN EXISTENCIA'" class="surface-card text-900 shadow-2 px-3 py-2 absolute border-round-3xl text-red-500 font-bold" :style="{ left: '1rem', top: '1rem' }"> {{ product.existence }} </span>
                    <Button
                    type="button"
                        :disabled="(dissableNoStock == 1 && product.stock <= 0) || product.existence == 'SOLO DE VENTA EN TIENDA'"
                    class="border-1 border-white border-round py-2 px-3 absolute bg-black-alpha-30 text-white inline-flex align-items-center justify-content-center hover:bg-teal-500 transition-colors transition-duration-300 cursor-pointer"
                    :style="{ bottom: '1rem', left: '1rem', width: 'calc(100% - 2rem)' }"
                    @click="addCart(product.id, product.id_subarticle, product.quantity, i)"
                    >
                        <i class="pi pi-shopping-cart mr-3 text-base"></i>
                        <span class="text-base">Agregar al carrito</span>
                    </Button>
                </div>
                <div class="flex flex-column align-items-center">
                    <span class="text-l text-900 font-bold mb-3">{{product.description}}</span>
                    <span v-if="!product.original_price" class="text-l text-900 mb-3">{{ "$"+product.price_tax.toFixed(2) }}</span>
                    <span v-if="product.original_price" class="text-l text-900 mb-3 line-through">{{ "$"+product.original_price.toFixed(2) }}</span>
                    <span v-if="product.original_price" class="text-l text-900 mb-3 text-red-500">{{ "$"+product.price_tax.toFixed(2) }}</span>
                    <span class="text-l text-900 mb-3 font-medium">{{ product.barcode }}</span>
                    <div class="col-12 align-items-center">
                        <div class="grid formgrid p-fluid">
                            <div class="col-3"></div>
                            <InputNumber showButtons buttonLayout="horizontal" :min="1" :max="product.stock == 0 ? 1 : product.stock"
                            inputClass="w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                            v-model="product.quantity" class="border-1 surface-border border-round col-6"
                            decrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                            incrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                            incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"></InputNumber>
                            <div class="col-4"></div>
                        </div>
                    </div>
                    <br>
                </div>
            </div>
            <br></br>
            <div class="field col-12 sm:col-12 md:col-12 xl:col-12">
                <Paginator v-model:first="first" :rows="10" :totalRecords="products.length/(pagesize/10)"></Paginator>
            </div>
        </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../../stores/cart';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';
const auth = useAuthStore();
const cartStore = useCartStore();
const toast = useToast();

    interface Props {
        allproducts?: any[];
        pagesize?: number;
        pagetitle?: string;
    }

    const props = withDefaults(defineProps<Props>(),{
        allproducts: () => [],
        pagesize: 40,
        pagetitle: '',
    })

    const id_user = ref<string>(auth.id_customer ? auth.id_customer.toString() : "0");

    const products = ref<any[]>(props.allproducts)
    
    const filterproductname = ref<string>();

    const suggest = ref<any[]>([]);

    const dissableNoStock = ref<number>(0);

    const search = (event) => {
        suggest.value = products.value.filter(x => {return (x.description || '').toLowerCase().includes((event.query || '').toLowerCase())});
    }

    const imgroute = (id, sku, brand) => {
        sku= sku.replace(/\//g, "--").replace(/ñ/g, "nnn").replace(/Ñ/g, "nnn").replace(/#/g, '----')
        return import.meta.env.VITE_API_ROUTE+'Inventory/Ecomerce/image/'+id+'_'+sku+'_1/'+brand;
    }
    const filteredserch = (newValue) => {
        console.log(JSON.stringify(newValue))
        if(newValue == ''){
            products.value = props.allproducts;
        }
        else{
            products.value = props.allproducts;
            products.value = products.value.filter(x => {return x.description.toLowerCase().includes(newValue.toLowerCase())})
        }
    }

    const selectSuggestion = (payload) =>{
        console.log(JSON.stringify(payload))
        filterproductname.value = payload.value.description;
    }


    const first  = ref<number>(0);

    const router = useRouter();

    const product = ref<any[]>([]);

    const addCart = async (id_article, id_subarticle, quantity, i) =>{
        let response = await axios.get('Inventory/EComerce/GetArticleInfo/' + id_article + '/' + id_subarticle + '/' + id_user.value)
        product.value = response.data;
        let existence_resposnse = await axios.get('Inventory/EComerce/GetProductExistences/' + id_article + '/' + id_subarticle)
        let existence = existence_resposnse.data;
        let branch = existence.sort((a, b) => b.stock - a.stock)[0].id_branch
        console.log(JSON.stringify(quantity))
        console.log(JSON.stringify(branch))
        console.log(JSON.stringify(product.value))
        products.value[i].quantity = 1
        cartStore.addCart(product.value[0], quantity, branch, false);
        toast.add({ severity: 'success', summary: 'Agregado', detail: 'Articulo Agregado al carrito', life: 3000 });
    }

onMounted(() => {
    dissableNoStock.value = import.meta.env.VITE_DISSABLE_NO_STOCK;
})
</script>
<style>

</style>