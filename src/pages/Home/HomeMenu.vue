<template>
    <div class="card">
        <div class="container">
            <div class="left-block">
                <div class="bold-text md:text-8xl">Descubre</div>
                <div class="bold-text md:text-8xl">nuestros</div>
                <div class="cyan-text md:text-8xl">increibles</div>
                <div class="cyan-text md:text-8xl">productos</div>
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
                <BasicImageCarusell />
            </div>
        </div>

        <div class="flex justify-content-center flex-wrap">
            <div class="flex align-items-center justify-content-center w-15rem m-2 text-cyan-700 xl:text-7xl font-bold">
                Nuestras</div>
            <div class="flex align-items-center justify-content-center w-15rem m-2 xl:text-7xl font-bold">marcas</div>
            <!-- <div class="cyan-text xl:text-7xl flex align-items-center justify-content-center w-4rem h-4rem">Nuestras</div>
            <div class="bold-text xl:text-7xl flex align-items-center justify-content-center w-4rem h-4rem">marcas</div> -->
        </div>
        <BasicProductCarusell />
        
        <div class="flex justify-content-center flex-wrap">
            <div class="flex align-items-center justify-content-center w-24rem m-2 text-cyan-700 xl:text-7xl font-bold">
                Promociones</div>
            <div class="flex align-items-center justify-content-center w-13rem m-2 xl:text-7xl font-bold">para ti</div>
        </div>
        <BasicBundleCarusell />

        <div class="flex justify-content-center flex-wrap">
            <div class="flex align-items-center justify-content-center w-12rem m-2 text-cyan-700 xl:text-7xl font-bold">
                Ofertas</div>
            <div class="flex align-items-center justify-content-center w-13rem m-2 xl:text-7xl font-bold">para ti</div>
        </div>
        <BasicOffertsCarusell />


        <div class="centered-text">
            <p class="flex align-items-center justify-content-center w-20rem m-2 text-cyan-700 xl:text-7xl font-bold">¿Quienes</p>
            <p class="flex align-items-center justify-content-center w-13rem m-2 xl:text-7xl font-bold">somos?</p>
        </div>
        <div class="container">
            <div class="left-block">
                <BasicImageCarusell />
            </div>
            <div class="right-block">
                <p class="bold-text xl:text-8xl font-bold-800 text-left">Más de 30 años a tu</p>
                <p class="cyan-text xl:text-8xl text-left">servicio.</p>
                <p class="cyan-text2 xl:text-4xl text-left"> De Ciudad de México a Monterrey, llevamos
                    más de 30 años brindando soluciones a los
                    profesionistas de la industria dental. </p>
                <p class="cyan-text2 xl:text-4xl text-left">En Villa de Cortés Monterrey somos una
                    empresa mexicana líder en venta de insumos
                    dentales y ofreciéndote la mejor calidad y
                    proveedores del mercado. </p>
            </div>
        </div>
        <footer class="footer">
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
  color: rgb(19, 224, 228);
  font-size:450%;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: justify; /* Justifica el texto */
  line-height: 2cm; /* Altura de línea específica */
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
    width: 70%; /* Ajusta el ancho según sea necesario */
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
.footer {
  background-image: url('/public/demo/images/pages/fondo dental-01.jpg');
  background-size: cover;
  background-position: center;
  padding: 100px;
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  text-align: center; /* Center text within each column */
  height: 300px; /* Set the height as needed */
  width: 93vw;
}

.footer-content {
  display: flex;
  justify-content: space-around; /* Space columns evenly */
  width: 100%;
  max-width: 1200px;
}

.footer-column {
  flex: 1;
  padding: 15px;
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
  font-family:Verdana, Geneva, Tahoma, sans-serif;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Para centrar verticalmente en la pantalla completa */
}

.social-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Espacio entre los íconos */
}

.social-icons i {
  font-size: 2rem; /* Tamaño de los íconos */
  color: #ffffff; /* Color de los íconos de Facebook */
}.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Para centrar verticalmente en la pantalla completa */
}

.social-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Espacio entre los íconos */
}

.social-icons i {
  font-size: 2rem; /* Tamaño de los íconos */
  color: #ffffff; /* Color de los íconos de Facebook */
}
.footer-legend {
  text-align: center;
  padding: 5px;
  color: white; /* Color del texto */
}
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }

  .footer-column {
    margin: 10px 0;
  }
}
</style>
