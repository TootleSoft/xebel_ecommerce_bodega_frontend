<template>
    <div class="related-products">
      <h3 class="section-title" style="font-weight: 700; font-size: 1.5rem; color: #1B2955">Relacionados con tus últimas visitas</h3>
      <div class="product-scroll">
        <div
          v-for="product in products" 
          :key="product.id"
          class="product-card"
          @click="goToProduct(product.id)"
        >
          <img 
            :src="imgroute(product.id, product.barcode, product.id_brand)" 
            :alt="'Imagen del producto'" 
            class="product-image"
          />
          <h4 class="product-name">{{ product.name }}</h4>
          <p class="product-price discounted">${{ (product.price - product.discount).toFixed(2) }}</p> 
          <p v-if="product.discount" class="product-price original">${{ product.price.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  interface Product {
    id: number
    name: string
    price: number
    discount: number
    barcode: string
    id_brand: string    
  }
  const image = '/src/images/articulos/articulo-demo.png'
  // 🔁 Props: recibe el ID del producto base o la categoría
  const props = defineProps<{
    productId: number
  }>()
  
  const products = ref<Product[]>([])
  const router = useRouter()
  
  
  const fetchRelated = async () => {
    try {
        const response = await axios.get(`/Inventory/InventoryArticle/related/${props.productId}`);
        products.value = response.data;
        console.log('Resultados de la búsqueda: ', products.value)
    } catch (error) {
        console.error('Error al cargar productos relacionados:', error);
    }
  }

  const imgroute = (id, sku, brand): string => {
    sku = sku
    .replace(/\//g, "--")
    .replace(/ñ/g, "nnn")
    .replace(/Ñ/g, "nnn")
    .replace(/#/g, '----')

    return import.meta.env.VITE_API_ROUTE + 'Inventory/Ecomerce/image/' + id + '_' + sku + '_1/' + brand;
  }
  // Llama la API al montar y si cambia el producto
  onMounted(fetchRelated)
  watch(() => props.productId, fetchRelated)
  
  const goToProduct = (id: number) => {
    router.push(`/product/${id}`)
  }
  </script>
  
  <style scoped>
  .related-products {
    margin-top: 2rem;
    margin-bottom: 2rem;
    background-color: #ebebeb;
    border-radius: 0px;
    border: 1px solid #ebebeb;
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .section-title {
    font-size: 1.5rem;
    margin-top: 1rem;
    padding: 2rem;
    font-weight: 200;
  }
  .section-subtitle {
    font-size: 1.5rem;
    font-weight: 800;
  }
  .product-scroll {
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    scroll-snap-type: x mandatory;
    margin-top: -2rem;
    margin-bottom: 2rem;
  }
  .product-card {
    flex: 0 0 auto;
    width: 200px;
    border: 1px solid #fff;
    background-color: #fff;
    border-radius: 4px;
    padding: 0.9rem;
    text-align: center;
    scroll-snap-align: start;
    cursor: pointer;
    transition: transform 0.3s;
  }
  .product-card:hover {
    transform: scale(1.05);
  }
  .product-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin-bottom: 0.2rem;
  }
  .product-name {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.4rem;
    color: #35375e;
    font-family: 'Montserrat';
    text-align: left;
  }
  .product-price.original {
    font-size: 0.9rem;
    text-decoration: line-through;
    color: #626263;
    font-family: 'Montserrat';
    text-align: left; 
    margin-bottom: 0.2rem;
    /*debo agregar el valor del unit price aqui y en el precio el valor pero con el descuento */
  }
  .product-price.discounted {
    font-size: 1.4rem;
    color: #ff3c3d;
    font-family: 'Montserrat';
    font-weight: 800;
    text-align: left;
    margin-bottom: 0.2rem;
  }
  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin-bottom: 0.5rem;
  }
  @media (max-width: 768px) {
    .related-products {
      width: 90%;
      padding: 1rem;
    }
  }
  </style>
  