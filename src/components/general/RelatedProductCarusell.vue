<template>
    <div class="card">
      <Carousel
        :value="relatedItems"
        :numVisible="6"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        circular
        :autoplayInterval="5000"
      >
        <template #item="slotProps">
          <div class="border-1 surface-border border-round m-2 p-3" v-for="(related, i) in relatedItems" :alt="String(i)" :key="i">
            <div class="mb-3">
              <div class="relative mx-auto">
                <img 
                  :src="imgroute(related.id, related.barcode, related.id_brand)"
                  class="w-full h-19rem"
                  @click="navigateToProduct(slotProps.data)"
                />
              </div>
            </div>
            <div
              class="flex align-items-center cursor-pointer px-3 py-2 overflow-hidden relative font-semibold text-lg uppercase"
            >
              {{ slotProps.data.article_name }}
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  import { useRouter } from "vue-router";
  
  const props = defineProps({
    value: {
      type: Array,
      required: true
    }
  });
  
  const emit = defineEmits(['update:value']);
  
  const router = useRouter();
  
  const responsiveOptions = [
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
  ];
  
  // const imgroute = (id) => {
  //   return import.meta.env.VITE_API_ROUTE+'Inventory/Brand/image/'+id+"/"+new Date();
  // };
  const imgroute = (id, sku, brand) => {
        console.log(brand)
        sku= sku.replace(/\//g, "--").replace(/ñ/g, "nnn").replace(/Ñ/g, "nnn").replace(/#/g, '----')
        return import.meta.env.VITE_API_ROUTE+'Inventory/Ecomerce/image/'+id+'_'+sku+'_1/'+brand;
    }
  
  const relatedItems = ref([...props.value]);

  const navigateToProduct = (item) => {
      router.push(`/product/${item.id}/${item.id_subarticle}`);
    };

  
  watch(() => props.value, (newVal) => {
    relatedItems.value = [...newVal];
    console.log(`output-`,relatedItems.value)
  });
  </script>
  