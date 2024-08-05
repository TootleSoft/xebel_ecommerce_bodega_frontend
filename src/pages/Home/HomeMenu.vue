<template>
    <div class="card">
        <div class="container">
            <div class="left-block">
                <div class="bold-text md:text-8xl">Descubre</div>
                <div class="bold-text md:text-8xl">nuestros</div>
                <div class="cyan-text md:text-8xl">increibles</div>
                <div class="cyan-text md:text-8xl">productos</div>
                <br>
                <span class="cyan-text2">Descubre la unica variedad de marcas y productos que <strong>Villa de Cortes Monterrey</strong>
                    tiene
                    para ti</span>
                <div class="col-8">
                    <Button ref="mlogin" @click="tlogin" label="Registrate para comprar" class="button"
                        rounded></Button>
                </div>
            </div>
            <div class="right-block">
                <BasicImageCarusell />
            </div>
        </div>

        <div class="flex justify-content-center flex-wrap">
            <div class="flex align-items-center justify-content-center w-16rem m-2 cyan-text xl:text-7xl font-bold">
                Nuestras</div>
            <div class="flex align-items-center justify-content-center w-15rem m-2 xl:text-7xl font-bold" style="color: #1B2955;">marcas</div>
            <!-- <div class="cyan-text xl:text-7xl flex align-items-center justify-content-center w-4rem h-4rem">Nuestras</div>
            <div class="bold-text xl:text-7xl flex align-items-center justify-content-center w-4rem h-4rem">marcas</div> -->
        </div>
        <BasicProductCarusell />
        
        <div class="flex justify-content-center flex-wrap">
            <div class="flex align-items-center justify-content-center w-25rem m-2 cyan-text xl:text-7xl font-bold">
                Promociones</div>
            <div class="flex align-items-center justify-content-center w-13rem m-2 xl:text-7xl font-bold" style="color: #1B2955;">para ti</div>
        </div>
        <BasicBundleCarusell />

        <div class="flex justify-content-center flex-wrap">
            <div class="flex align-items-center justify-content-center w-13rem m-2 cyan-text xl:text-7xl font-bold">
                Ofertas</div>
            <div class="flex align-items-center justify-content-center w-13rem m-2 xl:text-7xl font-bold" style="color: #1B2955;">para ti</div>
        </div>
        <BasicOffertsCarusell />


        <div class="centered-text">
            <p class="flex align-items-center justify-content-center w-20rem m-2 cyan-text xl:text-7xl font-bold">¿Quienes</p>
            <p class="flex align-items-center justify-content-center w-13rem m-2 xl:text-7xl font-bold" style="color: #1B2955;">somos?</p>
        </div>
        <div class="container">
            <div class="left-block2">
                <BasicImageCarusell2 />
            </div>
            <div class="right-block">
                <p class="bold-text xl:text-8xl font-bold-800 text-left">Más de 30 años a tu</p>
                <p class="cyan-text xl:text-8xl text-left">servicio.</p>
                <p class="cyan-text3 xl:text-2xl text-left"> De <strong>Ciudad de México a Monterrey</strong>, llevamos
                    más de 30 años brindando soluciones a los
                    profesionistas de la industria dental. </p>
                    <br>
                <p class="cyan-text3 xl:text-2xl text-left">En <strong>Villa de Cortés Monterrey</strong> somos una
                    empresa mexicana líder en venta de insumos
                    dentales y ofreciéndote la mejor calidad y
                    proveedores del mercado. </p>
            </div>
        </div>
        <footer class="flex flex-row footer">
                <div class="footer-content">
                    <div class="footer-column">
                        <h3 class="font-bold-800 xl:text-4xl">Contacto</h3>
                        <p class="font-bold xl:text-2xl"> (81) 2948-6399</p>
                        <p class="line-height-1 w-15">Eduardo Aguirre Pequeño</p>
                        <p class="line-height-1 w-15">1302, Mitras Centro, Monterrey,</p>
                        <p class="line-height-1 w-15">Nuevo Léon, México. CP. 64460</p>
                        <span class="social-icons">
                            <a href="https://www.facebook.com/villadcmty" target="_blank" class="social-icon">
                                <i class="pi pi-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com/villadcmty" target="_blank" class="social-icon">
                                <i class="pi pi-instagram"></i>
                            </a>
                        </span>
                    </div>
                    <div class="footer-column">
                        <h3 class="font-bold-800 xl:text-4xl">Villa de Cortés Monterrey</h3>
                        <ul>
                            <li>Inicio</li>
                            <li>Nuestras marcas</li>
                            <li>Promociones para ti</li>
                            <li>¿Quienes somos?</li>
                            <li>Lo más buscado</li>
                        </ul>
                        <div class="flex align-items-center justify-content-center">
                            <p>Equipos Dentales Villa de Cortés Monterrey 2024 © All rights reserved.</p>
                        </div>
                    </div>
                    <div class="footer-column">
                        <h3 class="font-bold-800 xl:text-4xl">Tienda</h3>
                        <p class="line-height-1 w-15">Equipos Dentales</p>
                        <p class="line-height-1 w-15">Instrumental</p>
                        <p class="line-height-1 w-15">Laboratorio</p>
                        <p class="line-height-1 w-15">Ortodoncia</p>
                        <p class="line-height-1 w-15">Unidades</p>
                        <p class="line-height-1 w-15">Uniformes</p>
                        <p class="line-height-1 w-15">Otros</p>
                    </div>
                </div>
            </footer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BasicProductGrid from '../../components/general/BasicProductGrid.vue';
import BasicProductCarusell from '../../components/general/BasicProductCarusell.vue'
import BasicImageCarusell from '../../components/general/BasicImageCarusell.vue'
import BasicImageCarusell2 from '../../components/general/BasicImageCarusell2.vue'
import BasicBundleCarusell from '../../components/general/BasicBundleCarusell.vue';
import BasicOffertsCarusell from '../../components/general/BasicOffertsCarusell.vue';
import axios from 'axios';
import {OrderData} from '../Cart/Function/OrderData';
import { useCartStore } from '../../stores/cart';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const products = ref<any[]>([]);
const entity = new OrderData();
const cartStore = useCartStore();
const mlogin = ref();
const router = useRouter();
const auth = useAuthStore();



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
    if(!auth.id_usuario){
        router.push('/auth/singin')
    }
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
  color: #11BACC;
  font-size:450%;
  font-family: 'Poppins', sans-serif;
  text-align: justify; /* Justifica el texto */
  line-height: 2cm; /* Altura de línea específica */
  font-weight:900;
}
.cyan-text2 {
  color: #11BACC;
  font-size:150%;
  font-family: Poppins;
  text-align: justify; /* Justifica el texto */
  line-height: 1.1cm; /* Altura de línea específica */
}
.cyan-text3 {
  color: #11BACC;
  font-size:50px;
  font-family: Poppins;
  text-align: justify; /* Justifica el texto */
  line-height: 0.8cm; /* Altura de línea específica */
}
.container {
    display: flex;
    justify-content: space-between; /* Espacio entre los dos bloques */
    align-items: center; /* Alinea verticalmente al centro */
}

.left-block, .left-block2, .right-block, .right-block2 {
    text-align: left;
    width: 100%; /* Por defecto, los bloques ocupan el 100% del ancho en pantallas pequeñas */
}

/* Media query para pantallas medianas (tablets) */
@media (min-width: 768px) {
    .left-block {
        width: 60%; /* Ajusta el ancho según sea necesario */
        text-align: left;
    }
    .left-block2 {
        width: 57%; /* Ajusta el ancho según sea necesario */
        text-align: left;
    }
    .right-block {
        width: 57%; /* Ajusta el ancho según sea necesario */
        text-align: right;
    }
    .right-block2 {
        width: 30%; /* Ajusta el ancho según sea necesario */
        text-align: right;
    }
}

/* Media query para pantallas grandes (desktops) */
@media (min-width: 1024px) {
    .left-block {
        width: 60%; /* Ajusta el ancho según sea necesario */
        text-align: left;
    }
    .left-block2 {
        width: 57%; /* Ajusta el ancho según sea necesario */
        text-align: left;
    }
    .right-block {
        width: 57%; /* Ajusta el ancho según sea necesario */
        text-align: right;
    }
    .right-block2 {
        width: 30%; /* Ajusta el ancho según sea necesario */
        text-align: right;
    }
}


.bold-text {
    font-weight:800;
    font-size:1cm;
    font-family: Poppins;
    color: #1B2955;
    line-height: 2.1cm; /* Altura de línea específica */
}



.centered-text {
  display:flex;
  justify-content: center;
}
.button {
	background:linear-gradient(to right, #1a17a6 5%, #11BACC 90%);
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
.footer {
  background-image: url('/public/demo/images/pages/fondo dental-01.jpg');
  background-size: cover;
  background-position: center;
  padding: 50px 20px; /* Reducir padding en pantallas pequeñas */
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column; /* Cambiar a columna para centrar verticalmente en pantallas pequeñas */
  align-items: center; /* Center horizontally */
  text-align: center; /* Center text within each column */
  width: 100vw;
}

.footer-content {
  display: flex;
  flex-direction: row; /* Mantener filas en pantallas grandes */
  justify-content: space-around; /* Space columns evenly */
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap; /* Permitir que las columnas se ajusten en varias líneas en pantallas pequeñas */
}

.footer-column {
  flex: 1;
  padding: 15px;
  min-width: 200px; /* Asegurar un ancho mínimo para columnas */
}

.footer-column h3 {
  margin-top: 0;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column ul li {
  margin-bottom: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.social-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Espacio entre los íconos */
}

.social-icons i {
  font-size: 2rem; /* Tamaño de los íconos */
  color: #ffffff; /* Color de los íconos */
}

.footer-legend {
  text-align: center;
  padding: 5px;
  color: white; /* Color del texto */
  width: 100%;
  margin-top: 20px; /* Espacio en la parte superior */
}

@media (max-width: 768px) {
  .footer {
    padding: 20px; /* Reducir padding en pantallas pequeñas */
  }

  .footer-content {
    flex-direction: column; /* Cambiar a columna en pantallas pequeñas */
    align-items: center; /* Alinear columnas en el centro */
  }

  .footer-column {
    margin: 10px 0;
    width: 100%; /* Asegurar que las columnas ocupen todo el ancho */
  }

  .social-icons i {
    font-size: 1.5rem; /* Reducir tamaño de los íconos en pantallas pequeñas */
  }
}

@font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    src: local('Poppins Regular'), local('Poppins-Regular'),
        url('/src/assets/layout/fonts/poppins-v20-latin-regular.woff2') format('woff2'),
        url('/src/assets/layout/fonts/poppins-v20-latin-regular.woff') format('woff');
}

@font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    src: local('Poppins Bold'), local('Poppins-Bold'),
        url('/src/assets/layout/fonts/poppins-v20-latin-700.woff2') format('woff2'),
        url('/src/assets/layout/fonts/poppins-v20-latin-700.woff') format('woff');
}

</style>
