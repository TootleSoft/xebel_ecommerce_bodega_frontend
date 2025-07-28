<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import UserOrdersItems from '../../pages/Orders/UserOrdersItems.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useCartStore } from '../../stores/cart';
import axios from 'axios';

const router = useRouter();
const auth = useAuthStore();
const cartStore = useCartStore();

const orders = ref<any[]>([])

const refresh = async () => {
    try {
        const response = await axios.get(`Comercial/ECommerceOrder/GetUserOrders/${auth.id_usuario}`); //Trae los pedidos del usuario logeado
        orders.value = response.data; // Guarda los datos obtenidos en este array para mostrarlos
        console.log('La orden: ', orders.value);
    } catch (error) {
        console.error('Error al obtener los datos de la orden: ', error);
    }
};

const openPdf = async () => {
      let path = import.meta.env.VITE_DASHBOARD_PATH
      let merchan_id = import.meta.env.VITE_OPENPAY_MERCHANT_ID
      const response = await axios.get(`Comercial/ECommerceOrder/GetUserOrders/${auth.id_usuario}`);
      console.log(`order`,response.data[0].barcode_url);
      const url: string =  path + '/paynet-pdf' + '/' + merchan_id + '/' +  response.data[0].barcode_url
      window.open(url, '_blank'); // Abre la URL en una nueva pestaña
    };
 
onMounted(async () => {
    await refresh();
    cartStore.clearCart();
});
</script>

<template>
    <div class="confirmation-container">
      <div class="confirmation-card">
        <span class="text-700 text-lg text-center">¡Gracias por tu compra!</span>
        <div class="text-900 font-bold text-3xl my-2 text-center">Pedido registrado con éxito ✅</div>
        <p class="text-700 text-base mt-0 mb-4 text-center">
          Tu pedido está siendo procesado por el comercio. Te contactaremos con instrucciones.
        </p>
  
        <div class="progress-bar mb-4"></div>
  
        <div class="flex align-center gap-3 mb-5 flex-wrap">
          <Button label="Ir a inicio" icon="pi pi-home" class="btn-custom" outlined @click="router.push('/')"></Button>
          <Button label="PDF pedido" icon="pi pi-print" class="btn-custom" outlined @click="openPdf"></Button>
        </div>
  
        <div class="order-box">
          <div v-if="orders.length > 0" v-for="(order, i) in [orders[0]]" :key="i">
            <div class="mb-4 text-center">
              <span class="font-medium text-lg text-900 mr-2">Número de pedido:</span>
              <span class="font-bold text-xl text-blue-500">#{{ order.id }}</span>
            </div>
  
            <div class="mb-5">
              <UserOrdersItems :id_order="order.id" />
            </div>
  
            <div>
              <span class="font-medium text-lg text-900 mb-2 block">Resumen</span>
              <ul class="list-none p-0 m-0">
                <li class="flex justify-between mb-3 text-900">
                  <span>Subtotal: </span>
                  <span class="font-medium">${{ order.subtotal.toFixed(2) }}</span>
                </li>
                <!-- <li class="flex justify-between mb-3 text-900">
                  <span>Envío: </span>
                  <span class="font-medium">$0.00</span>
                </li> -->
                <li class="flex justify-between mb-3 text-900">
                  <span>IVA: </span>
                  <span class="font-medium">${{ order.iva.toFixed(2) }}</span>
                </li>
                <li class="flex justify-between border-top-1 surface-border py-3 text-900 font-bold text-lg">
                  <span>Total: </span>
                  <span> ${{ order.total.toFixed(2) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

    <!-- <div class="card">
    <div class="flex flex-column sm:flex-row sm:justify-content-between sm:align-items-center">
        <span class="text-2xl font-medium text-900">Thanks for your order!</span>
        <div class="flex mt-3 sm:mt-0">
                <div class="flex flex-column align-items-center">
                    <span class="text-900 font-medium mb-2">Order ID</span>
                    <span class="text-700">451234</span>
                </div>
                <div class="flex flex-column align-items-center ml-6 md:ml-8">
                    <span class="text-900 font-medium mb-2">Order Date</span>
                    <span class="text-700">7 Feb 2023</span>
                </div>
            </div>
        </div>
        <div class="flex flex-column md:flex-row md:align-items-center border-bottom-1 surface-border py-5">
            <img src="/demo/images/ecommerce/ordersummary/order-summary-2-1.png" class="w-15rem flex-shrink-0 md:mr-6"
                alt="summary-1-2" />
            <div class="flex-auto mt-3 md:mt-0">
                <span class="text-xl text-900">Product Name</span>
                <div class="font-medium text-2xl text-900 mt-3 mb-5">Order Processing</div>
                <div class="border-round overflow-hidden surface-300 mb-3" :style="{ height: '7px' }">
                    <div class="bg-primary border-round w-4 h-full"></div>
                </div>
                <div class="flex w-full justify-content-between">
                    <span class="text-900 text-xs sm:text-base">Ordered</span>
                    <span class="text-900 font-medium text-xs sm:text-base">Processing</span>
                    <span class="text-500 text-xs sm:text-base">Shipping</span>
                    <span class="text-500 text-xs sm:text-base">Delivered</span>
                </div>
            </div>
        </div>
        <div class="py-5 flex justify-content-between flex-wrap">
            <div class="flex sm:mr-5 mb-5">
                <span class="font-medium text-900 text-xl mr-8">Product Name</span>
                <span class="text-900 text-xl">$21.00</span>
            </div>
            <div class="flex flex-column sm:mr-5 mb-5">
                <span class="font-medium text-900 text-xl">Shipping Address</span>
                <div class="flex flex-column text-900 mt-3">
                    <span class="mb-1">Celeste Slater</span>
                    <span class="mb-1">606-3727 Ullamcorper. Roseville NH 11523</span>
                    <span>(786) 713-8616</span>
                </div>
            </div>
            <div class="flex flex-column">
                <span class="font-medium text-900 text-xl">Payment</span>
                <div class="flex align-items-center mt-3">
                    <img src="/demo/images/ecommerce/ordersummary/visa.png" class="w-4rem mr-3" alt="visa-2" />
                    <div class="flex flex-column">
                        <span class="text-900 mb-1">Visa Debit Card</span>
                        <span class="text-900 font-medium">**** **** **** 1234</span>
                    </div>
                </div>
            </div>
        </div>
    </div> -->

    <style scoped>
    .confirmation-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      min-height: 100vh;
      background-color: #f6f9fc;
    }
    
    .confirmation-card {
      width: 100%;
      max-width: 600px;
      background-color: white;
      border-radius: 1rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      padding: 2rem;
      display: flex;
      flex-direction: column;
    }
    
    .progress-bar {
      height: 4px;
      background: linear-gradient(90deg, rgb(15, 45, 182) 0%, rgb(250, 110, 54) 100%);
      border-radius: 2px;
    }
    
    .btn-custom {
        border-radius: 9999px;
        font-weight: 600;
        width: 265px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 0.5rem; /* espacio entre ícono y texto */
    }

    
    .order-box {
      border: 1px solid #d1d5db;
      border-radius: 0.75rem;
      padding: 1.5rem;
      background-color: #fafafa;
    }
    </style>