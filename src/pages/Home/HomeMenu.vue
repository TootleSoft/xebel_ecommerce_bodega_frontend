<template>
    <div class="card">
        <div class="text-900 font-medium text-4xl mb-4">Popular Products</div>
        <p class="mt-0 p-0 mb-5 text-700 text-2xl">Exclusive Selection</p>
        <BasicProductCarusell/>
    </div>

    <div class="card">
        <BasicProductCarusell/>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BasicProductGrid from '../../components/general/BasicProductGrid.vue';
import BasicProductCarusell from '../../components/general/BasicProductCarusell.vue'
import axios from 'axios';

const products = ref<any[]>([]);

const refresh = async () => {
    try{
        let response = await axios.get('Inventory/EComerce/articles_ecomerce', {
            headers: {
                customer_id: "",
            }
        })
        products.value = response.data; 
        console.log(JSON.stringify(products.value.length))
    }catch {
        console.log("No se cargaron los datos")
    }
}

onMounted(async () => {
    await refresh();
});

const products2 = ref([
    {
        color: 'Bluegray',
        image: '/demo/images/ecommerce/product-list/product-list-2-1.png'
    },
    {
        color: 'Indigo',
        image: '/demo/images/ecommerce/product-list/product-list-2-2.png'
    },
    {
        color: 'Purple',
        image: '/demo/images/ecommerce/product-list/product-list-2-3.png'
    },
    {
        color: 'Cyan',
        image: '/demo/images/ecommerce/product-list/product-list-2-4.png'
    },
    {
        color: 'Bluegray',
        image: '/demo/images/ecommerce/product-list/product-list-2-1.png'
    },
    {
        color: 'Indigo',
        image: '/demo/images/ecommerce/product-list/product-list-2-2.png'
    },
    {
        color: 'Purple',
        image: '/demo/images/ecommerce/product-list/product-list-2-3.png'
    },
    {
        color: 'Cyan',
        image: '/demo/images/ecommerce/product-list/product-list-2-4.png'
    },
    {
        color: 'Bluegray',
        image: '/demo/images/ecommerce/product-list/product-list-2-1.png'
    },
    {
        color: 'Indigo',
        image: '/demo/images/ecommerce/product-list/product-list-2-2.png'
    },
    {
        color: 'Purple',
        image: '/demo/images/ecommerce/product-list/product-list-2-3.png'
    },
    {
        color: 'Cyan',
        image: '/demo/images/ecommerce/product-list/product-list-2-4.png'
    }
]);


</script>
