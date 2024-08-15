<template>
    <div class="card">
    <swiper
      :autoHeight="true"
      :rewind="true"
      :slidesPerView="1"
      :spaceBetween="10"
      :breakpoints="{
      '640': {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      '768': {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      '1024': {
        slidesPerView: 4,
        spaceBetween: 50,
      },
      '1400': {
        slidesPerView: 6,
        spaceBetween: 50,
      },
    }"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      :navigation="true"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, i) in products" :key="i"><div class="surface-border border-round m-2 p-3">
          <div class="mb-3 flex align-items-center justify-content-center">
            <div class="relative mx-auto">
              <img 
                :src="imgroute(item.id, item.barcode, item.id_brand)"
                class="h-15rem shadow-5 border-round"
                @click="navigateToProduct(item)"
              />
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center cursor-pointer px-3 py-2 overflow-hidden relative font-semibold text-lg uppercase"
          >
            {{ item.name }}
          </div>
          <div
            class="flex align-items-center justify-content-center cursor-pointer px-3 py-2 overflow-hidden relative font-semibold text-lg uppercase"
          >
            <span class="text-l text-900 mb-3 text-red-500">{{ "$"+item.ecomerce_offer_price .toFixed(2) }}</span>
          </div>
        </div></swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Autoplay, Pagination, Navigation } from 'swiper/modules';
  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  const modules = ref<any[]>([Autoplay, Pagination, Navigation]);


const router = useRouter();
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
  let response = await axios.get('Inventory/EComerce/offers')

  products.value = response.data; 

  console.log(JSON.stringify(products.value))
}

const navigateToProduct = (item) => {
    router.push(`/product/${item.id}/${item.id_subarticle}`);
};

const imgroute = (id, sku, brand) => {
    console.log(`Image URL: ${import.meta.env.VITE_API_ROUTE+'Inventory/Ecomerce/image/'+id+'_'+sku+'_1/'+brand}`);
        sku= sku.replace(/\//g, "--").replace(/ñ/g, "nnn").replace(/Ñ/g, "nnn").replace(/#/g, '----')
        return import.meta.env.VITE_API_ROUTE+'Inventory/Ecomerce/image/'+id+'_'+sku+'_1/'+brand;
    }

onMounted(async () => {
await refresh();
})
</script>

<style lang="scss" scoped>
/* Estilos adicionales si los necesitas */
.custom-carousel .p-carousel {
width: 100%;
height: 600px; /* Ajusta la altura del carrusel */
}

.custom-carousel .p-carousel-item {
display: flex;
justify-content: center;
align-items: center;
}

.carousel-item {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}

.carousel-image-container {
width: 100%;
height: 100%;
}

.carousel-image {
width: 100%;
height: auto;
max-height: 100%;
object-fit: cover; /* Asegura que la imagen mantenga sus proporciones */
}

.carousel-caption {
margin-top: 10px;
font-size: 1.5rem; /* Ajusta el tamaño del texto */
color: #333;
text-align: center;
}
</style>