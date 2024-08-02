<template>
    <div class="card">
      <Carousel
        :value="carouselItems"
        :numVisible="1"
        :numScroll="1"
        circular
        class="custom-carousel"
        :autoplayInterval="5000"
      >
        <template #item="slotProps">
          <div class="border-1 surface-border border-round m-9 p-3">
            <div class="mb-3">
              <div class="relative mx-auto">
                <img :src="slotProps.data.src" class="h-30rem" @click="navigateToProduct(slotProps.data)" />
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
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
}

.carousel-caption {
  margin-top: 10px;
  font-size: 1.5rem; /* Ajusta el tamaño del texto */
  color: #333;
  text-align: center;
}
  </style>
  