<template>
 <div class="card">
    <div class="hidden sm:block">
        <div class="grid">
            <div class="col-5 flex align-content-center flex-wrap">
                <div class="bold-text-home md:text-2xl xl:text-6xl flex align-items-center justify-content-center w-full">Nosotros</div>
                <div class="bold-text md:text-6xl flex align-items-center justify-content-center w-full">
                    <img :src="'/src/images/villas_custom/IconoNosotros.jpg'" class="hidden md:block w-10rem"/>
                </div>
                    <span class="cyan-text-inicio md:text-sm xl:text-xl w-full">Comenzando en Ciudad de México y ahora expandiéndonos a Monterrey y a toda la república, somos una empresa mexicana líder en ventas de insumos dentales con <strong>más de 30 años de experiencia.</strong></span>
                    <br>
                    <span class="cyan-text-inicio md:text-sm xl:text-xl w-full">Nuestro propósito es brindar soluciones a los profesionistas de la industria dental, ofreciendo a nuestros clientes la mejor variedad y calidad en <strong>equipos y productos dentales.</strong></span>
                    <br>
                    <span class="cyan-text-inicio md:text-sm xl:text-xl w-full">Tenemos exclusivos proveedores internacionales en México.</span>
                    <br>
                    <span class="cyan-text-inicio md:text-sm xl:text-xl w-full">Nosotros somos <strong>Villa de Cortés Monterrey.</strong></span>
                </div>
            <div class="col-7">
                <BasicAboutCarusell />
            </div>
        </div>
    </div>
    <div class="block sm:hidden">
        <div class="grid">
            <div class="col-12 flex align-content-center flex-wrap">
                <div class="bold-text-home md:text-2xl xl:text-6xl flex align-items-center justify-content-center w-full">Nosotros</div>
                <div class="bold-text md:text-6xl flex align-items-center justify-content-center w-full">
                    <img :src="'/src/images/villas_custom/IconoNosotros.jpg'" class="w-10rem"/>
                </div>
                    <span class="cyan-text-inicio md:text-sm xl:text-xl w-full">Comenzando en Ciudad de México y ahora expandiéndonos a Monterrey y a toda la república, somos una empresa mexicana líder en ventas de insumos dentales con <strong>más de 30 años de experiencia.</strong></span>
                    <br>
                    <span class="cyan-text-inicio md:text-sm xl:text-xl w-full">Nuestro propósito es brindar soluciones a los profesionistas de la industria dental, ofreciendo a nuestros clientes la mejor variedad y calidad en <strong>equipos y productos dentales.</strong></span>
                    <br>
                    <span class="cyan-text-inicio md:text-sm xl:text-xl w-full">Tenemos exclusivos proveedores internacionales en México.</span>
                    <br>
                    <span class="cyan-text-inicio md:text-sm xl:text-xl w-full">Nosotros somos <strong>Villa de Cortés Monterrey.</strong></span>
                </div>
            <div class="col-12">
                <BasicAboutCarusell />
            </div>
        </div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import BasicAboutCarusell from '../../components/general/BasicAboutCarusell.vue'
</script>

<style>
.bold-text-home {
    font-weight:800;
    font-size:1cm;
    font-family: Poppins;
    color: #1B2955;
    line-height: 150%; /* Altura de línea específica */
}
.cyan-text-home {
  color: #11BACC;
  font-size:450%;
  font-family: 'Poppins', sans-serif;
  text-align: justify; /* Justifica el texto */
  line-height: 150%; /* Altura de línea específica */
  font-weight:900;
}
.cyan-text-inicio {
  color: #11BACC;
  font-size:100%;
  font-family: Poppins;
  text-align: center; /* Justifica el texto */
  line-height: 200%; /* Altura de línea específica */
}

</style>