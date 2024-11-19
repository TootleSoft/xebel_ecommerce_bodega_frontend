<template>
  <div class="card col-12">
    <swiper
      :autoHeight="true"
      :rewind="true"
      :slidesPerView="1"
      :spaceBetween="10"
      :breakpoints="{
        '640': { slidesPerView: 1, spaceBetween: 10 },
        '768': { slidesPerView: 3, spaceBetween: 40 },
        '1024': { slidesPerView: 4, spaceBetween: 50 },
        '1400': { slidesPerView: 6, spaceBetween: 50 }
      }"
      autoplay
      :pagination="{ clickable: true }"
      :modules="modules"
      :navigation="true"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, i) in products" :key="i">
        <div class="surface-border border-round m-2 p-3" >
          <div class="mb-3 flex align-items-center justify-content-center" >
            <div class="relative mx-auto" style="cursor: pointer;">
              <img 
                :src="imgroute(item.id)"
                class="h-15rem shadow-5 border-round"
                @click="navigateToProduct(item)"
              />
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const modules = ref<any[]>([Autoplay, Pagination, Navigation]);

const router = useRouter();
const products = ref<any[]>([]);

const refresh = async () => {
  let response = await axios.get('Inventory/EComerce/bundles');
  products.value = response.data;
}

const navigateToProduct = (item) => {
  router.push(`/bundle/${item.id}`);
};

const imgroute = (id) => {
  return import.meta.env.VITE_API_ROUTE + 'Inventory/Promotions/image/' + id;
};

onMounted(async () => {
  await refresh();
});
</script>

<style scoped>
/* Aseguramos que el swiper contenedor use flex y se centre */
.mySwiper {
  display: flex;
  justify-content: center; /* Centra el swiper en el contenedor */
  align-items: center; /* Centra verticalmente */
  width: 100%; /* Hace que ocupe todo el ancho disponible */
}

/* Aseguramos que cada swiper-slide tenga un tamaño adecuado y que sus contenidos estén centrados */
.swiper-slide {
  display: flex;
  justify-content: center; /* Centra horizontalmente el contenido dentro de cada slide */
  align-items: center; /* Centra verticalmente el contenido dentro de cada slide */
}

/* Opcional: Si deseas ajustar el tamaño de las tarjetas de los productos dentro de cada slide */
.surface-border {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Ajusta el tamaño del contenedor de cada tarjeta */
  max-width: 300px; /* Ajusta el ancho máximo de cada tarjeta */
  margin: 0 auto; /* Centra la tarjeta dentro del swiper */
}

.relative.mx-auto {
  margin: 0 auto; /* Centra la imagen dentro de su contenedor */
}

img {
  max-width: 100%; /* Asegura que las imágenes no se desborden */
  object-fit: cover; /* Ajusta las imágenes para que no distorsionen */
}
</style>
