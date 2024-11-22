<template>
    <div class="card">
        <div class="hidden sm:block">
            <div class="grid">
                <div class="col-6 flex align-content-center flex-wrap" style="padding: 0px ">


<div class="col-12 flex justify-content-center" style="padding-top: 0px;">
  <div class="text-container">
        <!--Los textos principales-->
        <div class="bold-text-home text-center md:text-4xl xl:text-6xl flex-wrap justify-center">
            <div class="w-full md:text-7xl xl:text-8xl" style="text-align: left; font-family: Montbold;">Descubre</div>
            <div class="w-full md:text-7xl xl:text-8xl" style="text-align: left; font-family: Montbold;">nuestros</div>
            <div class="w-full md:text-7xl xl:text-8xl" style="text-align: left; color: #11bacc !important; font-family: Montbold;">increíbles</div>
            <div class="w-full md:text-7xl xl:text-8xl" style="text-align: left; color: #11bacc !important; font-family: Montbold;">productos.</div>
        </div>
        <!--La descripción adicional-->
        <div class="container-cyan-text-inicio">
            <span class="cyan-text-inicio text-center md:text-sm xl:text-2xl w-full">Descubre la única variedad de marcas y </span>
            <span class="cyan-text-inicio text-center md:text-sm xl:text-2xl w-full">productos que <strong>Villa de Cortés Monterrey </strong></span>
            <span class="cyan-text-inicio text-center md:text-sm xl:text-2xl w-full">tiene para ti.</span>
        </div>
        <br>
    <div class="w-full flex justify-center items-center">
        <Button ref="mlogin" @click="tlogin" label="Registrate para comprar" class="button" rounded></Button>
    </div>
  </div>
</div>
                            <div v-if="auth.id_usuario == undefined"
                                class="w-full flex align-items-center justify-content-center">
                                <Button ref="mlogin" @click="tlogin" label="Registrate para comprar" class="button"
                                    rounded></Button>
                            </div>


                </div>
                <div class="col-6" >
                    <BasicImageCarusell class="image-with-shadow" />
                </div>
            </div>
        </div>
        <div class="block sm:hidden grid formgrid p-fluid">
            <div class="col-12 flex align-items-center justify-content-center cyan-text text-sm h-2rem">
                Bienvenido a Villa de Cortés Monterrey
            </div>
            <!-- <div class="col-12 flex align-items-center justify-content-center bold-text text-lg h-2rem">
                Descubre nuestros increíbles productos
            </div> -->
        </div>
        <!-- <div class="block sm:hidden full-width-sm-index">
            <div class="p-3 flex justify-content-center align-items-center flex-wrap">
                <div class="justify-content-center align-items-center flex">
                    <span class="w-full text-sm">
                        <i class="pi pi-box"></i>
                        Recuerda que tenemos envíos a todo México
                    </span>
                </div>
            </div>
        </div> -->
        <div class="hidden sm:block">
            <div class="flex justify-content-center flex-wrap">
                <div class="flex align-items-center justify-content-center w-16rem m-2 cyan-text md:text-7xl xl:text-7xl font-bold" style="font-family: Montbold;">
                    Nuestras</div> 
                <div class="flex align-items-center justify-content-center w-18rem m-2 md:text-7xl xl:text-7xl font-bold" style="color: #1B2955; font-family: 'Montbold'">marcas</div>
                <!-- <div class="cyan-text xl:text-7xl flex align-items-center justify-content-center w-4rem h-4rem">Nuestras</div>
                <div class="bold-text xl:text-7xl flex align-items-center justify-content-center w-4rem h-4rem">marcas</div> -->
            </div>
            <BasicProductCarusell />
        </div>

        <div class="hidden sm:block">
            <div class="flex justify-content-center flex-wrap">
                <div class="flex align-items-center justify-content-center w-25rem m-2 cyan-text md:text-7xl xl:text-7xl font-bold" style="font-family: 'Montbold';">
                    Promociones</div> 
                <div class="flex align-items-center justify-content-center w-15rem m-2 md:text-7xl xl:text-7xl font-bold" style="color: #1B2955; font-family: 'Montbold'">para ti</div>
            </div>
        </div>
        <div class="block sm:hidden">
            <div class="flex justify-content-center align-items-center flex-wrap">
                <div class="flex align-items-center justify-content-center w-15rem m-2 cyan-text text-5xl font-bold" style="font-family: 'Montbold';">
                    Promociones</div> 
                <div class="flex align-items-center justify-content-center w-10rem m-2 text-5xl font-bold" style="color: #1B2955; font-family: 'Montbold'">para ti</div>
            </div>
        </div>
        <div class="full-screen-container">
            <BasicBundleCarusell />
        </div>
        

        <div class="hidden sm:block">
            <div class="flex justify-content-center flex-wrap">
                <div class="flex align-items-center justify-content-center w-13rem m-2 cyan-text md:text-7xl xl:text-7xl font-bold" style="font-family: Montbold;">
                    Ofertas </div>
                <div class="flex align-items-center justify-content-center w-15rem m-2 md:text-6xl xl:text-7xl font-bold" style="color: #1B2955; font-family: Montbold"> para ti</div>
            </div>
        </div>
        <div class="block sm:hidden">
            <div class="flex align-items-center justify-content-center flex-wrap">
                <div class="flex align-items-center justify-content-center w-10rem m-2 cyan-text text-5xl font-bold" style="font-family: 'Montbold'">
                    Ofertas</div>
                <div class="flex align-items-center justify-content-center w-10rem m-2 text-5xl font-bold" style="color: #1B2955; font-family: 'Montbold'">para ti</div>
            </div>
        </div>
        <div class="col-12">

            <BasicOffertsCarusell />
        </div>

        <div class="block sm:hidden">
            <div class="flex align-items-center justify-content-center flex-wrap">
                <div class="flex align-items-center justify-content-center w-10rem m-2 cyan-text text-5xl font-bold">
                    Nuestras</div> 
                <div class="flex align-items-center justify-content-center w-10rem m-2 text-5xl font-bold" style="color: #1B2955;">marcas</div>
                <!-- <div class="cyan-text xl:text-7xl flex align-items-center justify-content-center w-4rem h-4rem">Nuestras</div>
                <div class="bold-text xl:text-7xl flex align-items-center justify-content-center w-4rem h-4rem">marcas</div> -->
            </div>
            <BasicProductCarusell />
        </div>

        <div class="hidden sm:block">
            <div class="flex justify-content-center flex-wrap">
                <p class="flex align-items-center justify-content-center w-20rem m-2 cyan-text md:text-7xl xl:text-7xl font-bold" style="font-family: 'Montbold'">¿Quiénes</p>
                <p class="flex align-items-center justify-content-center w-15rem m-2 md:text-7xl xl:text-7xl font-bold" style="color: #1B2955; font-family: 'Montbold'">somos?</p>
            </div>
        </div>
        <!-- <div class="container">
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
        </div> -->
        <div class="grid">
            <div class="col-6 hidden sm:block">
                <BasicImageCarusell2 />
            </div>
            <div class="col-6 hidden sm:block">
                <p class="bold-text xl:text-8xl font-bold-800 text-left" style="font-family: Montbold;">Más de 30 </p>
                <p class="bold-text xl:text-8xl font-bold-800 text-left" style="font-family: Montbold;">años a tu</p>
                
                <p class="cyan-text xl:text-8xl text-left" style="font-family: Montbold">servicio.</p>
                <br>
                <p class="cyan-text4 xl:text-2xl text-left" style="font-family: Montsemibold;"> De <strong>Ciudad de México a Monterrey</strong>, llevamos
                    más de 30 años brindando soluciones a los
                    profesionistas de la industria dental. </p>
                    <br>
                <p class="cyan-text4 xl:text-2xl text-left" style="font-family: Montsemibold;">En <strong>Villa de Cortés Monterrey</strong> somos una
                    empresa mexicana líder en venta de insumos
                    dentales y ofreciéndote la mejor calidad y
                    proveedores del mercado. </p>
            </div>
        </div>
        <footer id="finalcontacto" class="flex flex- footer justify-content-center align-items-center">
                <div class="footer-content">
                    <div class="footer-column">
                        <h3 class="font-bold-800 xl:text-4xl" style="font-family: 'Montbold';">Contacto</h3>
                        <p class="font-bold xl:text-2xl" style="font-family: 'Montsemibold';"> (81) 2948-6399</p>
                        <p class="line-height-1 w-15" style="font-family: 'Montserrat';">Eduardo Aguirre Pequeño</p>
                        <p class="line-height-1 w-15" style="font-family: 'Montserrat';">1302, Mitras Centro, Monterrey,</p>
                        <p class="line-height-1 w-15" style="font-family: 'Montserrat';">Nuevo Léon, México. CP. 64460</p>
                        <span class="social-icons">
                            <a href="https://www.facebook.com/villadcmty" target="_blank" class="social-icon">
                                <i class="pi pi-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com/villadcmty" target="_blank" class="social-icon">
                                <i class="pi pi-instagram"></i>
                            </a>
                        </span>
                    </div>
                    <div class="footer-column hidden sm:block">
                        <h3 class="font-bold-800 xl:text-4xl" style="font-family: 'Montbold';">Villa de Cortés Monterrey</h3>
                        <ul>
                            <li style="font-family: 'Montserrat';">Inicio</li>
                            <li style="font-family: 'Montserrat';">Nuestras marcas</li>
                            <li style="font-family: 'Montserrat';">Promociones para ti</li>
                            <li style="font-family: 'Montserrat';">¿Quiénes somos?</li>
                            <li style="font-family: 'Montserrat';">Lo más buscado</li>
                        </ul>
                        <div class="flex align-items-center justify-content-center">
                            <p style="font-family: 'Montserrat';">Equipos Dentales Villa de Cortés Monterrey 2024 © All rights reserved.</p>
                        </div>
                    </div>
                    <div class="footer-column hidden sm:block">
                        <h3 class="font-bold-800 xl:text-4xl" style="font-family: 'Montbold';">Tienda</h3>
                        <p class="line-height-1 w-15" style="font-family: 'Montserrat';">Equipos Dentales</p>
                        <p class="line-height-1 w-15" style="font-family: 'Montserrat';">Instrumental</p>
                        <p class="line-height-1 w-15" style="font-family: 'Montserrat';">Laboratorio</p>
                        <p class="line-height-1 w-15" style="font-family: 'Montserrat';">Ortodoncia</p>
                        <p class="line-height-1 w-15" style="font-family: 'Montserrat';">Unidades</p>
                        <p class="line-height-1 w-15" style="font-family: 'Montserrat';">Uniformes</p>
                        <p class="line-height-1 w-15" style="font-family: 'Montserrat';">Otros</p>
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
.full-screen-container {
  display: flex;
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: center;     /* Centra el contenido verticalmente */
  width: 100%;             /* Asegura que ocupe el 100% del ancho de la ventana */
}
.text-container {
    width: 50%;
    text-align: left;
    margin: 0 auto;
}
.image-with-shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    border-bottom: 1px solid rgba(0, 0, 0, 0.1); 
    border-radius: 40px !important; 
}
.cyan-text {
  color: #11BACC;
  font-size:450%;
  font-family: Montsemibold;
  text-align: justify; /* Justifica el texto */
  line-height: 2cm; /* Altura de línea específica */
  font-weight:800;
}
.cyan-text2 {
  color: #11BACC;
  font-size:150%;
  font-family: Montserrat;
  text-align: justify; /* Justifica el texto */
  line-height: 1.1cm; /* Altura de línea específica */
}
.cyan-text3 {
  color: #11BACC;
  font-size:50px;
  font-family: Montserrat;
  text-align: justify; /* Justifica el texto */
  line-height: 0.8cm; /* Altura de línea específica */
}
.cyan-text4 {
  color: #11BACC;
  font-size:200%;
  font-family: Montserrat;
  text-align: justify; /* Justifica el texto */
  line-height: 1.1cm; /* Altura de línea específica */
}
.cyan-text-inicio {
  color: #11BACC;
  font-size:100%;
  font-family: Montserrat;
  text-align: justify; /* Justifica el texto */
  line-height: 200%; /* Altura de línea específica */
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
    font-weight:400;
    font-size:1cm;
    font-family: Montsemibold;
    color: #1B2955;
    line-height: 2.1cm; /* Altura de línea específica */
}

.bold-text-home {
    font-weight:400;
    font-size:1cm;
    font-family: Montsemibold;
    color: #1B2955;
    line-height: 150%; /* Altura de línea específica */
    line-height: 6rem;
}

.cyan-text-home {
  color: #11BACC;
  font-size:450%;
  font-family: 'Montsemibold', sans-serif;
  text-align: justify; /* Justifica el texto */
  line-height: 150%; /* Altura de línea específica */
  font-weight:400;
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

.full-width-sm-index {
  width: 100vw; /* Viewport width, ensuring it spans the entire width of the screen */
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  box-sizing: border-box;
  background:linear-gradient(to right, #ffffff -20%, #11BACC 50%);
  color: #ffffff;
}
.full-width-carousel {
  width: 100vw; /* Viewport width, ensuring it spans the entire width of the screen */
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  box-sizing: border-box;
  background:linear-gradient(to right, #ffffff 20%, #11BACC 50%);
  color: #ffffff;
}

.font-size-max {
    font-size: 40px;
}

</style>
