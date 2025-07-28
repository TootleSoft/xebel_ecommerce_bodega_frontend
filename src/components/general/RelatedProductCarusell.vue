<template>
  <div class="card">
    <!-- Título -->
    <p class="text-center text-2xl md:text-3xl xl:text-4xl mb-2" style="font-family: 'Montserrat'; font-weight: 800">
      <span style="color: black;">Explora </span><span style="color: orange;">más productos</span>
    </p>
    <!-- Slider -->
    <div class="overflow-hidden relative">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(item, i) in items"
          :key="i"
          class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex-shrink-0"
          style="
          margin-top: 0.5rem;
          "
        >
          <!-- Tarjeta de producto -->
          <div
            class="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center h-full"
            style="
            font-family: 'Montserrat'; 
            transition: transform 0.2s ease;"
          >
          <div>
            <!-- Imagen -->
              <img
                :src="imgroute(item.id, item.barcode, item.id_brand)"
                @click="navigateToProduct(item)"
                class="mb-0 cursor-pointer object-contain"
                style="
                width: 150px; 
                height: 150px;"
              />

              <!-- Nombre del producto -->
              <div class="text-base mb-1"
              style="
              max-width: 150px;
              max-height: 60px;
              font-size: 0.8rem !important;
              font-weight: bold;
              text-align: center;"
            >
                {{ item.article_name}}
              </div>

              <!-- Precio -->
              <div
              style="
                text-align: center;
                font-weight: bold;
              ">
                ${{ item.unit_price?.toFixed(2) ?? '0.00' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Botones de navegación -->
      <button
        @click="prev"
        class="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white shadow rounded-full"
      >
        ‹
      </button>
      <button
        @click="next"
        class="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white shadow rounded-full"
      >
        ›
      </button>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  value: Array<any>;
}>();

const emit = defineEmits(["update:value"]);

const items = ref([...props.value]);
const currentSlide = ref(0);
const router = useRouter();

const imgroute = (id: number, sku: string, brand: number) => {
  sku = sku.replace(/\//g, "--").replace(/ñ/g, "nnn").replace(/Ñ/g, "nnn").replace(/#/g, "----");
  return import.meta.env.VITE_API_ROUTE + "Inventory/Ecomerce/image/" + id + "_" + sku + "_1/" + brand;
};

const navigateToProduct = (item: any) => {
  router.push(`/product/${item.id}/${item.id_subarticle}`);
};

watch(() => props.value, (newVal) => {
  items.value = [...newVal];
});

// Botones
const next = () => {
  if (currentSlide.value < items.value.length - 1) currentSlide.value++;
};

const prev = () => {
  if (currentSlide.value > 0) currentSlide.value--;
};
</script>

<style scoped>

</style>
