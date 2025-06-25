<template>
    <div class="overlay">
      <div class="loader"></div>
      <span class="loading-text">Cargando...</span>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
  }
  
  .loader {
    width: 60px;
    height: 60px;
    border: 6px solid #3b82f6; /* azul */
    border-top: 6px solid transparent;
    border-radius: 50%;
    animation: spin 0.3s linear infinite;
  }
  
  .loading-text {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #1f2937;
    font-family: 'Montserrat', sans-serif;
    animation: fadeIn 0.6s ease-in-out;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  </style>
  