<template>
    <div class="confirmation-page">
      <div class="confirmation-card">
        <div class="header">
          <i class="pi pi-check-circle icon-success"></i>
          <h1>¡Pago Confirmado!</h1>
        </div>
        <div class="content">
          <p class="info-text">Por favor, realiza la transferencia bancaria utilizando la siguiente información:</p>
          <div class="details">
            <p><strong>CLABE:</strong> <span class="highlight">{{ clabe }}</span></p>
            <p><strong>Folio del Pedido:</strong> <span class="highlight">{{ orderId }}</span></p>
            <p><strong>Cantidad a Pagar:</strong> <span class="highlight">${{ amount }}</span></p>
          </div>
          <p class="email-notice">Se ha enviado un correo con esta información a tu dirección registrada.</p>
          <p class="final-note">Una vez realizada la transferencia, tu pedido será procesado.</p>
        </div>
        <div class="actions">
          <button class="btn-home" @click="$router.push('/')">Ir a Inicio</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        clabe: this.$route.query.clabe,
        orderId: this.$route.query.orderId,
        amount: this.$route.query.amount
      };
    }
  };
  </script>
  
  <style scoped>
  .confirmation-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
  }
  
  .confirmation-card {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    max-width: 500px;
    text-align: center;
  }
  
  .header {
    margin-bottom: 1.5rem;
  }
  
  .icon-success {
    font-size: 3rem;
    color: #28a745;
  }
  
  h1 {
    font-size: 1.8rem;
    color: #333333;
  }
  
  .content {
    margin-bottom: 1.5rem;
  }
  
  .info-text {
    font-size: 1rem;
    color: #555555;
    margin-bottom: 1rem;
  }
  
  .details {
    margin-bottom: 1rem;
  }
  
  .details p {
    font-size: 1rem;
    color: #333333;
  }
  
  .highlight {
    color: #1155cc;
    font-weight: bold;
  }
  
  .email-notice {
    font-size: 0.9rem;
    color: #777777;
    margin-bottom: 1rem;
  }
  
  .final-note {
    font-size: 0.9rem;
    color: #555555;
  }
  
  .actions {
    margin-top: 1.5rem;
  }
  
  .btn-home {
    background-color: #28a745;
    color: #ffffff;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-home:hover {
    background-color: #218838;
  }
  </style>