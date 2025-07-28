<template>
    <div class="product-rating">
      <p class="rating-label">Calificación promedio:</p>
      <StarRating 
        :rating="averageRating" 
        :editable="canVote" 
        @update:rating="submitRating" 
      />
      <p class="rating-info">{{ averageRating }} de 5 ({{ totalVotes }} votos)</p>
      <p v-if="hasRated" class="thank-you ml-5">¡Gracias por tu calificación!</p>
    </div>
  </template>
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import StarRating from './StarRating.vue'
  import { useAuthStore } from '../../stores/auth';
  import { useToast } from 'primevue/usetoast';
  import { useRouter } from 'vue-router';
  const toast = useToast();
  const router = useRouter();
  
  const props = defineProps<{
    productId: number
    userId: number // O se puede manejar con sesión
  }>()
  
  const averageRating = ref(0)
  const totalVotes = ref(0)
  const hasRated = ref(false)
  const canVote = ref(true)
  
  onMounted(async () => {
    await fetchRatingData()
  })
  
  async function fetchRatingData() {
    try {
      const { data } = await axios.get(`/Inventory/InventoryArticle/${props.productId}/rating`, {
        params: { userId: props.userId }
      })
      averageRating.value = data.average
      totalVotes.value = data.votes
      hasRated.value = data.hasRated
      canVote.value = !data.hasRated
    } catch (error) {
      console.error('Error al cargar la calificación:', error)
    }
  }
  
  async function submitRating(value: number) {
    try {
      console.log('Usuario: ', props.userId);
      if(useAuthStore().id_usuario == null) {
        toast.add({ severity: 'error', summary: 'Error al crear usuario', detail: "Debes iniciar sesion", life: 7500 });
        router.push('/auth/login')
      } else {
        await axios.post(`/Inventory/InventoryArticle/${props.productId}/rating`, {
        userId: props.userId,
        rating: value
      })
        hasRated.value = true
        canVote.value = false
        await fetchRatingData() // Recargar promedio y votos
      }

    } catch (error) {
      console.error('Error al enviar la calificación:', error)
    }
  }
  </script>
  
  <style scoped>
  .product-rating {
    max-width: 300px;
    margin: 1rem 0;
  }
  .rating-label {
    font-weight: bold;
    margin-bottom: 0rem;
    margin-left: 2rem;
  }
  .rating-info {
    font-size: 0.9rem;
    color: #666;
    margin-left: 2rem;
  }
  .thank-you {
    color: green;
    font-size: 0.9rem;
    margin-top: 0.9rem !important;
  }
  </style>
  