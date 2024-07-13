<template>
    <div class="card">
        <div class="flex flex-column align-items-center mb-6">
            <div class="text-900 text-4xl mb-4 font-bold">Tus Pedidos</div>
        </div>
        <div>
            
        </div>
        <div v-if="orders.length == 0" class="flex flex-column align-items-center mb-6">
            <div class="text-900 text-2xl mb-4 font-medium">No tienes pedidos registrados</div>
        </div>
        <div v-for="(order, i) in orders" :key="i">
            <div class=" flex border-round shadow-7">
                <ul class="list-none p-0 m-0 col-12">
                <li style="background: #0F7E8D;">
                    <div class="w-full flex justify-content-between mt-3 sm:mt-0 col-12 grid formgrid p-fluid">
                        <div style="color: #FFFFFF;" class="field col-12 sm:col-9">
                            <span class="text-xl font-medium mb-3">Pedido: #{{ order.id }}</span>
                            &nbsp &nbsp
                            <span v-if="order.delivery_type == 1" class="text-xl font-medium mb-3">Sucursal: {{ order.branch }}</span>
                            <span v-if="order.delivery_type == 2" class="text-xl font-medium mb-3">Entrega a Domicilio</span>
                            &nbsp &nbsp
                            <span class="text-xl font-medium mb-3">Fecha del pedido: {{ formatDate(order.created) }}</span>
                            &nbsp &nbsp
                            <span class="text-xl font-medium mb-3">Total: ${{ order.total.toFixed(2) }}</span>
                            <br>
                        </div>
                        <div class="col-12 sm:col-3">
                            <Tag class="text-xl font-medium mb-3" :style="{backgroundColor: getSeverity(order.status, order.is_paid, order.delivery_type, order.payment_type)}" :value="getStatus(order.status, order.is_paid, order.delivery_type, order.payment_type)"></Tag>
                        </div>
                    </div>
                </li>
                <UserOrdersItems :id_order="order.id"></UserOrdersItems>
            </ul>
            </div>
            <br>
            <br>
        </div>
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
    </div>
</template>

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
        console.log("Hubo un error:", error)
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