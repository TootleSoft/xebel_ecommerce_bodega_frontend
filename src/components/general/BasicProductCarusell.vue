<template>
    <div class="card">
        <div class="col-12">
            <div class="grid -mt-3 -ml-3 -mr-3 col-12">
                <div v-for="(product, i) in products" :key="i" class="col-12 md:col-5 lg:col-2 mb-5 lg:mb-0">
                    <img :src="imgroute(product.id)" class="w-full h-7rem"  @click="router.push(product.path)"/>
                </div>
            </div>
        </div>
        <!-- <Carousel :value="products" :numVisible="6" :numScroll="4"  >
            <template #item="slotProps" class="col-12">
                <div class="border border-surface-200 dark:border-surface-700 rounded m-2  p-4">
                    <div class="mb-3">
                        <div class="relative mx-auto">
                            <img :src="imgroute(slotProps.data.id)" class=" w-full h-full"  @click="router.push(slotProps.data.path)"/>
                        </div>
                    </div>
                    <div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
                    <div class="flex justify-content-between align-items-center">
                        <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
                        <span>
                            <Button icon="pi pi-heart" severity="secondary" outlined />
                            <Button icon="pi pi-shopping-cart" class="ml-2"/>
                        </span>
                    </div>
                    <div class="flex align-items-center cursor-pointer px-3 py-2 overflow-hidden relative font-semibold text-lg uppercase">{{ slotProps.data.name }}</div>
                </div>
            </template>
        </Carousel> -->
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import axios from "axios";


const router = useRouter();
const products = ref<any[]>([]);
const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

const refresh = async () =>{
    let response = await axios.get('Inventory/EComerce/getTopBrands')

    products.value = response.data; 
}

const imgroute = (id) => {

        return import.meta.env.VITE_API_ROUTE+'Inventory/Brand/image/'+id+"/"+new Date();
    }

onMounted(async () => {
    await refresh();
})

</script>