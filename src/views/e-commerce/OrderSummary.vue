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
        console.log(JSON.stringify(orders.value));
    } catch (error) {
        console.error('Error al obtener los datos de la orden:', error);
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
});
</script>

<template>
    <div class="card">
        <span class="text-700 text-xl">Gracias por su compra!</span>
        <div class="text-900 font-bold text-4xl my-2">Pedido registrado con éxito 🚀</div>
        <p class="text-700 text-xl mt-0 mb-4 p-0">
            Tu pedido está siendo procesado por el comercio, estate atento a
            instrucciones.
        </p>
        <div
            :style="{ height: '4px', background: 'linear-gradient(90deg, rgba(12, 157, 198) 0%, rgba(133, 240, 255) 100%)' }">
        </div>
        <br>
        <div>
            <Button label="Ir a inicio" icon="pi pi-home" class="mr-2" outlined @click="router.push('/')"></Button>
            <Button label="PDF pedido" icon="pi pi-print" outlined @click="openPdf"></Button>
        </div>
        <br>
        <div class="border-round surface-border border-1">
            <div v-if="orders.length > 0" v-for="(order, i) in [orders[0]]" :key="i"
                class="p-3 surface-border flex flex-column">
                <div class="mb-3">
                    <span class="font-medium text-xl text-900 mr-2">Número Pedido:</span>
                    <span class="font-medium text-xl text-blue-500"> {{ order.id }}</span>
                </div>
                <div v-if="orders.length > 0" class="border-round surface-border border-1">
                    <UserOrdersItems :id_order="orders[0].id"></UserOrdersItems>
                </div>
                <div class="mt-5">
                </div>
                <div class="w-full mt-5">
                    <span class="font-medium text-900">Resumen</span>
                    <ul class="list-none p-0 m-0 mt-3">
                        <li class="flex justify-content-between mb-3">
                            <span class="text-900">Subtotal</span>
                            <span class="text-900 font-medium text-lg">${{ order.subtotal.toFixed(2) }}</span>
                        </li>
                        <li class="flex justify-content-between mb-3">
                            <span class="text-900">Envío</span>
                            <span class="text-900 font-medium text-lg">$0.00</span>
                        </li>
                        <li class="flex justify-content-between mb-3">
                            <span class="text-900">IVA</span>
                            <span class="text-900 font-medium text-lg">${{ order.iva.toFixed(2) }}</span>
                        </li>
                        <li class="flex justify-content-between border-top-1 surface-border py-3">
                            <span class="text-900 font-medium">Total</span>
                            <span class="text-900 font-bold text-lg">${{ order.total.toFixed(2) }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>


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
</template>
