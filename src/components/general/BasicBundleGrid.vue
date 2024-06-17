<template>
    <div class="grid -mt-3 -ml-3 -mr-3">
        <div class="col-12">
            <div class="grid formgrid p-fluid">
                <div class="field col-12 sm:col-12 md:col-8 xl:col-8"></div>
                <div class="field col-12 sm:col-12 md:col-4 xl:col-4">
                    <FloatLabel>
                        <AutoComplete v-model="filterproductname" @item-select="selectSuggestion" inputId="filter"
                            optionLabel="name" :suggestions="suggest" @complete="search"
                            v-on:keyup.enter="filteredsearch(filterproductname)">
                        </AutoComplete>
                        <label for="filter">
                            <i class="pi pi-filter"></i> Búsqueda Filtrada en {{ pagetitle }}
                        </label>
                    </FloatLabel>
                </div>
            </div>
        </div>
        <div v-for="(product, i) in products.slice(first / 10 * pagesize, first / 10 * pagesize + pagesize)" :key="i"
            class="col-12 md:col-5 lg:col-3 mb-5 lg:mb-0">
            <div class="mb-3 relative">
                <img :src="imgRoute(product.id)" class="w-full h-auto border-3 border-500" :alt="String(i)" @click="router.push('/bundle/'+ product.id)" />
                <Button type="button"
                    class="border-1 border-white border-round py-2 px-3 absolute bg-black-alpha-30 text-white inline-flex align-items-center justify-content-center hover:bg-black-alpha-40 transition-colors transition-duration-300 cursor-pointer"
                    :style="{ bottom: '1rem', left: '1rem', width: 'calc(100% - 2rem)' }">
                    <i class="pi pi-shopping-cart mr-3 text-base"></i>
                    <span class="text-base">Agregar al carrito</span>
                </Button>
            </div>
            <div class="flex flex-column align-items-center">
                <span class="text-l text-900 font-bold mb-3">{{ product.name }}</span>
                <span class="text-l text-900 mb-3">{{ "$" + product.total.toFixed(2)}}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface Props {
    allproducts?: any[];
    pagesize?: number;
    pagetitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
    allproducts: () => [],
    pagesize: 40,
    pagetitle: '',
})

const products = ref<any[]>(props.allproducts)
const filterproductname = ref<string>();

const selectSuggestion = (payload) => {
    console.log(JSON.stringify(payload))
    filterproductname.value = payload.value.name;
}

const suggest = ref<any[]>([]);

const router = useRouter();
const first = ref<number>(0);

const search = (event) => {
    suggest.value = products.value.filter(x => { return (x.name || '').toLowerCase().includes((event.query || '').toLowerCase()) });
}

const filteredsearch = (newValue) => {
    console.log(JSON.stringify(newValue))
    if (newValue == '') {
        products.value = props.allproducts;
    }
    else {
        products.value = props.allproducts;
        products.value = products.value.filter(x => { return x.name.toLowerCase().includes(newValue.toLowerCase()) })
    }
}

const imgRoute = (id) => {
    return import.meta.env.VITE_API_ROUTE + 'Inventory/Promotions/image/' + id;
}
</script>