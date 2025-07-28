<template>
    <div class="card p-2">
        <!-- Título de la sección -->
        <div class="flex flex-column align-items-center mb-3 pt-3">
            <div class="text-900 text-4xl font-bold" style="font-family: 'Montsemibold'">Tus Pedidos</div>
        </div>

        <!-- Mensaje si no hay pedidos -->
        <div v-if="orders.length == 0" class="flex flex-column align-items-center mb-6">
            <div class="text-900 text-2xl mb-4 font-medium" style="font-family: 'Montserrat'">No tienes pedidos registrados</div>
        </div>

        <!-- Lista de pedidos -->
        <div v-for="(order, i) in orders" :key="i" class="mb-4">
            <div class="flex bg-white p-4 mb-4">
                <ul class="list-none p-0 m-0 col-12">
                    <!-- Encabezado del pedido -->
                    <li style="background: #00365f;">
                        <div class="w-full flex justify-content-between mt-3 sm:mt-0 col-12 grid formgrid p-fluid">
                            <div style="color: #FFFFFF; font-family: 'Montserrat'" class="field col-12 sm:col-9">
                                <span class="text-xl font-medium mb-3">Pedido: #{{ order.id }}</span>
                                <span v-if="order.delivery_type == 1" class="text-xl font-medium mb-3">Sucursal: {{ order.branch }}</span>
                                <span v-if="order.delivery_type == 2" class="text-xl font-medium mb-3">Entrega a Domicilio</span>
                                <span class="text-xl font-medium mb-3">Fecha del pedido: {{ formatDate(order.created) }}</span>
                                <span class="text-xl font-medium mb-3">Total: ${{ order.total.toFixed(2) }}</span>
                                <span v-if="order.barcode_url != undefined" class="text-xl font-medium mb-3">Referencia pago en tienda: {{ order.barcode_url }}</span>
                            </div>
                            <div class="col-12 sm:col-3 flex justify-content-center sm:justify-content-end">
                                <Tag 
                                    class="text-xl font-medium mb-3" 
                                    :style="{backgroundColor: getSeverity(order.status, order.is_paid, order.delivery_type, order.payment_type)}" 
                                    :value="getStatus(order.status, order.is_paid, order.delivery_type, order.payment_type)"
                                />
                            </div>
                        </div>
                    </li>

                    <!-- Detalles del pedido (Items) -->
                    <UserOrdersItems :id_order="order.id"></UserOrdersItems>
                </ul>
            </div>
        </div>
    </div>
</template>
        <!-- <ul class="list-none p-0 m-0">
        <li v-for="(order, i) in orders" :key="i" class="flex py-6 border-top-1 border-bottom-1 surface-border">
            <ul class="list-none p-0 m-0 col-12">
                <li style="background: #8E9698;">
                    <div class="w-full sm:w-6 flex align-items-start justify-content-between mt-3 sm:mt-0 col-12">
                        <div>
                            <span class="text-900 text-xl font-medium mb-3">Pedido: #{{ order.id }}</span>
                            &nbsp &nbsp
                            <span class="text-900 text-xl font-medium mb-3">Fecha del pedido: {{ formatDate(order.created) }}</span>
                            &nbsp &nbsp
                            <span class="text-900 text-xl font-medium mb-3">Total: ${{ order.total.toFixed(2) }}</span>
                            &nbsp &nbsp
                            <span class="text-900 text-xl font-medium mb-3">{{ order.status }}</span>
                            <br>
                        </div>
                    </div>
                </li>
                <UserOrdersItems :id_order="order.id"></UserOrdersItems>
                <br>
            </ul>
        </li>
        </ul> -->
        <!-- <div class="flex">
            <div class="w-12rem hidden md:block"></div>
            <ul class="list-none py-0 pr-0 pl-0 md:pl-5 mt-6 mx-0 mb-0 flex-auto">
                <li class="flex justify-content-between mb-4">
                    <span class="text-xl text-900 font-semibold">Subtotal</span>
                </li>
                <li class="flex justify-content-between mb-4">
                    <span class="text-xl text-900 font-semibold">Impuestos</span>
                </li>
                <li class="flex justify-content-between border-top-1 surface-border mb-4 pt-4">
                    <span class="text-xl text-900 font-bold text-3xl">Total</span>
                </li>
                <li class="flex justify-content-end">
                    <Button label="Pagar" @click="router.push('/orderdata')"></Button>
                </li>
            </ul>
        </div> -->


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import UserOrdersItems from './UserOrdersItems.vue';
import { useCartStore } from '../../stores/cart';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import {OrderData} from '../Cart/Function/OrderData';
import axios from 'axios';

const auth = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();
const entity = new OrderData();

const orders = ref<any[]>([])

const refresh = async () => {
    try{
        let resposnse = await axios.get('Comercial/ECommerceOrder/GetUserOrders/' + auth.id_usuario)
        orders.value = resposnse.data
        console.log(JSON.stringify(resposnse.data))
        if(cartStore.order.length == 1)
            await entity.newOrder();
    }catch(error){
        console.log("Hubo un error: ", error)
    }
};

const formatDate = (date) =>{
    console.log(date)
    let day = String(new Date(date).getDate()).padStart(2, '0');
    let month = String(new Date(date).getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    let year = new Date(date).getFullYear();
    return `${day}/${month}/${year}`;
}

const getStatus = (status, payed, delivery, payment) => {
    let statusName = ((status == 1 && payed == 1) || (status == 1 && payed == 0 && delivery == 1 && payment == 1)) ? "Procesando por tienda" : 
    (status == 2 && payed == 0 && delivery == 1 && payment == 1) ? "Listo para recoger y pagar en sucursal" :
    (status == 2 && payed == 1 && delivery == 1 && payment == 2) ? "Listo para recoger en sucursal" :
    (status == 2 && payed == 1 && delivery == 2) ? "En preparacion para envio" :
    (status == 3 && payed == 1 && delivery == 1) ? "Entregado" :
    (status == 3 && payed == 0 && delivery == 1) ? "Por Pagar" :
    (status == 3 && payed == 1 && delivery == 2) ? "Enviado" :
    "Registrado";
    return statusName;
}

const getSeverity = (status, payed, delivery, payment) => {
    let Color = status == 1 ? "#B2BEB5" :
    status == 2 ? "#EF8C1A"  :
    status == 3 ? "#0BD18A" 
    : "Otra cosa";

    return Color;
}

onMounted(async () => {
    await refresh();
});

const selectedQuantity = ref({ label: '1', value: 1 });
const selectedQuantity2 = ref({ label: '1', value: 1 });
</script>
<style scoped>
/* Estilos generales */
.card {
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 2rem;
    margin-top: 2rem;
}

.text-900 {
    color: #333333;
}

.text-xl {
    font-size: 1.25rem;
}

.text-2xl {
    font-size: 1.5rem;
}

.text-4xl {
    font-size: 2.25rem;
}

.text-sm {
    font-size: 0.875rem;
}

.font-medium {
    font-weight: 500;
}

.font-bold {
    font-weight: 700;
}

/* Estilos de los pedidos */
.flex {
    display: flex;
}

.flex-column {
    flex-direction: column;
}

.align-items-center {
    align-items: center;
}

.justify-content-between {
    justify-content: space-between;
}

.justify-content-center {
    justify-content: center;
}

.mb-6 {
    margin-bottom: 1.5rem;
}

.mb-4 {
    margin-bottom: 1rem;
}

.mt-3 {
    margin-top: 1rem;
}

.mt-0 {
    margin-top: 0;
}

.w-full {
    width: 100%;
}

.field {
    display: flex;
    flex-direction: column;
}

.col-12 {
    width: 100%;
}

.sm\\:col-9 {
    width: 75%;
}

.sm\\:col-3 {
    width: 25%;
}

.bg-white {
    background-color: #ffffff;
}

.border-round {
    border-radius: 0.5rem;
}

/* Estilo de la etiqueta (Tag) */
.Tag {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    color: #fff;
    display: inline-block;
}

/* Colores y estado del Tag */
.bg-success {
    background-color: #4caf50;
}

.bg-warning {
    background-color: #ff9800;
}

.bg-danger {
    background-color: #f44336;
}

/* Interactividad de botones y estados */
button:hover {
    background-color: #e0e0e0;
}

</style>