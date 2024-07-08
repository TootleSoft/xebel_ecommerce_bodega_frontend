<template>
    <div class="card">
        <div class="container">
            <div class="left-block">
                <p class="bold-text text-8xl">Descubre</p>
                <p class="bold-text text-8xl">nuestros</p>
                <p class="cyan-text">increibles</p>
                <p class="cyan-text">productos</p>
                <br>
                <span class="cyan-text2">Descubre la unica variedad de marcas y productos que Villa de Cortes Monterrey
                    tiene
                    para ti</span>
                <div class="col-8">
                    <Button ref="mlogin" @click="tlogin" label="Registrate para comprar" class="button"
                        rounded></Button>
                </div>
            </div>
            <div class="right-block">
                <BasicProductCarusell />
            </div>
        </div>

        <div class="centered-text">
            <p class="cyan-text">Nuestras</p>
            <p class="bold-text text-7xl">marcas</p>
        </div>
        <BasicProductCarusell />
    </div>

    <div class="card">
        <div class="centered-text">
            <p class="cyan-text">Promociones</p>
            <p class="bold-text text-7xl">para ti</p>
        </div>
        <BasicProductCarusell />
    </div>
    <div class="card">
        <div class="centered-text">
            <p class="cyan-text">¿Quienes</p>
            <p class="bold-text text-7xl">somos?</p>
        </div>
        <div class="container">
            <div class="left-block">
                <BasicProductCarusell />
            </div>
            <div class="right-block">
                <p class="bold-text text-7xl">Más de 30 años a tu</p>
                <p class="cyan-text text-6xl">servicio</p>
                <p class="cyan-text text-4xl"> De Ciudad de México a Monterrey, llevamos
                    más de 30 años brindando soluciones a los
                    profesionistas de la industria dental. </p>
            </div>
        </div>
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
const mlogin = ref();



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

const tlogin = (event) => {
    mlogin.value.toggle(event);
};

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
.cyan-text {
  color: rgb(19, 224, 228);
  font-size:450%;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: justify; /* Justifica el texto */
  line-height: 1cm; /* Altura de línea específica */
  font-weight:900;
}
.cyan-text2 {
  color: rgb(19, 224, 228);
  font-size:300%;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: justify; /* Justifica el texto */
  line-height: 100%; /* Altura de línea específica */
}
.container {
    display: flex;
    justify-content: space-between; /* Espacio entre los dos bloques */
    align-items: center; /* Alinea verticalmente al centro */
}

.left-block {
    text-align: left;
    width: 60%; /* Ajusta el ancho según sea necesario */
}

.right-block {
    text-align:right;
    width: 40%; /* Ajusta el ancho según sea necesario */
}
.right-block2 {
    text-align:right;
    width: 30%; /* Ajusta el ancho según sea necesario */
}

.bold-text {
    font-weight:800;
    font-size:1cm;
    color: #061171;
    line-height: 2cm; /* Altura de línea específica */
}



.centered-text {
  display:flex;
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
