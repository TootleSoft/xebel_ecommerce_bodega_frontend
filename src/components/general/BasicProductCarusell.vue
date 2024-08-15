<template>
    <div class="card hidden sm:block">
    <swiper
      :autoHeight="true"
      :rewind="true"
      :slidesPerView="6"
      :spaceBetween="10"
      :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
      
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
                :src="imgroute(item.id)"
                class="w-16rem h-7rem"
                @click="router.push(item.path)"
              />
            </div>
          </div>
        </div></swiper-slide>
    </swiper>
  </div>
  <div class="card block sm:hidden">
    <swiper
      :autoHeight="true"
      :rewind="true"
      :slidesPerView="6"
      :spaceBetween="10"
      :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
      :breakpoints="{
      '@0.00': {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      '@0.75': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '@1.00': {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      '@1.50': {
        slidesPerView: 6,
        spaceBetween: 50,
      },
    }"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, i) in products" :key="i"><div class="surface-border border-round m-2 p-3">
          <div class="mb-3 flex align-items-center justify-content-center">
            <div class="relative mx-auto">
              <img 
                :src="imgroute(item.id)"
                class="w-18rem h-7rem border-round"
                @click="router.push(item.path)"
              />
            </div>
          </div>
        </div></swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
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
    let response = await axios.get('Inventory/EComerce/getTopBrands')

    products.value = response.data; 
}

const imgroute = (id) => {

        return import.meta.env.VITE_API_ROUTE+'Inventory/Brand/image/'+id+"/"+new Date();
    }

onMounted(async () => {
    await refresh();
})

</script>