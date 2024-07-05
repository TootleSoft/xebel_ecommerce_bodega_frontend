<template>
    <div class="card">
        <div class="container">
            <div class="left-block">
                <p class="cyan-text">Descubre nuestros increibles productos</p>
                <span class="bold-text">Descubre la unica variedad de marcas y productos que Villa de Cortes Monterrey
                    tiene
                    para ti</span>
                <div class="col-8">
                    <Button @click="" label="Registrate para comprar" class="button" rounded></Button>
                </div>
            </div>
            <div class="right-block">
                <img src="" alt="" srcset="">
                <BasicProductCarusell />
            </div>
        </div>

        <div class="centered-text">
            <div class="text-900 font-medium text-4xl mb-4">
                <p class="bold-text">Nuestras</p><span class="bold-text">Marcas</span>
            </div>
        </div>
        <BasicProductCarusell />
    </div>

    <div class="card">
        <div class="text-900 font-medium text-4xl mb-4">Marcas</div>
        <BasicProductCarusell />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BasicProductGrid from '../../components/general/BasicProductGrid.vue';
import BasicProductCarusell from '../../components/general/BasicProductCarusell.vue'
import axios from 'axios';
import {OrderData} from '../Cart/Function/OrderData';
import { useCartStore } from '../../stores/cart';

const products = ref<any[]>([]);
const entity = new OrderData();
const cartStore = useCartStore();


const refresh = async () => {
    try{
        // let response = await axios.get('Inventory/EComerce/articles_ecomerce', {
        //     headers: {
        //         customer_id: "",
        //     }
        // })
        // products.value = response.data; 
        // console.log(JSON.stringify(products.value.length))
        if(cartStore.order.length == 1)
            await entity.newOrder();
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
<style lang="scss" scoped>
    p {
  color: rgb(19, 224, 228);
  font-size: xx-large;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.container {
    display: flex;
    justify-content: space-between; /* Espacio entre los dos bloques */
    align-items: center; /* Alinea verticalmente al centro */
}

.left-block {
    text-align: left;
    width: 40%; /* Ajusta el ancho según sea necesario */
}

.right-block {
    text-align: right;
    width: 60%; /* Ajusta el ancho según sea necesario */
}

.bold-text {
    font-weight: bold;
    font-size: xx-large;
    color: #061171;
    text-align: justify; /* Justifica el texto */
}



.centered-text {
  display: flex;
  justify-content: center;
}
.button {
	background:linear-gradient(to bottom, #1a17a6 5%, #2c68bd 100%);
	background-color:#1a17a6;
	border-radius:28px;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:17px;
	padding:16px 31px;
	text-decoration:none;
	text-shadow:0px 1px 16px #2f6627;
}
.button:hover {
	background:linear-gradient(to bottom, #2c68bd 5%, #1a17a6 100%);
	background-color:#2c68bd;
}
.button:active {
	position:relative;
	top:1px;
}
</style>
