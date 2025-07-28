<template>
    <div class="star-rating" @mouseleave="resetHover">
      <span
        v-for="star in maxStars"
        :key="star"
        class="star"
        :class="{ filled: star <= (hoverRating || rating), editable }"
        @mouseover="setHover(star)"
        @click="setRating(star)"
      >
        ★
      </span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue'
  
  const props = defineProps<{
    rating: number
    maxStars?: number
    editable?: boolean
  }>()
  
  const emit = defineEmits(['update:rating'])
  
  const maxStars = props.maxStars || 5
  const editable = props.editable ?? false
  const hoverRating = ref<number | null>(null)
  
  function setHover(star: number) {
    if (editable) hoverRating.value = star
  }
  
  function resetHover() {
    if (editable) hoverRating.value = null
  }
  
  function setRating(star: number) {
    if (editable) {
      emit('update:rating', star)
    }
  }
  </script>
  <style scoped>
  .star-rating {
    display: inline-flex;
    gap: 0.2rem;
    font-size: 1.8rem;
    color: #ccc;
    user-select: none;
    margin-left: 1.8rem;
  }
  .star {
    transition: color 0.2s ease;
    cursor: pointer;
  }
  .star.filled {
    color: #ffc107;
  }
  </style>
  