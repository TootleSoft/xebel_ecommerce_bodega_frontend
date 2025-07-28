<template>
  <div class="carousel-container" ref="carouselRef" @mouseenter="pauseAutoplay" @mouseleave="startAutoplay">
    <div class="carousel-track" ref="trackRef">
      <div v-for="(offer, index) in props.offers" :key="index" class="carousel-item">
        <img :src="offer.image" :alt="offer.title" />
        <!-- <div class="offer-title">{{ offer.title }}</div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

interface Offer {
  image: string
  title: string
}

// 🔁 Recibimos las ofertas como prop
const props = defineProps<{
  offers: Offer[]
}>()

const trackRef = ref<HTMLElement | null>(null)
const carouselRef = ref<HTMLElement | null>(null)

let autoplayInterval: ReturnType<typeof setInterval> | null = null
const scrollStep = 20
const scrollDelay = 5

function startAutoplay() {
  stopAutoplay()
  autoplayInterval = setInterval(() => {
    if (trackRef.value) {
      trackRef.value.scrollLeft += scrollStep
      const maxScroll = trackRef.value.scrollWidth - trackRef.value.clientWidth
      if (trackRef.value.scrollLeft >= maxScroll) {
        trackRef.value.scrollLeft = 0
      }
    }
  }, scrollDelay)
}

function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

function pauseAutoplay() {
  stopAutoplay()
}

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})
</script>

<style scoped>
.carousel-container {
  overflow: hidden;
  width: 100%;
  position: relative;
}
@media (max-width: 900px) {
  .carousel-item {
    width: 50% !important;
    height: 50% !important;
  }
}

.carousel-track {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem 0;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

.carousel-item {
  flex: 0 0 auto;
  width: 900px;
  height: 400px;
  border-radius: 0px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.9s ease;
  border: 1px solid #ccc;
}

.carousel-item:hover {
  transform: scale(1.05);
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
