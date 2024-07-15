<template>
            <div class="card">
        <Carousel :value="products" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions" circular :autoplayInterval="5000">
            <template #item="slotProps">
                <div class="surface-border border-round m-2 p-3">
                    <div class="mb-3">
                        <div class="relative mx-auto">
                            <img :src="imgroute(slotProps.data.id)" class="h-9rem"  @click="router.push(slotProps.data.path)"/>
                        </div>
                    </div>
                    <div class="flex align-items-center cursor-pointer px-3 py-2 overflow-hidden relative font-semibold text-lg uppercase">{{ slotProps.data.name }}</div>
                </div>
            </template>
        </Carousel>
    </div>
</template>
    
<script setup lang='ts'>
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
    let response = await axios.get('Inventory/EComerce/bundles')

    products.value = response.data; 
}

const imgroute = (id) => {

    // return import.meta.env.VITE_API_ROUTE+'Inventory/Brand/image/'+id+"/"+new Date();
    }

onMounted(async () => {
    await refresh();
})
</script>
    
<style>
    
</style>