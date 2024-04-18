<template>
    <div class="card">
        <Carousel :value="products" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions" circular :autoplayInterval="5000">
            <template #item="slotProps">
                <div class="border-1 surface-border border-round m-2  p-3">
                    <div class="mb-3">
                        <div class="relative mx-auto">
                            <img :src="imgroute(slotProps.data.id)" class="w-full h-19rem"/>
                        </div>
                    </div>
                    <!-- <div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
                    <div class="flex justify-content-between align-items-center">
                        <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
                        <span>
                            <Button icon="pi pi-heart" severity="secondary" outlined />
                            <Button icon="pi pi-shopping-cart" class="ml-2"/>
                        </span>
                    </div> -->
                    <div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

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

        return import.meta.env.VITE_API_ROUTE+'Inventory/Brand/image/'+id;
    }

onMounted(async () => {
    await refresh();
})

</script>