<template>
    <swiper
      :rewind="true"
      :slidesPerView="1"
      :spaceBetween="10"
      :pagination="{
        clickable: true,
      }"
      :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
      :modules="modules"
      class="mySwiper bg-white"
    >
      <swiper-slide v-for="(item, i) in carouselItems" :key="i">
        <div class="surface-border border-round m-9 p-3">
          <div class="mb-3 flex align-items-center justify-content-center">
            <div class="relative mx-auto">
              <img :src="item.src" class="w-full border-round" @click="navigateToProduct(item)" />
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Autoplay, Pagination, Navigation } from 'swiper/modules';
  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  const modules = ref<any[]>([Autoplay, Pagination, Navigation]);

  
  const router = useRouter();
  
  const responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  
  const carouselItems = ref([
    {
      id: 1,
      src: '/src/assets/demo/resources/webcontent/images/foto19.jpg',
    //   path: '/product/1'
    },
    {
      id: 2,
      src: '/src/assets/demo/resources/webcontent/images/foto13.jpg',
    //   path: '/product/2'
    },
    {
      id: 3,
      src: '/src/assets/demo/resources/webcontent/images/foto16.jpg',
    //   path: '/product/3'
    },
    // ... puedes añadir más imágenes si lo deseas
  ]);
  
  const navigateToProduct = (item) => {
    router.push(item.path);
  };
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
  border-radius: 40px !important;
}

.carousel-caption {
  margin-top: 10px;
  font-size: 1.5rem; /* Ajusta el tamaño del texto */
  color: #333;
  text-align: center;
}
  </style>
  