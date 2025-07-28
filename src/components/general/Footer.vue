<template>
    <footer
        id="finalcontacto"
        class="w-full bg-gray-100 py-5 px-4 sm:px-8"
    >
        <div class="footer-content grid grid-cols-1 sm:grid-cols-3 gap-0 w-full">
            <!-- Columna: Contacto -->
            <div class="footer-column w-full text-center">
                <h3 class="font-bold xl:text-4xl" style="font-family: 'Montbold';">Contacto</h3>
                <p class="font-bold xl:text-2xl" style="font-family: 'Montsemibold';">(81) 1751 9358</p>
                <p class="leading-tight" style="font-family: 'Montserrat';">Lerma 2056</p>
                <p class="leading-tight" style="font-family: 'Montserrat';">Mitras Centro, 64460 Monterrey, N.L.</p>
                <p class="leading-tight" style="font-family: 'Montserrat';">México.</p>
                <div class="flex justify-center gap-4 mt-4 mb-4 items-center align-items-center justify-content-center">
                    <a
                        href="https://www.facebook.com/bodegaderemate"
                        target="_blank"
                        class="text-blue-600"
                    >
                        <i class="pi pi-facebook" style="font-size: 2rem;"></i>
                    </a>
                    <a
                        href="https://www.instagram.com/bodegaderemate"
                        target="_blank"
                        class="text-pink-500"
                    >
                        <i class="pi pi-instagram" style="font-size: 2rem"></i>
                    </a>
                </div>
            </div>

            <!-- Columna: Navegación -->
            <div class="footer-column hidden sm:block w-full text-center">
                <h3 class="font-bold xl:text-4xl" style="font-family: 'Montbold';">Bodega de Remate</h3>
                <ul class="p-2 list-none">
                    <li style="font-family: 'Montserrat';">Inicio</li>
                    <li style="font-family: 'Montserrat';">Nuestras marcas</li>
                    <li style="font-family: 'Montserrat';">Promociones para ti</li>
                    <li style="font-family: 'Montserrat';">¿Quiénes somos?</li>
                    <li style="font-family: 'Montserrat';">Lo más buscado</li>
                </ul>
                <div class="mt-4 text-sm text-center">
                    <p style="font-family: 'Montserrat';">
                        Bodega de Remate Monterrey {{ currentYear }} © All rights reserved.
                    </p>
                </div>
            </div>

            <!-- Columna: Tienda -->
            <div class="footer-column hidden sm:block w-full mt-0 text-center">
                <h3 class="font-bold xl:text-4xl" style="font-family: 'Montbold';">Tienda</h3>
                <ul class="p-1 list-none">
                    <li style="font-family: 'Montserrat';">Equipo de Cómputo</li>
                    <li style="font-family: 'Montserrat';">Impresión</li>
                    <li style="font-family: 'Montserrat';">Insumos</li>
                    <li style="font-family: 'Montserrat';">Muebles</li>
                    <li style="font-family: 'Montserrat';">Oficinas</li>
                    <li style="font-family: 'Montserrat';">Otros</li>
                </ul>
            </div>
        </div>
    </footer>
</template>

  
  <script setup>
  import { ref } from 'vue'
  const currentYear = ref(new Date().getFullYear())
  </script>
  
  <style scoped>

  </style>
  
  