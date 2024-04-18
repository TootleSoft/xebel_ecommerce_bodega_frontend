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
                <div class="mb-3 relative">
                    <!-- <img :src="'/demo/images/ecommerce/product-list/product-list-4-1.png'" class="w-full" :alt="String(i)" @click="router.push('/product/'+product.id+'/'+product.id_subarticle)"/> -->
                    <img :src="imgroute(product.id, product.barcode, product.id_brand)" class="w-full h-19rem border-3 border-500" :alt="String(i)" @click="router.push('/product/'+product.id+'/'+product.id_subarticle)"/>
                    <span v-if="product.existence == 'DISPONIBLE'" class="surface-card text-900 shadow-2 px-3 py-2 absolute border-round-3xl text-green-500 font-bold" :style="{ left: '1rem', top: '1rem' }"> {{ product.existence }} </span>
                    <span v-if="product.existence == 'SIN EXISTENCIA'" class="surface-card text-900 shadow-2 px-3 py-2 absolute border-round-3xl text-red-500 font-bold" :style="{ left: '1rem', top: '1rem' }"> {{ product.existence }} </span>
                    <Button
                        type="button"
                        class="border-1 border-white border-round py-2 px-3 absolute bg-black-alpha-30 text-white inline-flex align-items-center justify-content-center hover:bg-black-alpha-40 transition-colors transition-duration-300 cursor-pointer"
                        :style="{ bottom: '1rem', left: '1rem', width: 'calc(100% - 2rem)' }"
                    >
                        <i class="pi pi-shopping-cart mr-3 text-base"></i>
                        <span class="text-base">Add to Cart</span>
                    </Button>
                </div>
                <div class="flex flex-column align-items-center">
                    <span class="text-l text-900 font-bold mb-3">{{product.description}}</span>
                    <span v-if="!product.original_price" class="text-l text-900 mb-3">{{ "$"+product.price_tax.toFixed(2) }}</span>
                    <span v-if="product.original_price" class="text-l text-900 mb-3 line-through">{{ "$"+product.original_price.toFixed(2) }}</span>
                    <span v-if="product.original_price" class="text-l text-900 mb-3 text-red-500">{{ "$"+product.price_tax.toFixed(2) }}</span>
                    <span class="text-l text-900 mb-3 font-medium">{{ product.barcode }}</span>
                </div>
            </div>
            <br></br>
            <div class="field col-12 sm:col-12 md:col-12 xl:col-12">
                <Paginator v-model:first="first" :rows="10" :totalRecords="products.length/(pagesize/10)"></Paginator>
            </div>
        </div>
</template>
<script setup lang="ts">
import { ref} from 'vue';
import { useRouter } from 'vue-router';

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

    const products = ref<any[]>(props.allproducts)
    
    const filterproductname = ref<string>();

    const suggest = ref<any[]>([]);

    const search = (event) => {
        suggest.value = products.value.filter(x => {return x.description.toLowerCase().includes(event.query.toLowerCase())});
    }

    const imgroute = (id, sku, brand) => {
        console.log(import.meta.env.VITE_API_ROUTE+'Inventory/InventoryArticle/image/1_3M012_1')
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
</script>
<style>

</style>